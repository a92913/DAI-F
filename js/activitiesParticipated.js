const url = "http://82.155.91.47:8080/Back-end/";

const getActivitiesParticipated = () => {

    const cod = localStorage.codee;

    fetch(url + "ActivityParticipatedEE?cod_ee=" + cod)
        .then((response) => response.json())
        .then((output) => {

            // Remove todos os dados relativos ao parent
            const parent = document.getElementsByClassName("parent")[0];
            if (output.MSG.length == 0) {
                const content1 = a(category);
                const children1 = document.createElement("div");
                children1.innerHTML = content1;

                parent.appendChild(children1);
            }

            // Adicionar dados ao parent
            // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
            output.MSG.forEach(({ cod_act, name, age_low, age_upper, date, start_time, duration, soft_skills, description, photo, category, namechild, cod_child }) => {
                let duration1 = `${duration.substr(0,5 )}`;
                let start_time1 = `${start_time.substr(0,5 )}`;
                // Preencher os cards com a informação

                if (photo == null || photo == "" || typeof photo === typeof undefined) {
                    src = "../imagens/image-art.png";
                } else {
                    src = url + 'image/' + photo;

                }
                const content = getActivitiesChild(cod_act, name, age_low, age_upper, date, start_time1, duration1, soft_skills, description, src, category, namechild, cod_child);

                // Gerar um card-deck
                const children = document.createElement("div");
                children.innerHTML = content;

                // Adicionar à div do parent os card-decks que forem gerados
                parent.appendChild(children);
            });
        })
};

const getActivitiesChild = (cod_act, name, age_low, age_upper, date, start_time, duration, soft_skills, description, photo, category, namechild, cod_child) => {
    return ` <div class="card ${category}" id="card-activity">
    <div class="card-header ${category}">
    <p class="nameKid"> ${namechild} </p>
    <img src="${photo}" id="image-activity"></img>
    </div>
    <div class="card-body ${category}">
        <div>
            <label class="card-text2">Nome:<span class="oc1"> ${name}</span></label>
            <label class="card-text2">Faxa etária:<span class="oc1"> ${age_low}-${age_upper}</span></label>
            <label class="card-text2">Dia:<span class="oc1"> ${date}<span></label>
            <label class="card-text2">Horário:<span class="oc1"> ${start_time}</span></label>
        </div>
    </div>
    <div id="show-card">
        <div class="footer2">
            <button onclick="showMore(this.value)" value="${cod_act + cod_child + "a"}" class="moreinfo" id="${cod_act + cod_child + "a" + "a"}">+ info </button>
        </div>
        <ul class="dropdown-content ${category}" id="${cod_act + cod_child +  "a"}">
            <label class="card-text3">Duração: <span class="oc1"> ${duration}</span></label>
            <label class="card-text3">Soft skills:<span class="oc1"> ${soft_skills}</span></label>
            <label class="card-text3">Descrição:<span class="oc1"> ${description}</span></label>
            <div id="div-heart">
                <button onclick="showLess(this.value)" class="lessinfo" value="${cod_act + cod_child + "a"}">- info </button>
            </div>
        </ul>
    </div>
</div>`;
};

const a = (category) => {
    return `<center>
            <div class="card ${category}" id="card-activity">
            <div class="card-header"><img src="../imagens/sad.png" id="sad"></img>
            </div>
            <div class="card-header1">
            <span class="title-city1">Sem reações</span>
            </div>
            </div>
            </center>`
}

function showMore(valor) {
    const a = valor + "a";
    document.getElementById(valor).classList.toggle('show');
    document.getElementById(a).classList.toggle('hide');
}

function showLess(valor) {
    const a = valor + "a";
    document.getElementById(a).classList.toggle('hide');
    document.getElementById(valor).classList.toggle('show');
}

window.onload = getActivitiesParticipated();