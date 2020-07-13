const statusDiv = document.querySelector('.status-div'),
    resultDiv = document.querySelector('.result-div'),
    modalPage = document.querySelector('.modal-page'),
    form = document.querySelector('form.issues-form');

function getIssues(user, repository){
    fetch(`https://api.github.com/repos/${user}/${repository}/issues`)
        .then(result =>{
            if(result.status !== 200)
                return Promise.reject(new Error(result.status));
            return Promise.resolve(result);
        })
        .then(res =>{
            statusDiv.innerHTML = 'Готово...';
            setTimeout(()=>{
                statusDiv.innerHTML = '';
            }, 3000);

            return res.json();
        })
        .then(response =>{
            renderIssues(response)
        })
        .catch(function(error) {
            statusDiv.innerHTML = `Ошибка ${error}`;
            console.log('Request failed', error)
        });
}

function renderIssues(issues){
    issues.forEach(item =>{
        let element = document.createElement('div');
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
        resultDiv.append(element)
    });
    takeModal()
}

function takeModal(){
    let imgDiv = document.querySelectorAll('.profile img');
    imgDiv.forEach(item=>{
        item.addEventListener('click', (e)=>{
            renderModal(e.target)
        })
    })
}

function renderModal(data){
    console.log(data);
    modalPage.innerHTML = '';
    let element = document.createElement('div');
    element.classList = 'wrapper';
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
    modalPage.style.display = 'block'
    const button = document.querySelector('.modal-page button');
    button.addEventListener('click',()=>{
        modalPage.innerHTML = ''
    })
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputUser = document.querySelector('input#user').value,
        inputRepos = document.querySelector('input#repos').value;
    resultDiv.innerHTML = '';
    usersDiv.innerHTML = '';
    reposDiv.innerHTML = '';
    statusDiv.innerHTML = 'Загрузка...';
    getIssues(inputUser, inputRepos);
    console.log(inputRepos, inputUser)
});
