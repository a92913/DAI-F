const url = "http://82.155.91.47:8080/Back-end/";
const redefinir = document.getElementById("recoverPwd");

redefinir.addEventListener("click", function() {
    Swal.fire({
        title: 'Recuperar Password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        html: '<p>Insira o seu email para que seja enviada uma mensagem com a nova palavra-passe gerada</p><input id="txtEmail" class="swal2-input" type="text" placeholder="Email">',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        confirmButtonColor: '#390606',
        cancelButtonColor: '#390606',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            const email = document.getElementById('txtEmail').value
            return fetch(url + "LoginEmailExist", {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    method: 'POST',
                    body: `email=${email}`
                })
                .then(response => {
                    if (!response.ok) {
                        console.log(response.status); //=> number 100–599
                        console.log(response.statusText); //=> String
                        console.log(response.headers); //=> Headers
                        console.log(response.url); //=> String
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Email não encontrado`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const email = document.getElementById('txtEmail').value;
            fetch(url + "SendEmail", {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                method: 'POST',
                body: `email=${email}`
            }).then(function(response) {
                console.log(response);

                if (!response.ok) {
                    console.log(response.status); //=> number 100–599
                    console.log(response.statusText); //=> String
                    console.log(response.headers); //=> Headers
                    console.log(response.url); //=> String
                    throw Error(response.statusText);
                } else {
                    Swal.fire({
                        title: "Email enviado com sucesso",
                        icon: "success",
                    })
                }
            }).catch(function(err) {
                console.error(err);
            });
        }
    });
});

const login = document.getElementById("submitInput");

login.addEventListener("click", signIn);

async function signIn() {

    if ($("#mailInput").val() == null || $("#mailInput").val() == "") {
        return false;
    }
    if ($('#passInput').val() == null || $("#passInput").val() == "") {
        return false;
    } else if ($('#mailInput').val() != null || $('#passInput').val() != null) {

        const email = document.getElementById("mailInput").value;
        const pass = document.getElementById("passInput").value;

        const response = await fetch("http://82.155.91.47:8080/Back-end/SignIn", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: 'POST',
            body: `email=${email}&password=${pass}`,
        })
        const resp = await response.json();

        if (resp.STATUS === 200) {

            if (resp.profile === "ee") {

                localStorage.setItem("codLogin", resp.cod_login);
                window.location.replace("chooseProfile.html");
            } else {

                Swal.fire({
                    title: "Permissão Recusada!",
                    icon: "error",
                });
            }
        } else if (resp.STATUS === 300) {
            Swal.fire({
                title: "O Email não se encontra registado!",
                icon: "error",
            });

        } else {
            Swal.fire({
                title: "Palavra Passe Incorreta!",
                icon: "error",
            });
        }
    }
}

const btn = document.querySelector('.view');
btn.addEventListener('click', function() {
    const input = document.querySelector('#passInput');
    if (input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
        btn.classList.remove('fa-eye')
        btn.classList.add('fa-eye-slash');

    } else {
        input.setAttribute('type', 'password');
        btn.classList.remove('fa-eye-slash');
        btn.classList.add('fa-eye');
    }
});