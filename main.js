'use strict';
let status = document.querySelector('.status');
let resultDiv = document.querySelector('.result-div');
function getIssues() {
    let downloading = true;
    return function(url){
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
                if(downloading === false)
                    status.innerHTML = 'готово';
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

function dataValidation() {
    let textInput = document.querySelector('input.text');
    textInput.addEventListener('input', () =>{
        let result = textInput.value.split('/');
        if(result.length !== 2){
            status.innerHTML = 'Введите правильно запрос';
            throw new Error('Введите правильный запрос');
        }else{
            status.innerHTML = 'Можно начать поиск'
        }
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
                       <div class="meta">
                           <div class="title">${item.title}</div>
                           <div class="num">#${item.number}</div>
                       </div>
                       <div class="num-date">
                       <div class="description">${item.body.slice(0,100)}</div>
                       <div class="date">${item.created_at}</div>
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
        console.log(e);
        let textInput = document.querySelector('input.text').value;
        resultDiv.innerHTML = '';
        dataValidation();
        resultLink.textContent = `https://api.github.com/repos/${textInput}/issues`;
        status.innerHTML = 'загружается...';
        downloading(resultLink.textContent);
    })
}
let downloading = getIssues();
getUrl();

