const pageParams = new URLSearchParams(window.location.search);
const editedUser = pageParams.get("id");

$.ajax("http://localhost:3000/api/users/" + editedUser)
    .done(function (data) {
        $("#name").val(data.name);
        $("#surname").val(data.surname);
        $("#email").val(data.email);
        $("#phone").val(data.phone);
    })

function isValid() {
    const name = $("#name").val();
    const surname = $("#surname").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    if (name.length == 0 || /^\s+$/.test(name)) {
        Swal("Error", "Debe ingresar un nombre válido, menor a 30 caracteres.")
        return false;
    } else if (surname.length == 0 || /^\s+$/.test(surname)) {
        Swal("Error", "Debe ingresar un apellido válido, menor a 30 caracteres.")
        return false;
    } else if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(email)) {
        Swal("Error", "El email ingresado no es válido")
        return false;
    } else if (!(/^\d{10}$/.test(phone))) {
        Swal("Error", "El numero ingresado no es válido")
        return false;
    } else {
        Swal("Éxito", "usuario editado")
        return true;
    }
}

$("#editUser").on("click", function () {
    if (isValid()) {
        const name = $("#name").val();
        const surname = $("#surname").val();
        const email = $("#email").val();
        const phone = $("#phone").val();

        let data = {
            name: name,
            surname: surname,
            phone: phone,
            email: email
        }
        console.log(data);
        
        $.ajax("http://localhost:3000/api/users/" + editedUser, {
            method: "PUT",
            data: data,
            success: function () {
                console.log("pasa")
                // Swal("Usuario editado", "usuario editado exitosamente", "success")
                // location.href = "/users";
            }
        })
    } 
    // else {
    //     Swal("Error", "no se pudo editar el usuario")
    // }
})