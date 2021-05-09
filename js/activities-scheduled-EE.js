const url = "http://82.155.91.47:8080/Back-end/";

const getActivitiesScheduled = () => {

    const cod = localStorage.codee;

    fetch(url + "ActivityScheduledEE?cod_ee=" + cod)
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
            output.MSG.forEach(({ cod_act, name, date, duration, start_time, category, namechild, cod_child }) => {
                let duration1 = `${duration.substr(0,5 )}`;
                let start_time1 = `${start_time.substr(0,5 )}`;

                // Preencher os cards com a informação
                const content = fill(cod_act, name, date, duration1, start_time1, category, namechild, cod_child);

                // Gerar um card-deck
                const children = document.createElement("div");
                children.innerHTML = content;

                // Adicionar à div do parent os card-decks que forem gerados
                parent.appendChild(children);
            });
        })
};

const fill = (cod_act, name, date, duration, start_time, category, namechild, cod_child) => {
    return `<div class="card ${category}" id="${cod_act}a${cod_child}">
                <div class="card-header header ${category}1">
                <div class="col-sm-8"> 
                    <span class="name"> ${namechild} </span>
                </div>
                <div class="col-sm-4">
                    <span class="card-activities date_sheluded"> ${date}</span>
                </div>
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
                    <p class="card-notification name_activity"> ${name}</p>
                </div>
            </div>
            <div class="card-body col-sm-12">
                <button class="anular_inscricao text-right" onclick="cancel(${cod_act}, ${cod_child})">Anular Inscrição</button>
            </div>
        </div>`;
};

const a = () => {
    return ` <div class="card music">
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

async function cancel(cod_act, cod_child) {
    const response = await fetch(url + "ActivityCheckDate?cod_act=" + cod_act);
    const resp = await response.json();

    const verify = resp.checkDate;

    if (verify >= 1) {
        Swal.fire({
            text: "Não pode desinscrever o seu Educando!",
            icon: "error",
        })

    } else {
        Swal.fire({
            text: "Pretende desinscrever o seu Educando na atividade ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(url + "SubscriptionDelete?cod_act="+ cod_act+"&cod_child=" + cod_child, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    method: 'GET',
                }).then(function (response) {
                    if (!response.ok) {
                        console.log(response.status);
                        console.log(response.statusText);
                        console.log(response.headers);
                        console.log(response.url); //=> String
                        Swal.fire({
                            text: "Aconteceu um erro, lamentamos o sucedido",
                            icon: "error",
                        })
                    }
                    else {
                        Swal.fire({
                            text: "Filho desinscrito!",
                            icon: "success",
                        })
                        const id = cod_act + "a"+ cod_child;
                        document.getElementById(id).classList.add('hide');
                    }
                })

            }
            else { }
        })
    }

}
window.onload = getActivitiesScheduled();