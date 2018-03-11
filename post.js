var urlBasePost = 'https://jsonplaceholder.typicode.com/posts/';
var actualPost;

window.addEventListener('load', function () {
    pageLoad();
});

function pageLoad() {
    fetch(urlBasePost + localStorage.idPost)
        .then(response => response.json())
        .then(function (data) {
            actualPost = data;
            $('#headingTitle').text(actualPost.title);
            $('#title').text(actualPost.title);
            $('#body').text(actualPost.body);

            $('#btnDelete').click(deleteButtonAction);
            $('#btnModify').click(modifyButtonAction);
        });
}

function deleteButtonAction() {
    eliminaRecord(urlBasePost + localStorage.idPost);
    location.href ='userDetail.html';
}

function modifyButtonAction() {
    var title = $('#title').text();
    var body = $('#body').text();

    eliminaInsiemeElementi(['title', 'body', 'btnDelete', 'btnModify']);
    $('#titleContainer').append(creaInput(title, 'title'));
    $('#bodyContainer').append(creaRiempiElementoConId('textarea', body, 'body'));
    $('#actionButton').append(
        creaBottoneConImmagine('btnAccept', 'IMG/accetta.png', 'Accetta') +
        creaBottoneConImmagine('btnRefused', 'IMG/ripristina.png', 'Ripristina')
    );

    $('#title').attr('class', 'componentiPost form-control');
    $('#body').attr('class', 'componentiPost form-control');
    $('#body').attr('rows',5);
    $('#btnAccept').attr('class', 'buttonStyle btn btn-default btn-sm');
    $('#btnRefused').attr('class', 'buttonStyle btn btn-default btn-sm');
    $('#btnAccept').click(accettaModificheAction);
    $('#btnRefused').click(rifiutaModificheAction);
}





function rifiutaModificheAction() {
    eliminaInsiemeElementi(['title', 'body', 'btnAccept', 'btnRefused']);
    $('#headingTitle').text(actualPost.title);
    $('#titleContainer').append(creaRiempiElementoConId('div', actualPost.title, 'title'));
    $('#bodyContainer').append(creaRiempiElementoConId('div', actualPost.body, 'body'));
    $('#actionButton').append(creaBottoneConImmagine('btnDelete', 'IMG/cancella.png', 'Cancella Post') +
        creaBottoneConImmagine('btnModify', 'IMG/modifica.png', 'Modifica')
    );

    $('#title').attr('class', 'componentiPost');
    $('#body').attr('class', 'componentiPost');
    $('#btnDelete').attr('class', 'buttonStyle btn btn-default btn-sm');
    $('#btnModify').attr('class', 'buttonStyle btn btn-default btn-sm');
    $('#btnDelete').click(deleteButtonAction);
    $('#btnModify').click(modifyButtonAction);
}

function accettaModificheAction() {
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