function eliminaRecord(urlRecordDaEliminare) {
    $.ajax({
        url: urlRecordDaEliminare,
        type: 'DELETE',
        success: alertMessaggio('Cancellazione effettuata')
    });
}


function aggiornaRecord(urlRecordDaAggiornare, nuoviDati){
    $.ajax({
        url: urlRecordDaAggiornare,
        type: 'put',
        data: nuoviDati,
        success: alertMessaggio('Aggiornamento effettuato')
    });
}

function inserisciRecord(urlRecordDaInserire, nuoviDati){
    $.ajax({
        url: urlRecordDaInserire,
        type: 'post',
        data: nuoviDati,
        success: alertMessaggio('Inserimento effettuato')
    });
}