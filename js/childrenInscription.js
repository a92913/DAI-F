const url = "http://82.155.91.47:8080/Back-end/";

const getChild = () => {

    const id = localStorage.codee;
    const cod_act = localStorage.cod_act;

    fetch(url + "ChildrenInscription?cod_ee=" + id + "&cod_act=" + cod_act)
      .then((response) => response.json())
      .then((output) => {

        // Desta forma se for 0 aprece default
        const parent = document.getElementsByClassName("parent")[0];
            if (output.MSG.length == 0 ) {
                const content1 = a(category);
                const children1 = document.createElement("div");
                children1.innerHTML = content1;
        
                parent.appendChild(children1);
            }
  
        // Adicionar dados ao parent
        // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
        output.MSG.forEach(({cod_child, name, sex}) => {
        // Preencher os cards com a informação
        const content = fill(cod_child, name, sex);
  
        const children = document.createElement("div");
        children.innerHTML = content;
  
        parent.appendChild(children);
        });
      })
  };

const fill = (cod_child, name, sex) => {
    return `<div class="radiobtn">
                <input type="radio" id="${cod_child}" name="kids" value="${cod_child}" class="kids"/>
                <label for="${cod_child}"><div class="col-sm-3"><img src="../imagens/${sex}.png" class="profileImage"></img></div><div class="col-sm-9" >${name}</div></label>
            </div>`
};

window.onload = getChild();

const add = document.getElementById("ins");

add.addEventListener("click", function() {

    let kid = document.querySelector('input[class="kids"]:checked').value;
    let cod_act = localStorage.cod_act;

    fetch("http://82.155.91.47:8080/Back-end/SubscriptionPost", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        body: `cod_child=${kid}&cod_act=${cod_act}`,
    }).then(function(response) {
        if (!response.ok) {
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.url);
        }
        else {
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.url);
            Swal.fire({
            text: "Inscrição realizada com sucesso!",
            icon: "success",
            confirmButtonText: 'Ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    history.go(-1);
                }
                else {}
            });
        }
    });
})

const back = document.getElementById("back");

back.addEventListener("click", function(){

    const page = localStorage.page;
    window.location.replace(page);
})
