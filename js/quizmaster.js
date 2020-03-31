var loginBtn;

function poopulateBtnLogin() {
    loginBtn.addEventListener("click", onClickCalcBtn);

    document.querySelector('.calculation-form').addEventListener('submit', function (Event) {
        Event.preventDefault();
    });
}

poopulateBtnLogin();