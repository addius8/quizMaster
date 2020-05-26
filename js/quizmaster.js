require(['package/quizMaster/quizmaster'], function (QuizMaster) {
    new QuizMaster({
        events: {
            onSubmit: function () {
                console.log('submitted from QuizMaster');

            },
        }
    });
});
