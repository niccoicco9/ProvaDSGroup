//Questo è un oggetto di prova mi serve adesso per andare a vedere come fare prima di utilizzare il localStorage
var urlBaseJSONPlaceholder = 'https://jsonplaceholder.typicode.com/';
var modifica = false;
var personaRipristino;
var elementiDaModificare = ['name', 'username', 'address.street', 'address.suite', 'address.city', 'address.zipcode', 'phone', 'website', 'company.name', 'company.catchPhrase', 'company.bs'];
var containerElementiDaModificare = ['nameContainer', 'surnameContainer', 'streetContainer', 'suiteContainer', 'cityContainer', 'zipCodeContainer', 'phoneContainer', 'websiteContainer', 'nameCompanyContainer', 'sloganContainer', 'bsContainer'];

$(document).ready(function () {
    $.getJSON(urlBaseJSONPlaceholder + 'users/' + localStorage.idPersona, function (persona) {
        personaRipristino = persona;
        bindingUser(persona);
        drawMaps(persona);
        requestPostUser(persona.id);
    });
});

$('#modifyButton').click(function () {
    modificaTuttiInput();
    cambiaBottoni();
});

$('#ripristina').click(function () {
    $.getJSON(urlBaseJSONPlaceholder + 'users/' + localStorage.idPersona, function (persona) {
        modificaTuttiInput();
        cambiaBottoni();
        ripristinaAction();
    });
});

$('#deleteButton').click(eliminaUtente);
$('#accettaModifiche').click(inviaNotifiche);

function bindingUser(persona) {
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


//Questa funzione mi permette di costruire la mappa di google, centrandola nelle coordinate fornite 
// dal servizio di jsonplaceholder
function drawMaps(persona) {
    //Preparo l'accentramento della mappa
    var mapProperties = {
        center: new google.maps.LatLng(persona.address.geo.lat, persona.address.geo.lng),
        zoom: 16
    };
    //Genero la mappa
    var map = new google.maps.Map(document.getElementById('mapSection'), mapProperties);
    //Posiziono il marker
    new google.maps.Marker({
        position: mapProperties.center,
        map: map
    });
}


//Creazione della tabella dei post
function requestPostUser(userId) {
    var url = urlBaseJSONPlaceholder + 'posts?userId=' + 4;
    $.getJSON(url, function (result) {

        for (var i = 0; i < result.length; i++) {
            //Creo il td del nome
            var elementTdNamePost = document.createElement('td');
            elementTdNamePost.id = 'tdName' + i;
            elementTdNamePost.textContent = result[i].title;

            //Creo il td del link della pagina del dettaglio
            var elementTdDetailPost = document.createElement('td');
            elementTdDetailPost.id = 'tdDetail' + i;

            var button = document.createElement('a');
            button.id = 'btn' + result[i].id;
            button.textContent = 'Dettagli';
            button.href = 'indexPost.html';
            button.addEventListener('click', bottoneClick);
            elementTdDetailPost.append(button);

            //Creo il tr che contiene i td appena creati
            var elementTr = document.createElement('tr');
            elementTr.id = 'tr' + i;
            elementTr.append(elementTdNamePost);
            elementTr.append(elementTdDetailPost);

            //Aggiungo la riga alla tabella
            $('#bodyTable').append(elementTr);
        }


        function bottoneClick(e) {
            var idpost = e.target.id;
            localStorage.idPost = idpost.substring(3, idpost.length);
        }
    });
}


function modificaInput(idTag, idContainer, modify) {
    var newElement;
    var oldElement = document.getElementById(idTag);
    if (modify) {
        newElement = document.createElement('input');
        newElement.value = oldElement.textContent;
    } else {
        newElement = document.createElement('div');
        newElement.textContent = oldElement.value;
    }

    newElement.name = oldElement.id;
    newElement.id = oldElement.id;

    oldElement.remove();
    $('#' + idContainer).append(newElement);
}


function modificaTuttiInput() {
    modifica = !modifica;
    for (var i = 0; i < elementiDaModificare.length; i++) {
        modificaInput(elementiDaModificare[i], containerElementiDaModificare[i], modifica);
    }
}

function eliminaUtente() {
    $.ajax({
        url: urlBaseJSONPlaceholder + 'users/' + localStorage.idPersona,
        type: 'DELETE',
        success: function (success) {
            alert('Eliminato');
        }
    });
}


function cambiaBottoni() {
    if (modifica) {
        document.getElementById('accettaModifiche').style.visibility = 'visible';
        document.getElementById('ripristina').style.visibility = 'visible';
        document.getElementById('modifyButton').style.visibility = 'hidden';
        document.getElementById('deleteButton').style.visibility = 'hidden';
    } else {
        document.getElementById('accettaModifiche').style.visibility = 'hidden';
        document.getElementById('ripristina').style.visibility = 'hidden';
        document.getElementById('modifyButton').style.visibility = 'visible';
        document.getElementById('deleteButton').style.visibility = 'visible';
    }
}

function inviaNotifiche() {
    $.ajax({
        url: urlBaseJSONPlaceholder + 'users/' + localStorage.idPe,
        type: 'put',
        data: $('#formDati').serialize(),
        success: function () {
            alert('Modifica effettuata');
        }
    });
}


function ripristinaAction() {
    document.getElementById('name').textContent = personaRipristino.name;
    document.getElementById('username').textContent = personaRipristino.username;
    document.getElementById('address.street').textContent = personaRipristino.address.street;
    document.getElementById('address.suite').textContent = personaRipristino.address.suite;
    document.getElementById('address.city').textContent = personaRipristino.address.city;
    document.getElementById('address.zipcode').textContent = personaRipristino.address.zipcode;
    document.getElementById('phone').textContent = personaRipristino.phone;
    document.getElementById('website').textContent = personaRipristino.website;
    document.getElementById('company.name').textContent = personaRipristino.company.name;
    document.getElementById('company.catchPhrase').textContent = personaRipristino.company.catchPhrase;
    document.getElementById('company.bs').textContent = personaRipristino.company.bs;
}