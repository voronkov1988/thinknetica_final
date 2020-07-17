import "./style.css";

const statusDiv = document.querySelector(".status-div");
const resultDiv = document.querySelector(".result-div");
const modalPage = document.querySelector(".modal-page");
const form = document.querySelector("form.issues-form");

function getIssues(user, repository){
    fetch(`https://api.github.com/repos/${user}/${repository}/issues`)
        .then(result =>{
            if(result.status !== 200){
                return Promise.reject(new Error(result.status));
            }
            return Promise.resolve(result);
        })
        .then(res =>{
            statusDiv.innerHTML = "Готово...";
            setTimeout(()=>{
                statusDiv.innerHTML = "";
            }, 3000);

            return res.json();
        })
        .then(response =>{
            renderIssues(response);
        })
        .catch(function(error) {
            statusDiv.innerHTML = `Ошибка ${error}`;
            console.log("Request failed", error);
        });
}

function renderIssues(issues){
    issues.forEach(item =>{
        let element = document.createElement("div");
        element.innerHTML = `
        <div class="result-div">
            <div data-closed="${item.closed_at}" class="issues">
                <div class="profile">
                    <img data-number="${item.number}"
                         data-created="${item.created_at}"
                         data-title="${item.title}"
                         data-description="${item.body}"
                         data-image="${item.user.avatar_url}"
                         data-link="${item.user.html_url}"
                         data-closed="${item.closed_at}"
                         data-updated="${item.updated_at}"
                     src="${item.user.avatar_url}" alt="image">
                    <p><a href="${item.user.html_url}">Профиль</a></p>
                </div>
                <div class="info">
                    <div class="info-title">
                        <div class="title">${item.title}</div>
                        <div class="number">номер issue: ${item.number}</div>
                    </div>
                    <div class="description">${item.body.slice(0, 100)}</div>
                    <div class="data-created">${item.created_at}</div>
                </div>
            </div>
        </div>
    `;
        resultDiv.append(element);
    });
    takeModal();
}

function takeModal(){
    let imgDiv = document.querySelectorAll(".profile img");
    imgDiv.forEach(item=>{
        item.addEventListener("click", (e)=>{
            renderModal(e.target);
        });
    });
}

function renderModal(data){
    modalPage.innerHTML = "";
    let element = document.createElement("div");
    element.classList = "wrapper";
    element.innerHTML = `
        <div class="modal-info">
            <div class="modal-contacts">
                <img src="${data.dataset.image}" alt="">
                <p><a href="${data.dataset.link}">Issue link</a></p>
            </div>
            <div class="modal-title">
                <div class="modal-h2">${data.dataset.title}</div>
                <div class="modal-description">${data.dataset.description}</div>
            </div>
        </div>
        <button>Закрыть</button>
        <div class="modal-meta">
            <div class="modal-created">Дата создания: ${data.dataset.created}</div>
            <div class="modal-updated">Дата обновления: ${data.dataset.updated}</div>
            <div class="modal-number">Номер issues: ${data.dataset.number}</div>
        </div>
        
    `;
    modalPage.append(element);
    modalPage.style.display = "block";
    const button = document.querySelector(".modal-page button");
    button.addEventListener("click",()=>{
        modalPage.innerHTML = "";
    });
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputUser = document.querySelector("input#user").value,
        inputRepos = document.querySelector("input#repos").value;
    resultDiv.innerHTML = "";
    usersDiv.innerHTML = "";
    reposDiv.innerHTML = "";
    statusDiv.innerHTML = "Загрузка...";
    getIssues(inputUser, inputRepos);
    console.log(inputRepos, inputUser);
});

const inputUser = document.querySelector("input#user");
const inputRepos = document.querySelector("input#repos");
const reposDiv = document.querySelector(".repos");
const status = document.querySelector(".status-div");
const usersDiv = document.querySelector(".users");

async function getUsers(value){
    fetch(`https://api.github.com/search/users?q=${value}`)
        .then(response =>{
            if(response.status !== 200){
                return Promise.reject(new Error(response.status));
            }
            return Promise.resolve(response);
        })
        .then(res =>{
            return res.json();
        })
        .then(result =>{
            renderUsers(result.items);
        })
        .catch(function(error) {
            status.innerHTML = `Ошибка ${error}`;
        });
}

function renderUsers(users=null){
    let arrayUsers = [];
    users.forEach(user=>{
        let element = document.createElement("div");
        element.classList = "one-user";
        element.innerHTML = user.login;
        usersDiv.append(element);
        arrayUsers.push(element);
    });
    writeIntoInput(arrayUsers);
}

function writeIntoInput(el){
    let user = "";
    el.forEach(item =>{
        item.addEventListener("click", (e)=>{
            inputUser.value = e.target.textContent;
            usersDiv.innerHTML = "";
            user = inputUser.value;
            loadRepository(user);
        });
    });

}

function loadRepository(user){
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(res=>{
            return res.json();
        })
        .then(result =>{
            renderRepository(result);
        });
}

function renderRepository(repos){
    let reposArray = [];
    repos.forEach(item=>{
        let element = document.createElement("div");
        element.classList = "one-repos";
        element.innerHTML = item.name;
        reposDiv.append(element);
        reposArray.push(element);
    });
    writeIntoRepos(reposArray);
}

function writeIntoRepos(perosArray) {
    perosArray.forEach(oneRepos =>{
        oneRepos.addEventListener("click", (e)=>{
            inputRepos.value = e.target.textContent;
            reposDiv.innerHTML = "";
            getIssues(inputUser.value, inputRepos.value);
        });
    });
}

function debounce(f, ms) {
    let isCooldown = false;
    return function() {
        if (isCooldown) {
            return;
        }
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => isCooldown = false, ms);
    };
}

inputUser.addEventListener("input", (e)=>{
    usersDiv.innerHTML = "";
    inputRepos.value = "";
    setTimeout(()=> delayUser(e.target.value),1000);
});
const delayUser = debounce(getUsers, 1000);
