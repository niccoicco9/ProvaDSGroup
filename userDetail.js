//Questo è un oggetto di prova mi serve adesso per andare a vedere come fare prima di utilizzare il localStorage
var informazioniProva = {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  };


 $(document).ready(function(){
    //Qua arriva l'informazione dal localStorage
    var persona = informazioniProva;
    bindingUser(persona);
    drawMaps(persona);
});

function bindingUser(persona){
    //Se c'è tempo studia una soluzione più funzionale
    document.getElementById('name').textContent = persona.name;
    document.getElementById('username').textContent = persona.username;
    document.getElementById('address.street').textContent = persona.address.street;
    document.getElementById('address.suite').textContent = persona.address.suite;
    document.getElementById('address.city').textContent = persona.address.city;
    document.getElementById('address.zipcode').textContent = persona.address.zipcode;
    document.getElementById('phone').textContent = persona.phone;
    document.getElementById('website').textContent = persona.website;
    document.getElementById('company.name').textContent = persona.company.name;
    document.getElementById('company.catchPhrase').textContent = persona.company.catchPhrase;
    document.getElementById('company.bs').textContent = persona.company.bs;
}


function drawMaps(persona){
    console.log(persona);
    //Preparo l'accentramento della mappa
    var mapProperties = {
        center: new google.maps.LatLng(persona.address.geo.lat, persona.address.geo.lng),
        zoom: 16
    };
    //Genero la mappa
    var map = new google.maps.Map(document.getElementById('mappa'), mapProperties); 
    //Posiziono il marker
    new google.maps.Marker({
        position: mapProperties.center,
        map: map
    });
}