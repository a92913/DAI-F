const url = "http://82.155.91.47:8080/Back-end/";

const getData = () => {

    const cod = localStorage.codchild;

    fetch(url + "NotificationGetToday?cod_child=" + cod)
        .then((response) => response.json())
        .then((output) => {
            // Remove todos os dados relativos ao parent
            // Desta forma, o card base continuará a aparecer
            const parent = document.getElementsByClassName("parent")[0];
            if (output.MSG.length == 0) {
                const content1 = a();
                const children1 = document.createElement("div");
                children1.innerHTML = content1;
        
                parent.appendChild(children1);
            }

            // Adicionar dados ao parent
            // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
            output.MSG.forEach(({ cod_not, description, category, date }) => {

                // Preencher os cards com a informação
                const content = fill(cod_not, description, category, date);

                // Gerar um card-deck
                const children = document.createElement("div");
                children.innerHTML = content;

                // Adicionar à div do parent os card-decks que forem gerados
                parent.appendChild(children);
            });
        })
};

const fill = (cod_not, description, category, date) => {
    return ` <div class="${category}">
    <div class="card-body">
        <img src="../imagens/${category}.png" width=58 height=64></img>
        <p class="card-notification">${description}</p>
    </div>
</div>`;
};


const getData1 = () => {

    const cod = localStorage.codchild;

    fetch(url + "NotificationGetLast7days?cod_child=" + cod)
        .then((response) => response.json())
        .then((output) => {
            // Remove todos os dados relativos ao parent
            // Desta forma, o card base continuará a aparecer
            const parent = document.getElementsByClassName("parent1")[0];
            if (output.MSG.length == 0) {
                const content1 = a();
                const children1 = document.createElement("div");
                children1.innerHTML = content1;
        
                parent.appendChild(children1);
            }

            // Adicionar dados ao parent
            // Se o output do array for vazio ou seja se não houver dados a BD, a função "callback" no forEach não será executada
            output.MSG.forEach(({ cod_not, description, category, date }) => {

                // Preencher os cards com a informação
                const content = fill1(cod_not, description, category, date);

                // Gerar um card-deck
                const children = document.createElement("div");
                children.innerHTML = content;

                // Adicionar à div do parent os card-decks que forem gerados
                parent.appendChild(children);
            });
        })
};

const fill1 = (cod_not, description, category, date) => {
    return `<div class="${category}">
    <div class="card-header ${category}1">
        <span class="card-notification date_noti1">${date}</span>
    </div>
    <div class="card-body">
        <img src="../imagens/${category}.png" width=58 height=64></img>
        <p class="card-notification disc_activi2">${description}</p>
    </div>
</div>`;
};


const a = () => {
    return  `<div class="card_noti">

<div class="card-body">
    <div class="col-sm-3">
        <img id ="no_noti" src="../imagens/check1.png" ></img>
    </div>
    <div class="col-sm-10">
        <p id="no_noti_text">Sem Notificações</p>
    </div>
</div>
</div>`
}


window.onload = getData(), getData1();
