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
            'addAnswer',
            'onFinish',
            'getData',
            'getAnswerElems',
            'getQuestionText',
            'getQuestionElem',
            'getTextforAnswerElem',
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
            this.addAnswernBtn = this.editPage.querySelector('.answer-add-btn');
            this.finishBtn = this.editPage.querySelector('.finish-btn');
            this.questionContainer = this.editPage.querySelector('.answer-container');
            this.backBtn = this.editPage.querySelector('.back-btn');
            this.menuPage = this.mainPanel.querySelector('.menu-section');
        },

        populateButtons: function () {
            var self = this;
            this.backBtn.addEvent('click', function () {
                self.endEdit();
            }.bind(self));

            this.addAnswernBtn.addEvent('click', function () {
                self.addAnswer();
            }.bind(self));

            this.finishBtn.addEvent('click', function () {
                self.onFinish();
            }.bind(self));

            // this.startBtn.addEvent('click',);
        },

        addAnswer: function () {
            var x = this.getLengthOfAnswers();
            /** getting the existing anzahl of questions */
            // console.log(this.questionContainer.querySelectorAll('.form-answers-text').length);
            // console.log(this.questionContainer.innerHTML);
            this.questionContainer.innerHTML += '' +
                '<div class="answer-div">' +
                '<form class="form-answers-text">\n' +
                '                    <div class="d-f align-i-c justy-cont-c">\n' +
                '                        <input class="answer-input" type="text" placeholder="Text der Antwort {0}">\n'.format(x) +
                '                    </div>\n' +
                '                </form>' +
                '                    <input class="answer-checkbox" type="checkbox" id="answer{0}" name="answer"\n'.format(x) +
                '                           checked>\n' +
                '                    <label for="answer{0}">Die Antwort {0} ist Wahr</label></div>\n'.format(x)
        },

        getAnswerElems: function () {
            return this.questionContainer.querySelectorAll('.answer-div');
        },

        getLengthOfAnswers: function () {
            return this.getAnswerElems().length;
        },

        getQuestionElem: function () {
            return this.editPage.querySelector('.question-input');
        },

        getQuestionText: function () {
            return this.getQuestionElem().value;
        },

        getData: function () {
            var data = {};
            var answerList = [];
            var self = this;

            var question = this.getQuestionText();
            /** returns undefined */
            if (question === '') {
                alert('the Question is empty, pls fill in some text');

                return;
            }
            data['question'] = question;

            self.getAnswerElems().forEach(function (elem, index) {
                /** check if empty */
                    // console.dir(elem);
                    // console.log(elem);
                var answervalue = self.getTextforAnswerElem(elem);
                // console.log(answervalue);
                // console.log(answervalue['text'] === '');
                if (answervalue['text'] === '') {
                    alert('the Input of the Answer {0} is empty, pls fill in some text'.format(index));
                    return;
                }
                // console.log(answervalue);
                answerList.push(answervalue);
            });
            data['answers'] = answerList;

            return data;
        },

        getTextforAnswerElem: function (elem) {
            var answerText = elem.querySelector('.answer-input').value;
            var checkedIsTrue = elem.querySelector('.answer-checkbox').checked
            return {
                'text': answerText,
                'true': checkedIsTrue
            };
        },

        onFinish: function () {
            var self = this;

            var data = self.getData();
            if (data) {
                if (data['answers'].length !== 0) {
                    console.log('here for sending data');
                    console.log(data);
                    /** send Data */
                }

            }
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