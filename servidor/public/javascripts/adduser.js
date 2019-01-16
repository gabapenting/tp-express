function isValid() {
  const name = $("#newName").val();
  const surname = $("#newSurname").val();
  const email = $("#newEmail").val();
  const phone = $("#newPhoneNumber").val();
  if (name.length == 0 || /^\s+$/.test(name)) {
    Swal("Error", "Debe ingresar un nombre, menor a 30 caracteres.")
    return false;
  } else if (surname.length == 0 || /^\s+$/.test(surname)) {
    Swal("Error", "Debe ingresar un apellido, menor a 30 caracteres.")
    return false;
  } else if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(email)) {
    Swal("Error", "El email ingresado no es válido")
    return false;
  } else if (!(/^\d{10}$/.test(phone))) {
    Swal("Error", "El numero ingresado no es válido")
    return false;
  } else {
    Swal("Éxito", "usuario añadido a la base de datos")
    return true;
  }
}

$("#createNewUser").on("click", function () {
  if (isValid()) {
    const name = $("#newName").val();
    const surname = $("#newSurname").val();
    const email = $("#newEmail").val();
    const phone = $("#newPhoneNumber").val();

    let newUser = {
      name: name,
      surname: surname,
      email: email,
      phone: phone
    }

    $.ajax("http://localhost:3000/api/users/", {
      method: "POST",
      data: newUser,
      success: function () {
        Swal("Usuario agregado exitosamente");
        setTimeout(function () {
					location.href = "/users";
				}, 1500)
      }
    })
  } else {
  Swal("Algo salió mal");
}
})