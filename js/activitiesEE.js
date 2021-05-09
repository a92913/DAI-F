const art = document.getElementById("Artes");

art.addEventListener("click", function(){
    localStorage.setItem("category", "Arte");
    window.location.replace("ee_viewactv.html");
});

const desporto = document.getElementById("Desporto")

desporto.addEventListener("click", function(){
    localStorage.setItem("category", "Desporto");
    window.location.replace("ee_viewactv.html");
});

const music = document.getElementById("Musica");

music.addEventListener("click", function(){
    localStorage.setItem("category", "Música");
    window.location.replace("ee_viewactv.html");
});

const jogos = document.getElementById("Jogos");

jogos.addEventListener("click", function(){
    localStorage.setItem("category", "Jogos");
    window.location.replace("ee_viewactv.html");
});