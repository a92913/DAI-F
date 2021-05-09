const url = "http://82.155.91.47:8080/Back-end/";

window.onload =
    async() => {
        const codchild = localStorage.codchild;
        const response = await fetch(url + "ChildGetCodChild?cod_child=" + codchild);
        const child = await response.json();

        const name = child.name;
        const sex = child.sex;
        document.getElementById("profileName").innerHTML = name;
        document.getElementById('profileImage').src = "../imagens/" + sex + ".png"
        getAct();

    }
const getAct = () => {
    // Invocar o fetch para obter dados da base de dados
    const codchild = localStorage.codchild;
    console.log(codchild);
    fetch(url + "ActivityGetProfileChild?cod_child=" + codchild)
        .then((response) => response.json())
        .then((output) => {

            // Desta forma se for 0 aprece default
            const parent = document.getElementsByClassName("parent")[0];
            if (output.MSG.length == 0) {
                const content1 = a();
                const children1 = document.createElement("div");
                children1.innerHTML = content1;

                parent.appendChild(children1);
            }
            // Adicionar dados ao parent
            // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
            output.MSG.forEach(({ cod_act, photo, name, residence, rating, category, date }) => {
                // Preencher os cards com a informação
                if (photo == null || photo == "" || typeof photo === typeof undefined) {
                    src = "../imagens/image-art.png";
                } else {
                    src = url + 'image/' + photo;

                }
                const content = fill(cod_act, src, name, residence, rating, category, date);

                const children = document.createElement("div");
                children.innerHTML = content;

                parent.appendChild(children);
                evaluation(cod_act, rating);
            });
        })

}


const fill = (cod_act, photo, name, residence, rating, category, date) => {
    return ` 
      <div class="card ${category}" id="card-activity">

      <div class="card-header ${category}"><img src="${photo}" id="image-activity"></img>
      </div>
      <div class="card-body ${category}">

          <span class="card-text2">${name}</span>
          <div class="col-sm-12" id="rating">
              <div class="col-sm-4">
                  <p class="card-text3">${residence}</p>
                  <p class="card-text3">${date}</p>
              </div>
              <div class="col-sm-8">
                  <section>
                      <div class='rating-stars text-center'>
                          <ul id='${cod_act}'>
                              <li class='star' title='Poor' data-value='1'>
                                  <i class='fa fa-star fa-fw'></i>
                              </li>
                              <li class='star' title='Fair' data-value='2'>
                                  <i class='fa fa-star fa-fw'></i>
                              </li>
                              <li class='star' title='Good' data-value='3'>
                                  <i class='fa fa-star fa-fw'></i>
                              </li>
                              <li class='star' title='Excellent' data-value='4'>
                                  <i class='fa fa-star fa-fw'></i>
                              </li>
                              <li class='star' title='WOW!!!' data-value='5'>
                                  <i class='fa fa-star fa-fw'></i>
                              </li>
                          </ul>
                      </div>
                  </section>
              </div>
          </div>
      </div>
  </div>
  <script>`
};

const a = () => {
    return `<center>
    <div class="card art" id="card-activity">

        <div class="card-header"><img src="../imagens/sad.png" id="sad"></img>
        </div>
        <div class="card-header1">
            <span class="title-city1">Ainda sem atividades participadas</span>
        </div>
    </div>
</center>`
}

function evaluation(value, rating) {
    const onStar = rating;
    const b = "#" + value + " li";
    var stars = $(b).parent().children('li.star');
    for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
    }
}

let adddir = document.getElementById("logout_conf");

adddir.addEventListener("click", function() {

    Swal.fire({
        text: "Pretende mesmo sair da Aplicação?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("../index.html");
        } else {}
    })
});