(function () {
    function loadScripts(src, callback) {
        const script = document.createElement('script');
        script.setAttribute('Pass-test', '');
        script.onload = callback;
        script.src = src;
        document.head.appendChild(script);
    }
    function getTime(min, max) {
        return +(Math.random() * ((max) - min) + min).toFixed(0);
    }
    function main() {
        let $ = window.Js;
        let pointer = 0;
        function waiter(text, limit, callback) {
            function si() {
                log(`${text} ${limit}s`);
                if (limit <= 0) {
                    return callback();
                }
                limit--;
                setTimeout(si, 1000);
            }
            si();
        }
        function mapData(map) {
            log('Parsing Data');
            let data = null;
            try {
                data = JSON.parse(map);
                log('Data Parsed');
            } catch (e) {
                log('Parsing failed');
                log('Exited Solver');
                return;
            }
            log('Starting solver');
            start(data);
        }
        function start(data) {
            let failed = 0;
            function solver() {
                function worker() {
                    const question = document.querySelector("div.question-item").innerText.toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '');
                    console.log('Question', ':', question);
                    const labels = document.querySelectorAll("span.answer-text");
                    const inputs = document.querySelectorAll("input");
                    let answer = -1;
                    function verifier() {
                        let nextr = document.querySelector(".save-next-btn-remove a.btn.btn-primary");
                        if (nextr) {
                            nextr.click();
                            log('Going to next question');
                            solver();
                        } else {
                            log('No next question found');
                            log('Submitting');
                            document.querySelector("div.finish-btn a").click();
                            log('Submitted. Restarting');
                            setTimeout(function () {
                                elm.remove();
                                main();
                                setTimeout(window.beep, 10);
                                setTimeout(window.beep, 100);
                                setTimeout(window.beep, 200);
                                setTimeout(window.beep, 300);
                            }, 4000);
                        }
                    }
                    function noAnswer(err) {
                        log(err + '. Continuing after submission');
                        window.beep();
                        $(document.querySelector(".save-next-btn-remove a.btn.btn-primary")).click(function () {
                            waiter('Verifying question', getTime(4, 6), verifier);
                        });
                    }
                    log('Solving question');
                    log('Finding question in list');
                    if (data.que.includes(question) && data.que.indexOf(question) > -1) {
                        log('Question found');
                        log('Looking for answer');
                        let query = data.ans[data.que.indexOf(question)];
                        console.log('Answer to find', ':', query);
                        let founds = 0;
                        for (var xy = 0; xy < 4; xy++) {
                            let matcher = labels[xy].innerText.toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '');
                            if (query === matcher || query.includes(matcher)) {
                                console.log('Matching', ':', matcher, ':', true);
                                answer = xy;
                                founds++;
                            } else {
                                console.log('Matching', ':', matcher, ':', false);
                            }
                        }
                        if (answer != -1 && founds === 1) {
                            log('Answer found at ' + answer);
                        } else if (founds > 1) {
                            return noAnswer('Multiple answers found. Look for ' + query);
                        } else {
                            return noAnswer('Answer not found. Look for ' + query);
                        }
                    } else {
                        return noAnswer('Question not found');
                    }
                    log('Answering');
                    inputs[answer].click();
                    log('Answered');
                    log('Submitting');
                    document.querySelector(".save-next-btn-remove  a.btn.btn-primary").click();
                    waiter('Verifying question', getTime(4, 6), verifier);
                }
                waiter('Solving question in', getTime(10, 20), worker);
            }
            solver();
        }
        function log(data) {
            const ij = 100;
            function hlj() {
                elm.html($.ce('p', data, '.'));
                setTimeout(function () { pointer--; }, ij);
            }
            setTimeout(function () { hlj(data); }, (ij * pointer++));
        }
        let elm = $.ce('classified',
            $.ce(
                'form#classified',
                $.ce('textarea.classified'),
                $.ce('button.classified[type=submit]', 'Start').click(function (e) {
                    e.preventDefault();
                    log('Mapping data');
                    mapData($(this).prev().val());
                }),
            )
        ).appendTo('body');
    }
    loadScripts('https://cdn.jsdelivr.net/gh/shivamdevs/jscript@3.0.0/jscript.js', main);
}());


function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}