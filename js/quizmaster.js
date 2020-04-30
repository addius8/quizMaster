var loginBtn;

function poopulateBtnLogin() {
    loginBtn.addEventListener("click", onClickBtnLogin);

    document.querySelector('.calculation-form').addEventListener('submit', function (Event) {
        Event.preventDefault();
    });
}

function onClickBtnLogin() {
    console.log('login initiated');
}

poopulateBtnLogin();