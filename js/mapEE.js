async function displayMarkers() {

    // esta variável vai definir a área de mapa a abranger e o nível do zoom
    // de acordo com as posições dos marcadores
    var bounds = new google.maps.LatLngBounds();

    const id = localStorage.codee;
    // Loop que vai percorrer a informação contida em markersData 
    // para que a função createMarker possa criar os marcadores 
    const res = await fetch('http://82.155.91.47:8080/Back-end/CoordenadasEE?cod_ee=' + id);
    const data1 = await res.json();
    const data = data1.MSG;
    const data2 = data1.MSG2;

    console.log(data)
    console.log(data1)

    for (var i = 0; i < data.length; i++) {

        var latlng = new google.maps.LatLng(data[i].lat, data[i].lng);
        var nome = data[i].name;
        var points = data[i].points;
        var category = data[i].category;
        var date = data[i].date;
        var namechild = data2[i].name;

        createMarker(latlng, nome, points, category, namechild, date);

        // Os valores de latitude e longitude do marcador são adicionados à
        // variável bounds
        bounds.extend(latlng);
    }
}
// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, points, category, namechild, date) {
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: nome
    });

    // Evento que dá instrução à API para estar alerta ao click no marcador.
    // Define o conteúdo e abre a Info Window.
    google.maps.event.addListener(marker, 'click', function() {

        // Variável que define a estrutura do HTML a inserir na Info Window.
        var iwContent = '<div class="main"><div id="iw_container" class=" ' + category + '">' +
            '<div class="iw_title map_text">Nome:<span class="map_text2" > ' + nome + '</span></div>' +
            '<div class="iw_content map_text">Pontos:<span class="map_text2"> ' + points + '</span><br />' +
            category + '<br />' +
            namechild + '<br />' +
            date + '</div></div></div>';

        // O conteúdo da variável iwContent é inserido na Info Window.
        infoWindow.setContent(iwContent);

        // A Info Window é aberta com um click no marcador.
        infoWindow.open(map, marker);
    });
}

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(41.4418, -8.29563),
        zoom: 6,
        zoomControl: false,
        //mapTypeId: 'roadmap',
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Cria a nova Info Window com referência à variável infoWindow.
    // O conteúdo da Info Window é criado na função createMarker.
    infoWindow = new google.maps.InfoWindow();

    // Evento que fecha a infoWindow com click no mapa.
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });

    // Chamada para a função que vai percorrer a informação
    // contida na variável markersData e criar os marcadores a mostrar no mapa
    displayMarkers();
}