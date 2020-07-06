/*jslint this:true,
        devel: true,
        eval: true,
        browser: true,
        for,
        es6
*/
/*global window, fetch*/

var input = document.querySelector('.repos-container .input-container input'),
    button = document.querySelector('.repos-container .button-container'),
    result = document.querySelector('.data-show'),
    user,
    arrayUsers = [];

function getPosts() {
    "use strict";
    result.innerHTML = '';
    if (user === '*' || user.toLowerCase() === 'all') {
        fetch('http://jsonplaceholder.typicode.com/posts')
            .then((Res) => Res.json())
            .then(function (repos) {
                repos.forEach(function (repo) {
                    var divUserContainer = document.createElement('div'),
                        divUserID = document.createElement('div'),
                        divTitle = document.createElement('div'),
                        divPost = document.createElement('div');
                    divUserContainer.setAttribute('class', 'user-container');
                    divUserContainer.setAttribute('title', 'post ' + repo.id);
                    divUserID.setAttribute('class', 'user-id');
                    divUserID.textContent = 'User Id (' + repo.userId + ')';
                    divTitle.setAttribute('class', 'title');
                    divTitle.textContent = repo.title;
                    divPost.setAttribute('class', 'post');
                    divPost.textContent = repo.body;
                    divUserContainer.appendChild(divUserID);
                    divUserContainer.appendChild(divTitle);
                    divUserContainer.appendChild(divPost);
                    result.appendChild(divUserContainer);
                });
            });
    } else {
        fetch('http://jsonplaceholder.typicode.com/posts')
            .then((Res) => Res.json())
            .then(function (repos) {
                repos.forEach(function (repo) {
                    if (repo.userId === Number(user)) {
                        var divUserContainer = document.createElement('div'),
                            divUserID = document.createElement('div'),
                            divTitle = document.createElement('div'),
                            divPost = document.createElement('div');
                        divUserContainer.setAttribute('class', 'user-container');
                        divUserContainer.setAttribute('title', 'post ' + repo.id);
                        divUserID.setAttribute('class', 'user-id');
                        divUserID.textContent = 'User Id (' + repo.userId + ')';
                        divTitle.setAttribute('class', 'title');
                        divTitle.textContent = repo.title;
                        divPost.setAttribute('class', 'post');
                        divPost.textContent = repo.body;
                        divUserContainer.appendChild(divUserID);
                        divUserContainer.appendChild(divTitle);
                        divUserContainer.appendChild(divPost);
                        result.appendChild(divUserContainer);
                    }
                });
            });
    }
}


function checkInput() {
    "use strict";
    user = input.value.trim();
    if ((user === '*' || user.toLowerCase() === 'all' || Number.isInteger(Number(user))) && user !== "" && user !== null) {
        if (arrayUsers.indexOf(Number(user)) > -1 || user === '*' || user.toLowerCase() === 'all') {
            getPosts();
        } else {
            alert('Sorry! User Id Not Exist.');
        }
    } else {
        alert('user cannot be letter or empty');
    }
}



button.onclick = checkInput;
input.addEventListener('keyup', function (event) {
    "use strict";
    if (event.keyCode === 13) {
        checkInput();
    }
});

window.onload = function () {
    "use strict";
    fetch('http://jsonplaceholder.typicode.com/posts')
        .then((Res) => Res.json())
        .then(function (repos) {
            repos.forEach(function (repo) {
                arrayUsers.push(repo.userId);
            });
        });
};