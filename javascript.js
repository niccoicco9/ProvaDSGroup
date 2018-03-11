/* jshint esversion: 6 */
var urlBaseJSONPlaceholder = 'https://jsonplaceholder.typicode.com/';


window.addEventListener('load',function(){
    pageLoad();
});


const user = fetch(urlBaseJSONPlaceholder + 'users')
  .then(response => response.json())
  .then(json => json);

function pageLoad(){
    user.then(function(users){

        for(let i = 0; i< users.length; i++){
            var link = creaRiempiElementoConId('a','Dettagli', 'persona' + users[i].id);
            var link2 = creaRiempiElementoConId('a','Post', 'postPersona' + users[i].id);
            var elementiTD = 
                creaRiempiElementoConId('td', users[i].name, 'tdName' + i) +
                creaRiempiElementoConId('td', users[i].username, 'tdUsername' + i) +  
                creaRiempiElementoConId('td', link, 'tdPersona' + users[i].id) +
                creaRiempiElementoConId('td', link2, 'tdPostPersona' + users[i].id);
            
            var elementoTR = creaRiempiElementoConId('tr', elementiTD, 'row' + i);
            $('tbody').append(elementoTR);

            $('#persona' + users[i].id).click(bottonePersona);
            $('#postPersona' + users[i].id).click(bottonePost);

            $('#persona' + users[i].id).attr('href', 'userDetail.html');
            $('#postPersona' + users[i].id).attr('href', 'userDetail.html#listaPost');
        }

        function bottonePersona(e){
            var idPersona = e.target.id;
            localStorage.idPersona = idPersona.substring(7, idPersona.length);
        }

        function bottonePost(e){
            var idPersona = e.target.id;
            localStorage.idPersona = idPersona.substring(11, idPersona.length);
        }
    });
    $('#sendNewUser').click(newUser);
 }



 function newUser(){
    inserisciRecord(urlBaseJSONPlaceholder + 'users', $('#formNuovoUtente').serialize());
 }
