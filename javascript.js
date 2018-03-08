
window.addEventListener('load',function(){
    pageLoad();
})

const user = fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => json);

function pageLoad( ){
    user.then(function(data){

        for(let i = 0; i< data.length; i++){
            const link =document.createElement('a'); 
            const link2 =document.createElement('a'); 
            const user = data[i];
            const tbody = document.getElementById('tableBody');
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            
            link.href = 'userDetail';
            link2.href = 'userDetail';
            
            td.innerHTML = user.name;
            td1.innerHTML = user.username;
            link.innerHTML = 'Dettagli';
            link2.innerHTML = 'Post';
            td2.appendChild(link);
            td3.appendChild(link2);
            
            tbody.appendChild(tr);
            tr.appendChild(td);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
        }
    })
 }