require(['package/quizMaster/login'], function (QuizLogin) {
    new QuizLogin({
        events: {
            onSubmit: function () {
                var argsStr = arguments[1]['msg'];
                if (argsStr === 'leaveWithoutExit') {
                    self.$closeWindow();
                }
            },
            // onOpen: function () {
            //     console.log('Hello outer');
            // }
        }
    });
});
