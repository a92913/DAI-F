const url = "http://82.155.91.47:8080/Back-end/";

$("#addKid").click(function(e) {
    e.preventDefault();
    $(".more-child").append(`<div class="morechild1">
    <div class="card1">
    <div class="card-body">
    <div class="input-wrapper">
    <input id="name" name="name" type="text" placeholder="Nome do Educando" data-rule="required|lastname" onkeypress="return ApenasLetras(event,this);" autocomplete="off">
    <input  id="date2" type="date" name="date" data-rule="required|date" autocomplete="off">
    <div id="sexo">
    <select class="combo-box sex" id="sex" name="sex" data-rule="required">
    <option value="" disabled selected hidden>Selecione o sexo</option>
    <option id="mas" value="Masculino">Masculino</option>
    <option id="fem" value="Feminino">Feminino</option>
    </select>
    </div>
    </div>
    <i class="fas fa-times fa-1x delete"></i>
    </div>
    </div><button id="confaddKid" type="submit" class="button" onclick="a()">CONFIRMAR CRIANÇA</button>
    </div>`);

    $("#addKid").hide();
});

$('.more-child').on('click', 'i', function() {
    $(this).closest(".morechild1").remove();
    $("#addKid").show();
});


const edit = document.getElementById("edit");

edit.addEventListener("click", function() {
    Swal.fire({
        html: ` <h5 id="title_pass">Alterar a palavra-passe</h5>
        <h4 >Nova Password</h4> 
        <input type="password" id="ps" class="swal2-input" maxlength="45" "><i class="far fa-eye view3" id="see" onclick="seePassword()"></i></input>
        <h4 id="title_h4">Confirmar Password</h4> 
        <input type="password" id="password" class="swal2-input" maxlength="45" "> <i class="far fa-eye view3" id="see1" onclick="seePassword1()"></i> </input>`,
        confirmButtonText: 'Confirmar',
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const ps = Swal.getPopup().querySelector('#ps').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!ps || !password) {
                Swal.showValidationMessage(`Preencha ambos os campos`)
            } else {
                if (ps.length < 6) {
                    Swal.showValidationMessage(`Password não tem caracteres suficientes`)
                } else {
                    if (ps === password) {
                        return { ps: ps, password: password }

                    } else {
                        Swal.showValidationMessage(`As palavras passes não correspondem `)
                    }
                }
            }
        }
    }).then((result) => {
        const cod = localStorage.codee;
        const password1 = result.value.ps;

        fetch(url + "LoginPutPassword", {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            body: `password=${password1}&cod_ee=${cod}`,
        }).then(function(response) {
            if (!response.ok) {
                console.log(response.status); //=> number 100â€“599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String

                Swal.fire({
                    text: "Erro, por favor tente novamente",
                    icon: "error",
                });
                throw Error(response.statusText);
            } else {
                Swal.fire({
                        text: "Palavra Passe alterada com sucesso!",
                        icon: "success",
                    })
                    .then(() => {});
            };
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.error(err);
        });
    });
});


const logout = document.getElementById("logout");

logout.addEventListener("click", function() {
    Swal.fire({
        text: "Pretende mesmo sair da aplicação?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.replace("../index.html");
        } else {}
    })
})

const shut_down = document.getElementById("shut_down");

shut_down.addEventListener("click", function() {
    Swal.fire({
        text: "Pretende mesmo encerrar a sua conta?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text: "Esta ação não é reversível, pretende continuar ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then((result) => {
                if (result.isConfirmed) {
                    const cod_login = localStorage.codLogin;
                    fetch("http://82.155.91.47:8080/Back-end/GuardianDelete?cod_login=" + cod_login, {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        method: 'GET',
                    }).then(function(response) {

                        if (response.status === 200) {
                            localStorage.clear();
                            Swal.fire({
                                text: "Conta removida com sucesso!",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000
                            }).then((result) => {

                                window.location.replace("../index.html");
                            });
                        } else if (response.status === 300) {
                            Swal.fire({
                                title: "Não pode eliminar a sua conta!",
                                text: "Há crianças incritas em atividades",
                                icon: "error",
                            });

                        } else {
                            Swal.fire({
                                text: "Aconteceu um erro, lamentamos o sucedido",
                                icon: "error",
                            })
                        }
                    })
                } else {}
            })
        } else {}
    })
})

//ADICIONAR CRIANÇA

function ApenasLetras(e, t) {
    var regex = new RegExp("[^0-9]");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
};

function a() {

    if ($("#name").val() == null || $("#name").val() == "" || document.getElementById("name").value.length < 3) {
        return false;
    }
    if ($('#date2').val() == null || $("#date2").val() == "" || document.getElementById("date2").value.length < 10) {
        return false;
    }
    if ($('#sex').val() == null || $("#sex").val() == "") {
        return false;
    } else if ($('#name').val() != null || $('#date2').val() != null ||
        $('#sex').val() != null) {

        const today = new Date();
        const date2 = document.getElementById("date2").value;
        const birthDate1 = new Date(date2.toString());
        let age1 = today.getFullYear() - birthDate1.getFullYear();
        let m1 = today.getMonth() - birthDate1.getMonth();

        if (m1 < 0 || (m1 === 0 && today.getDate() < birthDate1.getDate())) {
            age1--;
        }

        if (age1 > 15 || age1 < 3) {
            Swal.fire({
                title: "Idade da criança incorreta",
                text: "Entre os 4 anos e os 14 anos",
                icon: "error",
            });
            return false;
        }
    }

    const name1 = document.getElementById("name").value;
    const birth = document.getElementById("date2").value;
    const sex = document.getElementById("sex").value;
    let cod_ee = localStorage.codee;

    fetch("http://82.155.91.47:8080/Back-end/RegisterChild", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        body: `name=${name1}&birth_date=${birth}&cod_ee=${cod_ee}&sex=${sex}`,
    }).then(function(response) {

        if (!response.ok) {
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.url); //=> String
        } else {
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.url); //=> String
            swal.fire({
                text: "Criança adicionada com sucesso!",
                icon: "success",
                confirmButtonText: 'Ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                } else {}
            });
        }
    })
}

// IR BUSCAR INFORMAÇÕES DO EE 

const getDataChild = () => {

    let cod_ee = localStorage.codee;

    fetch(url + "ChildGetCodEe?cod_ee=" + cod_ee)
        .then((response) => response.json())
        .then((output) => {

            // Desta forma se for 0 aparece default
            const parent = document.getElementsByClassName("parent")[0];
            if (output.MSG.length) {
                parent.innerHTML = "";
            }

            // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
            output.MSG.forEach(({ cod_child, name, birth_date }) => {
                // Preencher os cards com a informação
                const content = fill(cod_child, name, birth_date);

                const children = document.createElement("div");
                children.innerHTML = content;

                parent.appendChild(children);
            });
        })
}

const fill = (cod_child, name, birth_date) => {
    return `<div class="card1" id="${cod_child}">
    <div class="card-body1">
        <div class="col-sm-5"><p class="name"> ${name}</p></div>
        <div class="col-sm-5 align"><p class="date"> ${birth_date}</p></div>
        <div class="col-sm-2 align"><i class="fas fa-user-minus fa-1x" onclick="deleteKids(${cod_child})"></i></div>
    </div>
</div>`
};

async function deleteKids(cod_child) {

    Swal.fire({
        text: "Pretende mesmo eliminar esta criança?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {

        if (result.isConfirmed) {
            fetch("http://82.155.91.47:8080/Back-end/ChildDelete?cod_child=" + cod_child, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                method: 'GET',
            }).then(function(response) {

                if (response.status === 200) {
                    Swal.fire({
                        text: "A criança foi removida com sucesso",
                        icon: "success",
                    });
                    const card = document.getElementById(cod_child);
                    card.classList.add("hide");
                } else if (response.status === 300) {
                    Swal.fire({
                        title: "Não pode eliminar esta criança",
                        text: "A criança está incrita em atividades",
                        icon: "error",
                    });

                } else {
                    Swal.fire({
                        title: "Aconteceu um erro!",
                        text: "volte a tentar mais tarde",
                        icon: "error",
                    });
                }
            })
        } else {}
    })
}


window.onload =
    async() => {
        let cod_ee = localStorage.codee;
        const response = await fetch(url + "GuardianProfile?cod_ee=" + cod_ee);
        const ee = await response.json();

        const name = ee.name;
        const email = ee.email;
        document.getElementById("profileName").innerHTML = name;
        document.getElementById("email").value = email;
        getDataChild();
    }

function seePassword() {
    const btn = document.querySelector("#see")
    const input = document.querySelector('#ps');
    if (input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
        btn.classList.remove('fa-eye')
        btn.classList.add('fa-eye-slash');

    } else {
        input.setAttribute('type', 'password');
        btn.classList.remove('fa-eye-slash');
        btn.classList.add('fa-eye');
    }
};

function seePassword1() {
    const btn1 = document.querySelector('#see1');
    const input1 = document.querySelector('#password');
    if (input1.getAttribute('type') == 'password') {
        input1.setAttribute('type', 'text');
        btn1.classList.remove('fa-eye')
        btn1.classList.add('fa-eye-slash');

    } else {
        input1.setAttribute('type', 'password');
        btn1.classList.remove('fa-eye-slash');
        btn1.classList.add('fa-eye');
    }
};