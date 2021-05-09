const url = "http://82.155.91.47:8080/Back-end/";


const getData = () => {

    const cod = localStorage.codchild;

    fetch(url + "ActivityScheduledChild?cod_child=" + cod)
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
            output.MSG.forEach(({ cod_act, name, date, duration, start_time, category }) => {
                let duration1 = `${duration.substr(0,5 )}`;
                let start_time1 = `${start_time.substr(0,5 )}`;
                // Preencher os cards com a informação
                const content = fill(cod_act, name, date, duration1, start_time1, category);

                // Gerar um card-decks
                const children = document.createElement("div");
                children.innerHTML = content;

                // Adicionar à div do parent os card-decks que forem gerados
                parent.appendChild(children);
            });
        })
};

const fill = (cod_act, name, date, duration, start_time, category) => {
    return ` <div class="card ${category}">
            <div class="card-header ${category}1">
                <span class="card-activities"> ${date}</span>
            </div>
            <div class="card-body">
                <div class="col-sm-3">
                    <img src="../imagens/${category}.png" width=58 height=64></img>
                </div>
                <div class="col-sm-3">
                    <span class="text-1"> ${start_time}</span>
                    <span class="text-1"> ${duration}</span>
                </div>
                <div class="col-sm-6">
                    <p class="card-notification"> ${name}</p>
                </div>
            </div>
        </div>`;
};

const a = () => {
    return  ` <div class="card music">
    <div class="card-body">
        <div class="col-sm-3">
            <img id ="no_activi" src="../imagens/sad.png" ></img>
        </div>
        <div class="col-sm-10">
            <p id="no_activi_text">Sem Atividades Agendadas</p>
        </div>
    </div>
</div>`
  }
window.onload = getData();
