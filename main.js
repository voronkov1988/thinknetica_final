'use strict';
let status = document.querySelector('.status');
let resultDiv = document.querySelector('.result-div');

function getIssues() {
    let downloading = true;
    return function(url){
        console.log(url);
        fetch(url)
            .then(result =>{
                if(result.status !== 200)
                    return Promise.reject(new Error(result.status));
                return Promise.resolve(result);
            })
            .then(res =>{
                return res.json();
            })
            .then(response => {
                downloading = false;
                renderData(response);
                createPage();
                if(downloading === false){
                    status.innerHTML = 'готово';
                }
                setTimeout(()=>{
                    status.innerHTML = '';
                },3000);

                return response;
            })
            .catch(function(error) {
                status.innerHTML = `Ошибка ${error}`;
                console.log('Request failed', error)
            });
    };
}

function getRepositoryUsers(link, inputValue){
    let repos = document.querySelector('.repos');

    fetch(link)
        .then(response =>{
            if(response.status !== 200)
                return Promise.reject(new Error(response.status));
            return Promise.resolve(response);
        })
        .then(res => {
            return res.json()
        })
        .then(result => {
            result.forEach(item =>{
                let element = document.createElement('span');
                element.classList = 'helpers';
                element.textContent = item.name;
                repos.append(element);
                element.addEventListener('click', ()=>{
                    let inputText = document.querySelector('input.text');
                    inputText.value = `${inputValue}${element.textContent}`;
                    element.remove();
                    downloading(`https://api.github.com/repos/${inputValue}${element.textContent}/issues`)
                })
            });

            return result;
        })

        .catch(function(error) {
            status.innerHTML = `Ошибка ${error}`;
            console.log('Request failed', error)
        });
}

function dataValidation() {
    let textInput = document.querySelector('input.text');
    textInput.addEventListener('input', () =>{
        let result = textInput.value.split('/');
        if(result.length !== 2){
            status.innerHTML = 'Введите правильно запрос';
            throw new Error('Введите правильный запрос');
        }else{
            status.innerHTML = 'Можно начать поиск';
            getRepositoryUsers(`https://api.github.com/users/${textInput.value}repos`, textInput.value)
        }
    });
}
dataValidation();

function createPage(){
    let images = document.querySelectorAll('.user img');
    const modalPage = document.querySelector('.modal-page');
    images.forEach(img => {
        img.addEventListener('click', ()=>{
           let element = document.createElement('div');
           element.innerHTML = `
           <div class="user-info">
               <img style="min-width: 300px" src="${img.dataset.foto}" alt="">
                <div class="title-user">
                    <span>${img.dataset.title}</span>
                    <p>${img.dataset.description}</p>
                </div>
            </div>
            <div class="user-meta-info">
                <div class="user-login">${img.dataset.user}</div>
                <div class="user-url">${img.dataset.url}</div>
                <div class="user-created">${img.dataset.created}</div>
                <div class="user-repository">${img.dataset.repository}</div>
            </div>
            <button>Закрыть</button>
           `;
           modalPage.append(element);
           modalPage.style.display = 'block';
            const buttons = document.querySelectorAll('.modal-page button');
            buttons.forEach(but => {
                but.addEventListener('click', ()=>{
                    element.remove();
                })
            })
        });
    });
}
function renderData (response){
    response.forEach(item => {
        const res = document.createElement('div');
        res.classList.add('.res');
        res.style.width = '80%';
        res.style.marginTop = '2px';
        res.style.border = '1px solid black';
        res.innerHTML = `
                        <div class="block">
                            <div class="user">
                                <img data-url="${item.url}"
                                 data-title="${item.title}"
                                 data-description="${item.body}"
                                 data-created="${item.created_at}"
                                 data-foto="${item.user.avatar_url}"
                                 data-repository="${item.repository_url}"
                                 data-user="${item.user.login}"
                                 src="${item.user.avatar_url}" alt="${item.url}">
                                <br>
                                <a href="${item.user.html_url}">Профиль</a>
                            </div>
                            <div class="info">
                                <div class="meta">
                                    <div class="title">${item.title}</div>
                                    <div class="num">#${item.number}</div>
                                </div>
                                <div class="num-date">
                                    <div class="description">${item.body.slice(0,100)}...</div>
                                    <div class="date">${item.created_at}</div>
                                </div>
                            </div>
                        </div>
                    `;
        resultDiv.append(res);
    });
}

function getUrl() {
    const form = document.querySelector('form.search'),
        resultLink = document.querySelector('.result-link');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let textInput = document.querySelector('input.text').value;
        resultDiv.innerHTML = '';
        resultLink.textContent = `https://api.github.com/repos/${textInput}/issues`;
        status.innerHTML = 'загружается...';
        downloading(resultLink.textContent);
    })
}

let downloading = getIssues();
getUrl();



