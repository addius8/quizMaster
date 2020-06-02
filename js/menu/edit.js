define('package/quizMaster/quizEdit', [
    'qui/classes/DOM',

], function (QuiDom) {
    "use strict";

    return new Class({
        Extends: QuiDom,
        Type: 'package/quizMaster/edit',

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
            this.startEdit();
        },

        associateButtons: function () {
            this.mainPanel = document.querySelector('.main-screen');
            this.editPage = this.mainPanel.querySelector('.edit-section');
            this.backBtn = this.editPage.querySelector('.back-btn');
            this.menuPage = this.mainPanel.querySelector('.menu-section');
        },

        populateButtons: function () {
            var self = this;
            this.backBtn.addEvent('click', function () {
                self.endEdit();
            }.bind(self));
            // this.startBtn.addEvent('click',);
        },

        startEdit: function () {
            var self = this;

            self.showElem(this.editPage);
        },

        endEdit: function () {
            this.hideElem(this.editPage);
            this.showElem(this.menuPage);
        },


    });
});