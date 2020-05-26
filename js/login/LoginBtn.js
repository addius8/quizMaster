define('package/quizMaster/login/btn', [
    'qui/classes/DOM'
], function (QuiDom) {
    "use strict";

    return new Class({
        Extends: QuiDom,
        Type: 'package/quizMaster/login/btn',

        Binds: [
            '$onOpen',
            'associateLoginBtn',
            'populateLoginBtn',
            'onClickBtnLogin',
            'getUserInput',
            'getPwInput',
            'closeLoginWindow',
            'handleLogin',
            'resetNotesBox',
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
            this.populateLoginBtn();
        },

        associateLoginBtn: function () {
            this.mainPanel = document.querySelector('.main-screen');
            this.loginBtn = this.mainPanel.querySelector('.login-btn');
            this.loginNotes = this.mainPanel.querySelector('p.login-notes');

            document.querySelector('.input-form').addEventListener('submit', function (Event) {
                Event.preventDefault();
            });
        },

        getUserInput: function () {
            if (!this.userInput) {
                this.userInput = this.mainPanel.querySelector('form input.user');
            }
            return this.userInput
        },

        getPwInput: function () {
            if (!this.secondInput) {
                this.secondInput = this.mainPanel.querySelector('form input.pw');
            }
            return this.secondInput
        },

        resetNotesBox: function () {
            this.loginNotes.textContent = '';
        },

        setNotesBoxText: function (text) {
            this.loginNotes.textContent = text;
        },

        handleLogin: function () {
            var self = this;
            this.resetNotesBox();
            var userName = this.getUserInput().value;
            /** clear Username from Cross-Site-Scripting & SQL and XSS injection */
            if (userName === '') {
                this.setNotesBoxText('UserName is empty');
                return;
            }

            /** get pw */
            var pw = this.getPwInput().value;
            if (pw.length < 4) {
                /** check Pw Length */
                this.setNotesBoxText('PassWord is to short');
                return;
            }
            /** go on Ajax */

            this.getHash().then(function (hash) {
                // console.log(hash);

                var pwHashed = generateMD5Hash(pw);
                // console.log('pw Hashed: ' + pwHashed);
                var unified = pwHashed + hash;
                // console.log('unified: {0}'.format(unified));
                var combined = generateMD5Hash(unified);
                // console.log('combined Hash: ' + combined);

                /** now send  */
                var sending = {
                    'key': hash,
                    'hash': combined,
                    'user': userName
                };
                self.login(sending).then(function (result) {
                    // console.log(result);
                    self.setNotesBoxText(result);
                    // self.fireEvent('onSubmit');
                    if (result == 'pass') {
                        self.closeLoginWindow();
                        self.fireEvent('loggedIn', [self]);
                    }

                    // console.log(self.inited);
                })
            })

            // var

        },

        closeLoginWindow: function () {
            this.mainPanel.querySelector('.login-form').setStyles({
                display: "none"
            });
        },

        login: function (sending) {
            return new Promise(function (resolve, reject) {
                request_v1({
                    'method': 'post',
                    'url': '{0}?{1}'.format('/secure_login', encodeQueryData({
                        'params': JSON.stringify(sending)
                    }).toString())
                }).then(function (result) {
                    resolve(result);
                    /** successCallback */
                }, function (result) {
                    /** failureCallback */
                });
            });
        },

        getHash: function () {
            return new Promise(function (resolve, reject) {
                request_v1({
                    'url': '{0}?{1}'.format('/requestHash', encodeQueryData({
                        'params': JSON.stringify({
                            'hashLength': 10
                        })
                    }).toString())
                }).then(function (result) {
                    resolve(result);
                    /** successCallback */
                }, function (result) {
                    /** failureCallback */
                });
            });
        },

        populateLoginBtn: function () {
            var self = this;
            this.associateLoginBtn();
            this.loginBtn.addEvent("click", function () {
                self.onClickBtnLogin();
            }.bind(self));

        },

        onClickBtnLogin: function () {
            console.log('login initiated');
            this.handleLogin();
        },


    });
});
