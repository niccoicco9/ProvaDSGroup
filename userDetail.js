//Questo è un oggetto di prova mi serve adesso per andare a vedere come fare prima di utilizzare il localStorage
var urlBaseJSONPlaceholder = 'https://jsonplaceholder.typicode.com/';
var personaRipristino;
var elementiDaModificare = ['name', 'username', 'address.street', 'address.suite', 'address.city', 'address.zipcode', 'phone', 'website', 'company.name', 'company.catchPhrase', 'company.bs'];
var containerElementiDaModificare = ['nameContainer', 'usernameContainer', 'streetContainer', 'suiteContainer', 'cityContainer', 'zipCodeContainer', 'phoneContainer', 'websiteContainer', 'nameCompanyContainer', 'sloganContainer', 'bsContainer'];

$(document).ready(function () {
    $.getJSON(urlBaseJSONPlaceholder + 'users/' + localStorage.idPersona, function (persona) {
        personaRipristino = persona;
        bindingUser(persona);
        drawMaps(persona);
        requestPostsUser(persona.id);

        $('#modifyButton').click(actionModifyButton);
        $('#deleteButton').click(actionDeleteButton);
        $('#sendPost').click(sendPostAction);
    });
});

function bindingUser(persona) {
    $('#titolo').append(persona.name);
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
        zoom: 11
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
function requestPostsUser(userId) {
    var url = urlBaseJSONPlaceholder + 'posts?userId=' + 4;
    $.getJSON(url, function (result) {

        for (var i = 0; i < result.length; i++) {
            //Creo l'anchor tag
            var link = creaRiempiElementoConId('a','Dettagli', 'btn' + i);

            //Creo gli elementi che comporranno la riga della tabella
            var elementiTD = 
                creaRiempiElementoConId('td', result[i].title, 'tdName' + i) + 
                creaRiempiElementoConId('td', link, 'tdDetail' + i);
            
            //Creo e popolo la riga della tabella
            var elementoTR = creaRiempiElementoConId('tr', elementiTD, 'tr' + result[i].id);
            $('#bodyTable').append(elementoTR);

            //Do funzionalità ai link
            $('#btn' + i).click(bottoneClick);
            $('#btn' + i).attr('href','indexPost.html');
        }


        function bottoneClick(e) {
            var idpost = e.target.id;
            localStorage.idPost = idpost.substring(3, idpost.length);
        }
    });
}

function actionDeleteButton() {
    eliminaRecord(urlBaseJSONPlaceholder + 'users/' + personaRipristino.id);
}

function actionModifyButton() {
    var elementiDaEliminare = ['name', 'username', 'address.street', 'address.suite', 'address.city', 'address.zipcode', 'phone', 'website', 'company.name', 'company.catchPhrase', 'company.bs', 'modifyButton', 'deleteButton'];
    eliminaInsiemeElementi(elementiDaEliminare);

    $('#nameContainer').append(creaInput(personaRipristino.name, 'name'));
    $('#usernameContainer').append(creaInput(personaRipristino.username, 'username'));
    $('#streetContainer').append(creaInput(personaRipristino.address.street, 'address.street'));
    $('#suiteContainer').append(creaInput(personaRipristino.address.suite, 'address.suite'));
    $('#cityContainer').append(creaInput(personaRipristino.address.city, 'address.city'));
    $('#zipCodeContainer').append(creaInput(personaRipristino.address.zipcode, 'address.zipcode'));
    $('#phoneContainer').append(creaInput(personaRipristino.phone, 'phone'));
    $('#websiteContainer').append(creaInput(personaRipristino.website, 'website'));
    $('#nameCompanyContainer').append(creaInput(personaRipristino.company.name, 'company.name'));
    $('#sloganContainer').append(creaInput(personaRipristino.company.catchPhrase, 'company.catchPhrase'));
    $('#bsContainer').append(creaInput(personaRipristino.company.bs, 'company.bs'));

    creazioneBottoniera(
        ['acceptButton', 'refusedButton'],
        ['IMG/accetta.png', 'IMG/ripristina.png'],
        ['Accetta modifiche', 'Ripristina'],
        [actionAcceptModifyButton, actionRefusedButton]
    );
}


function creazioneBottoniera(arrayID, arrayImmagini, arrayValori, arrayAzioni) {
    for (var i = 0; i < arrayID.length; i++) {
        $('#actionButton').append(
            creaBottoneConImmagine(arrayID[i], arrayImmagini[i], arrayValori[i])
        );
        $('#' + arrayID[i]).attr('class', 'btn btn-default btn-sm');
        $('#' + arrayID[i]).click(arrayAzioni[i]);
    }
}

function actionRefusedButton() {
    var elementiDaEliminare = ['name', 'username', 'address.street', 'address.suite', 'address.city', 'address.zipcode', 'phone', 'website', 'company.name', 'company.catchPhrase', 'company.bs', 'acceptButton', 'refusedButton'];
    eliminaInsiemeElementi(elementiDaEliminare);

    $('#nameContainer').append(creaRiempiElementoConId('div', personaRipristino.name, 'name'));
    $('#usernameContainer').append(creaRiempiElementoConId('div', personaRipristino.username, 'username'));
    $('#streetContainer').append(creaRiempiElementoConId('div', personaRipristino.address.street, 'address.street'));
    $('#suiteContainer').append(creaRiempiElementoConId('div', personaRipristino.address.suite, 'address.suite'));
    $('#cityContainer').append(creaRiempiElementoConId('div', personaRipristino.address.city, 'address.city'));
    $('#zipCodeContainer').append(creaRiempiElementoConId('div', personaRipristino.address.zipcode, 'address.zipcode'));
    $('#phoneContainer').append(creaRiempiElementoConId('div', personaRipristino.phone, 'phone'));
    $('#websiteContainer').append(creaRiempiElementoConId('div', personaRipristino.website, 'website'));
    $('#nameCompanyContainer').append(creaRiempiElementoConId('div', personaRipristino.company.name, 'company.name'));
    $('#sloganContainer').append(creaRiempiElementoConId('div', personaRipristino.company.catchPhrase, 'company.catchPhrase'));
    $('#bsContainer').append(creaRiempiElementoConId('div', personaRipristino.company.bs, 'company.bs'));

    creazioneBottoniera(
        ['modifyButton', 'deleteButton'],
        ['IMG/modifica.png', 'IMG/cancella.png'],
        ['Modifica utente', 'Elimina utente'],
        [actionModifyButton, actionDeleteButton]
    );
}


function actionAcceptModifyButton() {
    personaRipristino.name = document.getElementById('name').value;
    personaRipristino.username = document.getElementById('username').value;
    personaRipristino.address.street = document.getElementById('address.street').value;
    personaRipristino.address.suite = document.getElementById('address.suite').value;
    personaRipristino.address.city = document.getElementById('address.city').value;
    personaRipristino.address.zipcode = document.getElementById('address.zipcode').value;
    personaRipristino.phone = document.getElementById('phone').value;
    personaRipristino.website = document.getElementById('website').value;
    personaRipristino.company.name = document.getElementById('company.name').value;
    personaRipristino.company.catchPhrase = document.getElementById('company.catchPhrase').value;
    personaRipristino.company.bs = document.getElementById('company.bs').value;

    actionRefusedButton();
    aggiornaRecord(urlBaseJSONPlaceholder + 'users/' + personaRipristino.id, personaRipristino);
}


function sendPostAction() {
    inserisciRecord(urlBaseJSONPlaceholder + 'posts/', $('#formNuovoPost').serialize());
}