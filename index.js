document.addEventListener('DOMContentLoaded', function () {

    checkInt.init({
        firstInt: 7,
        secondInt: 4,
        sum: 11,
        mark: '+'

    });


});

var checkInt = {

    init: function (params) {
        this.params = params;
        this.params.equally = '=';
        this.params.res = '?';
        this.currentNum = 0;
        this.arcContainer = document.querySelector('.arc-conteiner');

        var firstInt = this.params.firstInt;

        this.createCondition();
        this.drawArc(0, firstInt);
        this._bindEvents();
    },

    _bindEvents: function () {
        this.arcContainer.addEventListener('input', this._onInput.bind(this));
    },

    _onInput: function (e) {
        var input = e.target;

        input.value = input.value
            .replace(/([^\d]| )+/g, '');

        this.check(e.target);
    },

    check: function (target) {
        var value = target.value;
        var arr = ['firstInt', 'secondInt', 'sum'];
        var condition = document.querySelectorAll('.condition-block > span')[this.currentNum * 2];
        var color = '';
        var answer = this.params[arr[this.currentNum]];

        value = Number(value);

        if (value === answer) {
            this.hideInput(target, value);
            this.currentNum++;

            if (this.currentNum < 2) {
                this.drawArc(this.params.firstInt, this.params.secondInt);
            } else if (this.currentNum === 2) {
                this.createSumInput();
            }
        } else {
            target.style.color = "red";
            color = 'red';
        }

        if (condition) {
            condition.style.backgroundColor = color;
        }
    },

    getCurrentArc: function () {
        return this.arcContainer.querySelectorAll('.arc-block')[this.currentNum];
    },

    createCondition: function () {
        var fragment = document.createDocumentFragment();
        var conteiner = document.querySelector('.condition-block');

        ['firstInt', 'mark', 'secondInt', 'equally', 'res'].forEach(function (v) {
            this[v] = document.createElement('span');
            this[v].innerHTML = this.params[v];
            fragment.appendChild(this[v]);
        }.bind(this));

        conteiner.appendChild(fragment);
    },

    createInput: function () {
        var input = document.createElement('input');
        input.className = 'input-field';
        this.getCurrentArc().appendChild(input);
    },

    createSumInput: function () {
        var conditionConteiner = document.querySelector('.condition-block');
        var input = document.querySelectorAll('.condition-block > span');
        input = input[input.length - 1];
        var sumInput = document.createElement('input');
        sumInput.className = 'sum-input-field';
        conditionConteiner.replaceChild(sumInput, input);

        sumInput.addEventListener('input', this._onInput.bind(this));
    },

    hideInput: function (target, value) {
        var spanInt = document.createElement('span');
        spanInt.innerHTML = value;
        target.parentNode.replaceChild(spanInt, target);
    },

    drawArc: function (from, width) {
        var to = from + width;
        var cell = 39;
        var result = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var arcBlock = document.createElement('div');
        var px = {
            from: from * cell,
            to: to * cell,
            width: width * cell
        };
        px.height = Math.round(px.width / 3);

        result.setAttribute('width', px.width + 2);
        result.setAttribute('height', px.height);
        result.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        result.appendChild(this.getArcPath(px.width, px.height));


        arcBlock.className = 'arc-block';
        arcBlock.style.left = px.from + 'px';

        arcBlock.appendChild(result);

        this.arcContainer.appendChild(arcBlock);
        this.createInput();
    },

    getArcPath: function (width, height) {
        var fragment = document.createDocumentFragment();
        var rising = 50;
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        var line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        path.setAttribute('d', 'M0,' + height + 'C' + rising + ',10 ' + (width - rising) + ' ,10,' + width + ',' + height);

        line1.setAttribute('x1', width);
        line1.setAttribute('x2', width - 5);
        line1.setAttribute('y1', height);
        line1.setAttribute('y2', height - 10);

        line2.setAttribute('x1', width);
        line2.setAttribute('x2', width - 8);
        line2.setAttribute('y1', height);
        line2.setAttribute('y2', height - 5);

        [path, line1, line2].forEach(function (v) {
            v.setAttribute('fill', 'none');
            v.setAttribute('stroke', 'red');
            v.setAttribute('stroke-width', '1');
        });

        fragment.appendChild(path);
        fragment.appendChild(line1);
        fragment.appendChild(line2);

        return fragment;
    }
};

