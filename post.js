var urlBasePost = 'https://jsonplaceholder.typicode.com/posts/';
var actualPost;

window.addEventListener('load', function () {
    pageLoad();
});

function pageLoad() {
    fetch( urlBasePost + localStorage.idPost)
        .then(response => response.json())
        .then(function (data) {
            actualPost = data;
            document.getElementById('title').textContent += '\t' + data.title;
            document.getElementById('body').textContent = data.body;
            
            loadButtonAction('btn1', deleteButtonAction);
            loadButtonAction('btn2', modifyButtonAction);
        });
}


function loadButtonAction(idButton, action){
    document.getElementById(idButton).addEventListener('click', action);
}

function deleteButtonAction(){
    $.ajax({
        type: 'delete',
        url: urlBasePost + localStorage.idPost,
        success: eliminazionePostOk
    });
}

function eliminazionePostOk(){
    alert('Hai effettuato correttamente la cancellazione del post');
}

function modifyButtonAction(){
    var title = document.getElementById('title').textContent;
    var body = document.getElementById('body').textContent;

    document.getElementById('title').remove();
    document.getElementById('body').remove();
    $('#contenitore').append(creaInput(title,'title') + creaInput(body,'body'));
    nuovaFunzionalitaBottone('#btn1', 'Accetta Modifiche');
    nuovaFunzionalitaBottone('#btn2', 'Rifiuta Modifiche', modifyButtonAction, rifiutaModificheAction);
}


function creaRiempiElementoConId(nomeElemento,valore,id,classe){
    return '<' + nomeElemento + ' id = "' + id + '" class="' + classe + '">' + valore + '</' + nomeElemento + '>';
}

function creaInput(valore, id){
    return '<input type="text" value="' + valore + '" id ="' + id + '" class="stileInput"><br>';
}


function nuovaFunzionalitaBottone(id, testo, funzioneVecchia, funzioneNuova){
    $(id).text(testo);
    //$(id).unbind('click');
    //$(id).click(funzione);
    document.getElementById(id).removeEventListener('click',funzioneVecchia);
    document.getElementById(id).removeEventListener('click',funzioneNuova);
}

function rifiutaModificheAction(){
    console.log($('#btn2'));
    /*document.getElementById('title').remove();
    //document.getElementById('body').remove();
    alert(actualPost.title);
    creaRiempiElementoConId('div', actualPost.title, 'title');
    //creaRiempiElementoConId('div', actualPost.body, 'body');
    nuovaFunzionalitaBottone('#btn1', 'Cancella Post', deleteButtonAction);
    nuovaFunzionalitaBottone('#btn2', 'Modifica Post', modifyButtonAction);*/
}