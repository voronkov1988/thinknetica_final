const statusDiv = document.querySelector('.status-div'),
    resultDiv = document.querySelector('.result-div'),
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
}

function renderIssues(issues){
    issues.forEach(item =>{
        templateIssues(item.number, item.created_at, item.title, item.body, item.user.avatar_url, item.user.url)
    })
}

function templateIssues(number, dateCreated, title, description, image, link){
    link = link.replace('api.', '').replace('/users', '');
    let element = document.createElement('div');
    element.innerHTML = `
        <div class="result-div">
            <div class="issues">
                <div class="profile">
                    <img src="${image}" alt="${title}">
                    <p><a href="${link}">Профиль</a></p>
                </div>
                <div class="info">
                    <div class="info-title">
                        <div class="title">${title}</div>
                        <div class="number">номер issue: ${number}</div>
                    </div>
                    <div class="description">${description.slice(0, 100)}</div>
                    <div class="data-created">${dateCreated}</div>
                </div>
            </div>
        </div>
    `;
    resultDiv.append(element);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputUser = document.querySelector('input#user').value,
        inputRepos = document.querySelector('input#repos').value;
    resultDiv.innerHTML = '';
    statusDiv.innerHTML = 'Загрузка...';
    getIssues(inputUser, inputRepos);
    console.log(inputRepos, inputUser)
});
