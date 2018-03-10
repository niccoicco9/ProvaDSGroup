function creaRiempiElementoConId(nomeElemento,valore,id){
    return '<' + nomeElemento + ' id = "' + id + '">' + valore + '</' + nomeElemento + '>';
}

function creaInput(valore, id){
    return '<input type="text" value="' + valore + '" id ="' + id + '" class="stileInput">';
}

function creaBottoneConImmagine(id,linkImmagine, valore){
    return '<button type="button" id="' + id + '"> <img src="' + linkImmagine + '"> ' + valore + '</img></button>';
}

function eliminaInsiemeElementi(arrayElementiDaEliminare){
    for(var i = 0; i < arrayElementiDaEliminare.length; i++){
        //$('#' + arrayElementiDaEliminare[i]).remove();
        document.getElementById(arrayElementiDaEliminare[i]).remove();
    }
}

function alertMessaggio(msg){
    alert(msg);
}