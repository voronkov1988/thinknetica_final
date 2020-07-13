'use strict';
const inputUser = document.querySelector('input#user'),
    inputRepos = document.querySelector('input#repos'),
    reposDiv = document.querySelector('.repos'),
    usersDiv = document.querySelector('.users');

async function getUsers(value){
    fetch(`https://api.github.com/search/users?q=${value}`)
        .then(response =>{
            if(response.status !== 200)
                return Promise.reject(new Error(response.status));
            return Promise.resolve(response);
        })
        .then(res =>{
            return res.json();
        })
        .then(result =>{
            renderUsers(result.items)
        })
}

function renderUsers(users=null){
    let arrayUsers = [];
    users.forEach(user=>{
        let element = document.createElement('div');
        element.classList = 'one-user';
        element.innerHTML = user.login;
        usersDiv.append(element);
        arrayUsers.push(element);
    });
    writeIntoInput(arrayUsers)
}

function writeIntoInput(el){
    let user = '';
    el.forEach(item =>{
        item.addEventListener('click', (e)=>{
            inputUser.value = e.target.textContent;
            usersDiv.innerHTML = '';
            user = inputUser.value;
            loadRepository(user)
        })
    });

}

function loadRepository(user){
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(res=>{
            return res.json();
        })
        .then(result =>{
            renderRepository(result)
        })
}

function renderRepository(repos){
    let reposArray = [];
    repos.forEach(item=>{
        let element = document.createElement('div');
        element.classList = 'one-repos';
        element.innerHTML = item.name;
        reposDiv.append(element);
        reposArray.push(element);
    });
    writeIntoRepos(reposArray)
}

function writeIntoRepos(perosArray) {
    perosArray.forEach(oneRepos =>{
        oneRepos.addEventListener('click', (e)=>{
            inputRepos.value = e.target.textContent;
            reposDiv.innerHTML = '';
            getIssues(inputUser.value, inputRepos.value);
        })
    });
}

function debounce(f, ms) {
    let isCooldown = false;
    return function() {
        if (isCooldown) return;
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => isCooldown = false, ms);
    };
}

inputUser.addEventListener('input', (e)=>{
    usersDiv.innerHTML = '';
    inputRepos.value = '';
    setTimeout(()=> delayUser(e.target.value),1000);
});
const delayUser = debounce(getUsers, 1000);
