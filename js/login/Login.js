define('package/quizMaster/login', [
    'qui/classes/DOM',
    'package/quizMaster/login/btn'
], function (QuiDom, LoginBtn) {
    "use strict";

    return new Class({
        Extends: QuiDom,
        Type: 'package/quizMaster/login',

        Binds: [
            '$onOpen',
            'initLoginBtn',
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
            this.initLoginBtn();
        },

        initLoginBtn: function () {
            var self = this;
            new LoginBtn({
                events: {
                    loggedIn: function () {
                        console.log('loggedIn from LoginBtn');
                        self.fireEvent('submit');
                    },
                }
            });
        },

    });
});