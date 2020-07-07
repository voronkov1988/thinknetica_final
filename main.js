'use strict';
let status = document.querySelector('.status');
function getIssues() {
    let resultDiv = document.querySelector('.result-div');
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
                response.forEach(item => {
                    const res = document.createElement('div');
                    res.classList.add('.res');
                    res.style.width = '38%';
                    res.style.marginTop = '10px';
                    res.style.border = '1px solid black';
                    res.innerHTML = `
                       <div class="meta">
                           <div class="title">${item.title}</div>
                           <div class="description">${item.body.slice(0,50)}</div>
                       </div>
                       <div class="num-date">
                       <div class="num">${item.number}</div>
                       <div class="date">${item.created_at}</div>
                       </div>
                    `;
                    resultDiv.append(res);
                    console.log(item)
                });
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

function dataValidation(inputValue) {
    let result = inputValue.split('/');
    if(result.length !== 2){
        throw new Error('Введите правильный запрос')
    }
    console.log(result);
}

function getUrl() {
    const submit = document.querySelector('input.submit'),
        resultLink = document.querySelector('.result-link');

    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        let textInput = document.querySelector('input.text').value;
        dataValidation(textInput);
        resultLink.textContent = `https://api.github.com/repos/${textInput}/issues`;
        status.innerHTML = 'загружается...';
        downloading(resultLink.textContent);
    })
}
let downloading = getIssues();
getUrl();

