
const art = document.getElementById("Artes");

art.addEventListener("click", function(){
    localStorage.setItem("category", "Arte");
    window.location.replace("viewActivity.html");
});

const desporto = document.getElementById("Desporto")

desporto.addEventListener("click", function(){
    localStorage.setItem("category", "Desporto");
    window.location.replace("viewActivity.html");
});

const music = document.getElementById("Musica");

music.addEventListener("click", function(){
    localStorage.setItem("category", "Musica");
    window.location.replace("viewActivity.html");
});

const jogos = document.getElementById("Jogos");

jogos.addEventListener("click", function(){
    localStorage.setItem("category", "Jogos");
    window.location.replace("viewActivity.html");
});