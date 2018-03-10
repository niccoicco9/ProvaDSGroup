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
            document.getElementById('title').textContent = actualPost.title;
            document.getElementById('body').textContent = actualPost.body;
            
            $('#btnDelete').click(deleteButtonAction);
            $('#btnModify').click(modifyButtonAction);
        });
}

function deleteButtonAction(){
    eliminaRecord(urlBasePost + localStorage.idPost);
}

function modifyButtonAction(){
    var title = document.getElementById('title').textContent;
    var body = document.getElementById('body').textContent;

    eliminaInsiemeElementi(['title','body', 'btnDelete', 'btnModify']);
    $('#contenitore').append(
        creaInput(title,'title') + 
        creaRiempiElementoConId('textarea', body, 'body') + 
        creaBottoneConImmagine('btnAccept','IMG/accetta.png','Accetta') + 
        creaBottoneConImmagine('btnRefused','IMG/ripristina.png','Ripristina')
    );
    

    $('#btnAccept').click(accettaModificheAction);
    $('#btnRefused').click(rifiutaModificheAction);
}





function rifiutaModificheAction(){
    eliminaInsiemeElementi(['title','body', 'btnAccept', 'btnRefused']);
    $('#contenitore').append(
        creaRiempiElementoConId('h3', actualPost.title, 'title') +
        creaRiempiElementoConId('div', actualPost.body, 'body') +
        creaBottoneConImmagine('btnDelete', 'IMG/cancella.png', 'Cancella Post') +
        creaBottoneConImmagine('btnModify', 'IMG/modifica.png', 'Modifica')
    );
    $('#btnDelete').click(deleteButtonAction);
    $('#btnModify').click(modifyButtonAction);
}

function accettaModificheAction(){
    //Modificare l'oggetto actualPost mi consente in un colpo solo di tenere aggiornati i dati
    //localmente e di poter poi andare a ripristinare gli elementi precedenti
    actualPost.title = $('#title').val();
    actualPost.body = $('#body').val();
    $.ajax({
        url: urlBasePost + '/' + actualPost.id,
        data: actualPost,
        type: 'put',
        success: alertMessaggio('Modifica effettuata')
    });
    rifiutaModificheAction();   //Così facendo vado a ripristinare gli elementi precedenti
}