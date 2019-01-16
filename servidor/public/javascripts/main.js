//get users FRONT:
$.ajax("http://localhost:3000/api/users")
    .done(function (data) {
        for (let i = 0; i < data.length; i++) {
            $("table").append(`
            <tr id="user-${data[i].id}" class="table-row">
                <td> ${data[i].name} </td>
                <td> ${data[i].surname} </td>
                <td> ${data[i].email} </td>
                <td> ${data[i].phone} </td>
                <td> <button class= "btn" id="editButton"> <a href="/users/edituser?id=${data[i].id}" type="button"> <i class="fas fa-pencil-alt"></i> </a> </button></td>
                <td> <button onclick="deleteUser(${data[i].id})" class= "btn" id="deleteUserButton"> <i class="fas fa-trash-alt"></i> </button></td>
                </tr>
        `)
        }
    })


$(".filterButton").click(function () {
    const search = $("#searchFilter").val()

    $("#infoTable").remove()

    $.ajax("http://localhost:3000/api/users?search=" + search)
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                $("table").append(`
					<tr id="user-${data[i].id}">
					<td> ${data[i].name} </td>
                    <td> ${data[i].surname} </td>
                    <td> ${data[i].email} </td>
					<td> ${data[i].phone} </td>
					<td> <button class= "btn" id="editButton"> <a href="/edit?id=${data[i].id}" type="button"> <i class="fas fa-pencil-alt"></i> </a> </button></td>
					<td> <button onclick="deleteUser(${data[i].id})" class= "btn" id="deleteUserButton"> <i class="fas fa-trash-alt"></i> </button></td>
					</tr>`)
            }
        }
        )
})


function deleteUser(id) {
    $.ajax("http://localhost:3000/api/users/" + id, {
        method: "DELETE",
        success: function () {
            $("#user" + id).remove();
            Swal({
                title: "¿Eliminar usuario?",
                text: "Esta acción no puede deshacerse",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí"
            }).then((result) => {
                if (result.value) {
                    Swal({
                        showConfirmButton: false,
                        type: "success",
                        title: "Usuario eliminado",
                    })
                    setTimeout(function () {
                        location.href = "/users";
                    }, 1200)
                }
            }
            )
        }
    }
    )
}
