define('package/quizMaster/quizmaster', [
    'qui/classes/DOM',
    'package/quizMaster/login'
], function (QuiDom, Login) {
    "use strict";

    return new Class({
        Extends: QuiDom,
        Type: 'package/quizMaster/login',

        Binds: [
            '$onOpen',
            'associatePages',
            'openQuizMenu',
            'letUserLogin',
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
            this.associatePages();
            this.letUserLogin();
        },

        associatePages: function () {
            this.mainPanel = document.querySelector('.main-screen');
            this.loginPage = this.mainPanel.querySelector('.login-form');
            this.menuPage = this.mainPanel.querySelector('.menu-section');
        },

        letUserLogin: function () {
            var self = this;
            new Login({
                events: {
                    onSubmit: function () {
                        console.log('from Login finish');
                        self.openQuizMenu();
                        // self.fireEvent('submit');
                    },
                }
            });
        },

        openQuizMenu: function () {
            this.menuPage.setStyles({
                display: 'block'
            });
        }

    });
});