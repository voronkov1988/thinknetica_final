"use strict";
exports.__esModule = true;
require("./style.css");
var statusDiv = document.querySelector(".status-div");
var resultDiv = document.querySelector(".result-div");
var modalPage = document.querySelector(".modal-page");
var form = document.querySelector("form.issues-form");
function getIssues(user, repository) {
    fetch("https://api.github.com/repos/" + user.nodeValue + "/" + repository.nodeValue + "/issues")
        .then(function (result) {
        if (result.status !== 200) {
            return Promise.reject(new Error(result.status));
        }
        return Promise.resolve(result);
    })
        .then(function (res) {
        statusDiv.innerHTML = "Готово...";
        setTimeout(function () {
            statusDiv.innerHTML = "";
        }, 3000);
        return res.json();
    })
        .then(function (response) {
        renderIssues(response);
    })["catch"](function (error) {
        statusDiv.innerHTML = "\u041E\u0448\u0438\u0431\u043A\u0430 " + error;
        console.log("Request failed", error);
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderIssues(issues) {
    issues.forEach(function (item) {
        var element = document.createElement("div");
        element.innerHTML = "\n        <div class=\"result-div\">\n            <div data-closed=\"" + item.closed_at + "\" class=\"issues\">\n                <div class=\"profile\">\n                    <img data-number=\"" + item.number + "\"\n                         data-created=\"" + item.created_at + "\"\n                         data-title=\"" + item.title + "\"\n                         data-description=\"" + item.body + "\"\n                         data-image=\"" + item.user.avatar_url + "\"\n                         data-link=\"" + item.user.html_url + "\"\n                         data-closed=\"" + item.closed_at + "\"\n                         data-updated=\"" + item.updated_at + "\"\n                     src=\"" + item.user.avatar_url + "\" alt=\"image\">\n                    <p><a href=\"" + item.user.html_url + "\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C</a></p>\n                </div>\n                <div class=\"info\">\n                    <div class=\"info-title\">\n                        <div class=\"title\">" + item.title + "</div>\n                        <div class=\"number\">\u043D\u043E\u043C\u0435\u0440 issue: " + item.number + "</div>\n                    </div>\n                    <div class=\"description\">" + item.body.slice(0, 100) + "</div>\n                    <div class=\"data-created\">" + item.created_at + "</div>\n                </div>\n            </div>\n        </div>\n    ";
        resultDiv.append(element);
    });
    takeModal();
}
function takeModal() {
    var imgDiv = document.querySelectorAll(".profile img");
    imgDiv.forEach(function (item) {
        item.addEventListener("click", function (e) {
            renderModal(e.target);
        });
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderModal(data) {
    modalPage.innerHTML = "";
    var element = document.createElement("div");
    element.classList.add("wrapper");
    element.innerHTML = "\n        <div class=\"modal-info\">\n            <div class=\"modal-contacts\">\n                <img src=\"" + data.getAttribute("data-image") + "\" alt=\"\">\n                <p><a href=\"" + data.dataset.link + "\">Issue link</a></p>\n            </div>\n            <div class=\"modal-title\">\n                <div class=\"modal-h2\">" + data.dataset.title + "</div>\n                <div class=\"modal-description\">" + data.dataset.description + "</div>\n            </div>\n        </div>\n        <button>\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n        <div class=\"modal-meta\">\n            <div class=\"modal-created\">\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: " + data.dataset.created + "</div>\n            <div class=\"modal-updated\">\u0414\u0430\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F: " + data.dataset.updated + "</div>\n            <div class=\"modal-number\">\u041D\u043E\u043C\u0435\u0440 issues: " + data.dataset.number + "</div>\n        </div>\n        \n    ";
    modalPage.append(element);
    modalPage.setAttribute("style", "display: block");
    var button = document.querySelector(".modal-page button");
    button.addEventListener("click", function () {
        modalPage.innerHTML = "";
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    //property value does not exist on type 'Element'
    if (e.target) {
        var inputUser_1 = document.querySelector("input#user");
        var inputRepos_1 = document.querySelector("input#repos");
        resultDiv.innerHTML = "";
        usersDiv.innerHTML = "";
        reposDiv.innerHTML = "";
        statusDiv.innerHTML = "Загрузка...";
        getIssues(inputUser_1, inputRepos_1);
    }
});
var inputUser = document.querySelector("input#user");
var inputRepos = document.querySelector("input#repos");
var reposDiv = document.querySelector(".repos");
var status = document.querySelector(".status-div");
var usersDiv = document.querySelector(".users");
function getUsers() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (value) {
        fetch("https://api.github.com/search/users?q=" + value)
            .then(function (response) {
            if (response.status !== 200) {
                return Promise.reject(new Error(response.status));
            }
            return Promise.resolve(response);
        })
            .then(function (res) {
            return res.json();
        })
            .then(function (result) {
            renderUsers(result.items);
        })["catch"](function (error) {
            status.innerHTML = "\u041E\u0448\u0438\u0431\u043A\u0430 " + error;
        });
    };
}
function renderUsers(users) {
    var arrayUsers = [];
    users.forEach(function (user) {
        var element = document.createElement("div");
        element.classList.add("one-user");
        element.innerHTML = user.login;
        usersDiv.append(element);
        arrayUsers.push(element);
    });
    writeIntoInput(arrayUsers);
}
function writeIntoInput(el) {
    var user = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    el.forEach(function (item) {
        item.addEventListener("click", function (e) {
            inputUser.innerHTML = e.target.textContent;
            usersDiv.innerHTML = "";
            user = inputUser.textContent;
            loadRepository(user);
        });
    });
}
function loadRepository(user) {
    fetch("https://api.github.com/users/" + user + "/repos")
        .then(function (res) {
        return res.json();
    })
        .then(function (result) {
        return renderRepository(result);
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderRepository(repos) {
    var reposArray = [];
    repos.forEach(function (item) {
        var element = document.createElement("div");
        element.classList.add("one-repos");
        element.innerHTML = item.name;
        reposDiv.append(element);
        reposArray.push(element);
    });
    writeIntoRepos(reposArray);
}
function writeIntoRepos(reposArray) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reposArray.forEach(function (oneRepos) {
        oneRepos.addEventListener("click", function (e) {
            inputRepos.innerHTML = e.target.textContent;
            reposDiv.innerHTML = "";
            getIssues(inputUser, inputRepos);
        });
    });
}
function debounce(f, ms) {
    var _this = this;
    var isCooldown = false;
    return function () {
        if (isCooldown) {
            return;
        }
        // eslint-disable-next-line prefer-rest-params,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        f.apply(_this, arguments);
        isCooldown = true;
        setTimeout(function () { return isCooldown = false; }, ms);
    };
}
inputUser.addEventListener("input", function (e) {
    if (e.target) {
        usersDiv.innerHTML = "";
        inputRepos.innerHTML = "";
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setTimeout(function () { return delayUser(e.target.value); }, 1000);
    }
});
var delayUser = debounce(getUsers, 1000);
