window.addEventListener('load', function () {
    pageLoad();
});

function pageLoad() {
    fetch('https://jsonplaceholder.typicode.com/posts/' + localStorage.idPost)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            document.getElementById('title').textContent += '\t' + data.title;
            document.getElementById('bodyPost').textContent = data.body;
        });
}

