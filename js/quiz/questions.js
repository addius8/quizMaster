define('package/quizMaster/quiz', [
    'qui/classes/DOM',

], function (QuiDom) {
    "use strict";

    return new Class({
        Extends: QuiDom,
        Type: 'package/quizMaster/login',

        Binds: [
            '$onOpen',
            'associatePages',
            'openQuizMenu',
            'associateButtons',
            'populateButtons',
            'startQuiz',
        ],

        options: {},

        /**
         * The init Function from the Class
         * # Constructor like
         * @param options
         */
        initialize: function (options) {
            this.parent(options);

            this.addEvents({
                onOpen: this.$onOpen,
            });
            this.fireEvent("onOpen");
        },

        $onOpen: function () {
            var self = this;

            console.log('initialized questions');
            this.associateButtons();
            this.populateButtons();
            this.startQuiz();
        },

        associateButtons: function () {
            this.mainPanel = document.querySelector('.main-screen');
            this.quizPage = this.mainPanel.querySelector('.quiz-section');
            this.backBtn = this.quizPage.querySelector('.back-btn');
            this.menuPage = this.mainPanel.querySelector('.menu-section');
        },

        populateButtons: function () {
            var self = this;
            this.backBtn.addEvent('click', function () {
                self.endQuiz();
            }.bind(self));
            // this.startBtn.addEvent('click',);
        },

        startQuiz: function () {
            var self = this;

            self.showElem(this.quizPage);
        },

        endQuiz: function () {
            this.hideElem(this.quizPage);
            this.showElem(this.menuPage);
        },


    });
});