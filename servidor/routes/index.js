var express = require("express");
var path = require("path")
var fs = require("fs")
var router = express.Router();

//////////// "database" ///////////
const userList = "routes/db.json"

function readDB() {
  let userFile = fs.readFileSync(userList)
  userFile = JSON.parse(userFile);
  return userFile;
}

function writeDB(userFile) {
  fs.writeFileSync(userList, JSON.stringify(userFile))
}

////////////////////////////////// rutas //////////////////////////////////////////////

// ruta ping pong //


router.get("/estaspensandolomismoqueyobananin", function (req, res) {
  const BANANITO = "claro que si bananon";
  res.send(BANANITO);
});

////////////////////////////////////////////////////

// rutas básicas //

router.get("/users", function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"))
});

router.get("/users/adduser", function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "public", "html", "adduser.html"))
});

router.get("/users/edituser", function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "public", "html", "edituser.html"))
});

//////////////////////////////////////////////


///// validaciones ////

function isValid(user) {
  const validateMail = /^((([!#$%&"*+\-/=?^_`{|}~\w])|([!#$%&"*+\-/=?^_`{|}~\w][!#$%&"*+\-/=?^_`{|}~\.\w]{0,}[!#$%&"*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
  if (!validateMail.test(user.email) || user.email.length == 0) {
    return false;
  } else if (user.name.length == 0 || user.name.length >= 30) {
    return false;
  } else if (user.surname.length == 0 || user.surname.length >= 30) {
    return false;
  } else if (!/^\d+$/.test(user.phone)) {
    return false;
  } else {
    return true;
  }
}

// filtro //

router.get("/api/users", function (req, res, next) {
  let userList = readDB();

  let searchFilter = req.query.search;

  if (searchFilter && searchFilter.length > 0) {
    userList = userList.filter(function (f) {
      return f.name.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0 ||
        f.surname.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0 ||
        f.email.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0 ||
        f.phone.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0
    });

  }

  res.json(userList);

});

// agregar nuevo usuario //

router.post("/api/users", function (req, res) {
  userFile = readDB();
  const user = req.body;
  const newId = userFile.length == 0 ? (1) : (userFile[userFile.length - 1].id + 1)
  userFile.id = newId;
  const newUser = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    id: newId
  }

  if (isValid == true) {
    userFile.push(newUser);
    writeDB(userFile);
    res.json(userFile);
  } else {
    res.status(400).send("error");
  }
});

// usuarios por id //

router.get("/api/users/:id", function (req, res, next) {
  const userId = req.params.id
  userFile = readDB()
  for (let i = 0; i < userFile.length; i++) {
    if (userId == userFile[i].id) {
      return res.json(userFile[i]);
    }
  }
});

// editar y re validar usuario //

router.put("/api/users/:id", function (req, res, next) {
  const id = req.params.id;
  const user = req.body;
  const bodyKeys = Object.keys(user);
  userFile = readDB();

  if (isValid == true) {
    for (let i = 0; i < userFile.length; i++) {
      const currentUser = userFile[i];      
      if (id == currentUser.id) {
        const userKeys = Object.keys(currentUser);
        for (let x = 0; x < bodyKeys.length; x++) {
          const currentBodyKey = bodyKeys[x];
          if (userKeys.indexOf(currentBodyKey) > -1) {
            currentUser[currentBodyKey] = user[currentBodyKey]
          } else {
            console.log("no es una clave valida")
          }
        }

        writeDB(userFile);
        res.json(userFile);
        return res.json(currentUser);
      }
    }
  }
  location.href = "../html/index.html";
});

// borrar usuario //

router.delete("/api/users/:id", function (req, res, next) {
  const userDelete = req.params.id
  let userFile = fs.readFileSync(userList)
  userFile = JSON.parse(userFile)

  for (let i = 0; i < userFile.length; i++) {
    if (userFile[i].id == userDelete) {
      userFile.splice(i, 1)
    }
    writeDB(userFile);
    return res.send("usuario borrado")
  }
});


module.exports = router;