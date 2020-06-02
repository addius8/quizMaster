define('package/quizMaster/menu', [
    'qui/classes/DOM',
    'package/quizMaster/quiz',
    'package/quizMaster/quizEdit',
    'package/quizMaster/stats'

], function (QuiDom, Quiz, QuizEdit, QuizStats) {
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
            this.associateButtons();
            this.populateButtons();

            this.openQuizMenu();
        },

        associateButtons: function () {
            this.mainPanel = document.querySelector('.main-screen');
            this.startBtn = this.mainPanel.querySelector('.start-quiz-btn');
            this.editBtn = this.mainPanel.querySelector('.edit-questions-btn');
            this.statistikBtn = this.mainPanel.querySelector('.statistik-btn');
            this.logoutBtn = this.mainPanel.querySelector('.logout-btn');
            this.menuPage = this.mainPanel.querySelector('.menu-section');
        },

        populateButtons: function () {
            var self = this;

            this.startBtn.addEvent('click', function () {
                self.startQuiz();
            }.bind(self));

            this.editBtn.addEvent('click', function () {
                self.startEdit();
            }.bind(self));

            this.statistikBtn.addEvent('click', function () {
                self.startStats();
            }.bind(self));


            // this.loginBtn.addEvent("click", function () {
            //     self.onClickBtnLogin();
            // }.bind(self));
        },

        startQuiz: function () {
            var self = this;
            self.hideQuizMenu();

            new Quiz({
                events: {
                    onSubmit: function () {
                        console.log('from Quiz finish');
                        // self.openQuizMenu();
                        // self.fireEvent('submit');
                    },
                }
            });
        },


        startEdit: function () {
            var self = this;
            self.hideQuizMenu();

            new QuizEdit({
                events: {
                    onSubmit: function () {
                        console.log('from Edit finish');
                        // self.openQuizMenu();
                        // self.fireEvent('submit');
                    },
                }
            });
        },

        startStats: function () {
            var self = this;
            self.hideQuizMenu();

            new QuizStats({
                events: {
                    onSubmit: function () {
                        console.log('from Stats finish');
                        // self.openQuizMenu();
                        // self.fireEvent('submit');
                    },
                }
            });
        },

        hideQuizMenu: function () {
            this.hideElem(this.menuPage);
        },

        openQuizMenu: function () {
            this.showElem(this.menuPage);
        },

    });
});