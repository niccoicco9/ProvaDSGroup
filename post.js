window.addEventListener('load',function(){
    pageLoad();
})

  function pageLoad(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(function(data){
        console.log(data);
        for(let i = 0; i< data.length; i++){
            const cont = document.getElementById('contenitore');
            const nome = document.createElement('div'); 
            const corpo =document.createElement('div'); 
            const post = data[i];

            nome.innerHTML = post.title;
            corpo.innerHTML = post.body; 
            
            cont.appendChild(nome);
            cont.appendChild(corpo);
        }
    })
 }