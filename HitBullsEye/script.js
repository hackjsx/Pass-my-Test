(function () {
    function loadScripts(src, callback) {
        const script = document.createElement('script');
        script.setAttribute('Pass-test', '');
        script.onload = callback;
        script.src = src;
        document.head.appendChild(script);
    }
    function getId() {
        if (!getId.list) getId.list = [];
        const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let passed = false, str = '';
        while (!passed) {
            str = 'pass-test-id-';
            for (let i = 0; i < 5; i++) str += ch.charAt(Math.floor(Math.random() * ch.length));
            if (!getId.list.includes(str)) {
                getId.list.push(str);
                passed = true;
            }
        }
        return str;
    }
    function main() {
        let $ = window.Js;
        const getInput = function (opts = {}, area) {
            const id = getId();
            const group = $.ce('pass-test-form').appendTo(area);
            $.ce(
                'label.pass-test-form-label',
                $.ce('pass-test-form-text').html(opts.label),
                $.ce('pass-test-form-info').html(opts.info),
            ).attr({
                for: id,
            }).appendTo(group);
            const input = $.ce('input.pass-test-form-input').attr({
                placeholder: opts.placeholder,
                id: id,
            }).appendTo(group);
            if (opts.onInput) input.bind("input", opts.onInput);
            const error = $.ce('pass-test-form-error').appendTo(group);
            return {
                get: () => input.val(),
                set: (val) => input.val(val),
                throw: (err) => error.html(err),
                reset: () => error.empty(),
                contained: () => input.contained(),
                focus: () => input.focus(),
            };
        }
        $.styleSheet(`
            pass-test-main {
                z-index: 10100104545345;
                position: fixed;
                right: 20px;
                bottom: 20px;
                width: calc(100vw - 40px);
                max-height: 300px;
                max-width: 300px;
                box-shadow: 4px 4px 8px 4px #0004;
                border-radius: 8px;
                border: 1px solid #0004;
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                overflow: hidden;
                background: #fff;
            }
            pass-test-main * {
                box-sizing: border-box;
                display: block;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            pass-test-main.shown {
                height: calc(100vh - 40px);
            }
            pass-test-head {
                width: 100%;
                border-radius: 8px;
                padding: 10px;
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                position: relative;
                border-bottom: 1px solid transparent;
            }
            pass-test-head-text {
                font-weight: 700;
                font-size: 18px;
                margin-right: auto;
            }
            pass-test-toggler {
                display: inline-flex;
                justify-content: center;
                cursor: pointer;
                width: 30px;
                height: 30px;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                z-index: 1;
            }
            pass-test-main.shown pass-test-toggler {
                rotate: 180deg;
            }
            pass-test-toggler:hover {
                background-color: #0004;
            }
            pass-test-body {
                height: 100%;
                width: 100%;
                flex: 1;
                overflow: auto scroll;
            }
            pass-test-main:not(.shown) pass-test-body {
                display: none;
            }
            pass-test-main.shown pass-test-head {
                border-radius: 8px 8px 0 0;
                border-color: #0004;
            }
            pass-test-form {
                padding: 10px;
                display: flex;
                flex-direction: column;
                width: 100%;
                border-bottom: 1px solid #0002;
            }
            .pass-test-form-label {
                margin-bottom: 10px;
            }
            pass-test-form-text {
                font-weight: 600;
            }
            pass-test-form-info {
                font-weight: 600;
                font-size: 13px;
            }
            input, button {
                font-size: inherit;
                font-weight: inherit;
                border-radius: 4px;
                padding: 10px;
                outline: none;
            }
            .pass-test-form-input {
                border: none;
                box-shadow: 0 0 0 1px #0004;
            }
            .pass-test-form-input:focus {
                box-shadow: 0 0 0 3px #2bc48a;
            }
            pass-test-null {
                font-size: 12px;
                padding: 5px;
            }
            pass-test-null > span {
                display: inline-block;
            }
            pass-test-center {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 10px;
                text-align: center;
            }
            pass-test-button.scs {
                --button-border: #2bc48a;
                --button-color: #2bc48a;
                --button-bg: #2bc48a22;
                --button-hover-border: #2bc48a;
                --button-hover-color: #fff;
                --button-hover-bg: #2bc48a;
            }
            pass-test-button.err {
                --button-border: #ea4335;
                --button-color: #ea4335;
                --button-bg: #ea433522;
                --button-hover-border: #ea4335;
                --button-hover-color: #fff;
                --button-hover-bg: #ea4335;
            }
            pass-test-button {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                padding: 5px 20px;
                user-select: none;
                border-radius: 4px;
                background: var(--button-bg);
                color: var(--button-color);
                border: 1px solid var(--button-border);
                cursor: pointer;
                font-size: 14px;
            }
            pass-test-button:not(:first-child) {
                margin-left: 5px;
            }
            pass-test-button.hidden {
                display: none;
            }
            pass-test-button:hover {
                background: var(--button-hover-bg);
                color: var(--button-hover-color);
                border-color: var(--button-hover-border);
            }
            pass-test-solver {
                border-bottom: 1px solid  #0002;
            }
            pass-test-bar {
                position: relative;
                width: 100%;
                padding: 10px;
                border-bottom: 1px solid  #0002;
                font-size: 14px;
                font-weight: 600;
            }
            pass-test-progress,
            pass-test-bar-progress {
                position: absolute;
                height: 100%;
                inset: 0 auto 0 0;
                background: #2bc48a33;
                transition: all .4s ease;
                z-index: -1;
            }
        `, "head", '[pass-test]');

        const e = {};

        e.main = $.ce('pass-test-main').appendTo(document.body);
        e.prog = $.ce('pass-test-progress');
        e.head = $.ce('pass-test-head', e.prog, $.ce('pass-test-head-text', 'Pass my test')).appendTo(e.main);
        e.togl = $.ce('pass-test-toggler', '▲').attr('title', 'Show/hide').click(function () {
            e.main.toggleClass('shown');
            if (e.main.hasClass('shown') && e.form.string.contained()) {
            	e.form.string.focus();
            }
        }).appendTo(e.head);
        e.body = $.ce('pass-test-body').appendTo(e.main);
        e.qust = $.ce('pass-test-questions').appendTo(e.body);
        e.solv = $.ce('pass-test-solver').appendTo(e.body);
        e.form = {};
        e.form.string = getInput({
            label: 'Solution string',
            info: 'Without spaces.',
            onInput: function () {
                const v = this.value, s = e.form.string, r = $.ce('pass-test-null');
                if (v === '') return s.reset();
                v.toUpperCase().split('').forEach((e, i) => {
                    $.ce('span').html(`${i + 1}: ${e}${(i + 1) !== v.length ? ',&nbsp;' : ''}`).appendTo(r);
                    if ((i + 1) % 5 === 0) r.append('<br />');
                });
                s.throw(r);
            }
        }, e.qust);
        e.form.submit = $.ce('pass-test-button.scs', "Start").appendTo($.ce('pass-test-center', $.ce('pass-test-null', 'No verification of inputs are done. Proceed with caution.')).appendTo(e.qust)).click(() => submit());
        $.ce('pass-test-center', $.ce('pass-test-null', 'Per question time is automatically calculated as per remaining time and number of questions.')).appendTo(e.qust);
        function submit() {
            e.qust.hide();
            const len = e.form.string.get().toUpperCase().split('');
            if (!len.length) return $.ce('pass-test-center', `No input string passed.`).appendTo(e.solv);
            $.ce('pass-test-center', `Solving ${len.length} qustions starting from current page.<br>You can move away from this window.<small>Please don't navigate in the window or click any options to cause any error.</small>`).appendTo(e.solv);
            $.ce('pass-test-center', $.ce('pass-test-null', 'Per question time is automatically calculated as per remaining time and number of questions.')).appendTo(e.solv);
            start(len);
        };
        function finalSubmit() {
            const finaltimer = setTimeout(() => {
                $('input.button.rightSideButton#activator').click();
                setTimeout(() => {
                    $("input.closed").eq(0).bind("change", function () {
                        $("input#close_confirmed").click();
                    }).click();
                }, 1000);
            }, 6000);
            e.form.stopper = $.ce('pass-test-button.scs', "Stop submission").appendTo($.ce('pass-test-center', $.ce('pass-test-null', 'All questions has been answered. Submitting test in 6 seconds.')).prependTo(e.solv)).click(() => {
                clearTimeout(finaltimer);
                e.form.stopper.remove();
                e.solv.prepend($.ce('pass-test-center', $.ce('pass-test-null', 'Submission stopped.')));
            });
        };
        function start(string) {
            let display = null;
            let current = 0;
            let fraction = 2;
            let limit = 30;
            let index = 0;
            let time = 0;
            const generate = () => {
                let maxtime = +(((+Js('input#remain_sec').val()) * fraction / 5) / (string.length - index)).toFixed(0);
                if (maxtime > limit) maxtime = limit;
                let mintime = +(maxtime / 2).toFixed(0);
                return +(Math.random() * ((maxtime) - mintime) + mintime).toFixed(0);
            }
            const createDisplay = (ind, curr) => {
                const prg = $.ce('pass-test-bar-progress');
                const dtl = $.ce('pass-test-bar-detail', `Que. ${ind + 1}&nbsp;&nbsp;&nbsp;&nbsp;Ans. ${string[ind]}&nbsp;&nbsp;&nbsp;&nbsp;Time. ${curr}s`);
                const bar = $.ce('pass-test-bar', prg, dtl);
                const lin = $().add(prg).add(e.prog);
                e.solv.prepend(bar);
                return {
                    set: (wdt) => lin.width(wdt + '%')
                };
            };
            function mapp() {
                if (!display) current = generate(), display = createDisplay(index, current);
                display.set(((time / current) * 100));
                if ((current - time) < time) $('input.button.actionBn.clearresp').click();
                if (time >= current) {
                    $(`input#${string[index]}_${index + 1}`).bind("change", function () {
                        $('a.button.savenext').click();
                        if (index >= (string.length - 1)) finalSubmit(); else setTimeout(mapp, 1000);
                    }).click();
                    display = null;
                    time = 0;
                    index++;
                } else {
                    time++;
                    setTimeout(mapp, 1000);
                }
            }
            mapp();
        };
    }
    loadScripts('https://cdn.jsdelivr.net/gh/shivamdevs/jscript@3.0.0/jscript.js', main);
}());