const url = "http://82.155.91.47:8080/Back-end/";

window.onload =
    async () => {
        let codLogin = localStorage.codLogin;
        const response = await fetch(url + "GuardianGetCodLogin?cod_login=" + codLogin);
        const ee = await response.json();

        const ee_name = ee.name;
        const ee_cod = ee.cod_ee;
        localStorage.setItem("codee", ee_cod);
        document.getElementById("name_ee").innerHTML = ee_name;
        document.getElementById("ee").value = ee_cod;
        getChild();
    
    }
        const getChild = () => {
            // Invocar o fetch para obter dados da base de dados
            const id = localStorage.codee;
            console.log(id);
            fetch(url + "ChildGetCodEe?cod_ee=" + id)
              .then((response) => response.json())
              .then((output) => {

                // Desta forma se for 0 aprece default
                const parent = document.getElementsByClassName("parent")[0];
                if (output.MSG.length) {
                  parent.innerHTML = "";
                }
          
                // Adicionar dados ao parent
                // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
                output.MSG.forEach(({ cod_child, name, birth_date, sex}) => {
                  // Preencher os cards com a informação
                  const content = fill(cod_child, name, birth_date, sex);
          
                  const children = document.createElement("div");
                  children.innerHTML = content;
          
                  parent.appendChild(children);
                });
              })
          };
    

    const fill = (cod_child, name, birth_date, sex) => {
        return `<div class="col-sm-12">
        <button class="card-child-${sex}" onclick="profilechild(this.value)" value="${cod_child}"></button>
        <p class="name_child"> ${name} </p>
    </div>`
    };

function profileee(value) {
    window.location.replace("EE/ee_menu.html");
}

function profilechild(value) {
    window.location.replace("criança/menu.html");
    localStorage.setItem("codchild", value);
}

