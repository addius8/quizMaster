define('package/quizMaster/stats', [
    'qui/classes/DOM',

], function (QuiDom) {
    "use strict";

    return new Class({
        Extends: QuiDom,
        Type: 'package/quizMaster/stats',

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

            console.log('initialized edit');
            this.associateButtons();
            this.populateButtons();
            this.startStats();
        },

        associateButtons: function () {
            this.mainPanel = document.querySelector('.main-screen');
            this.statsPage = this.mainPanel.querySelector('.stats-section');
            this.backBtn = this.statsPage.querySelector('.back-btn');
            this.menuPage = this.mainPanel.querySelector('.menu-section');
        },

        populateButtons: function () {
            var self = this;
            this.backBtn.addEvent('click', function () {
                self.endStats();
            }.bind(self));
            // this.startBtn.addEvent('click',);
        },

        startStats: function () {
            var self = this;

            self.showElem(this.statsPage);
        },

        endStats: function () {
            this.hideElem(this.statsPage);
            this.showElem(this.menuPage);
        },


    });
});