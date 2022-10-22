(function () {
    function copyData(data) {
        const input = document.createElement('input');
        input.className = 'copy-data';
        input.value = data;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value);
        document.body.removeChild(input);
    }
    (function () {
        const btn = document.createElement('copy-data');
        btn.className = 'top-n';
        btn.innerHTML = 'Copy for MyPerfectice';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            const node = document.querySelector('#postBody a.a2');
            if (node) node.parentNode.removeChild(node);
            const div = document.querySelector("#postBody").querySelectorAll('div:not([class]):not([id]):not(:empty)');
            const map = { que: [], ans: [] };
            var index = 0;
            for (const item of div) {
                if (item.innerText && item.innerText.length > 1) {
                    const text = item.innerText;
                    if (text.startsWith('Q')) {
                        map.que[index] = (text.substring(text.indexOf(' ') + 1).toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || null;
                        index++;
                    } else if (text.startsWith('Ans')) {
                        map.ans[index - 1] = (text.substring(text.indexOf('-') + 1).toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || null;
                    }
                }
            }
            console.log(map);
            copyData(JSON.stringify(map));
            btn.innerHTML = 'Copied!';
            setTimeout(function () { btn.innerHTML = 'Copy for MyPerfectice'; }, 700);
        });
    }());
    (function () {
        const btn = document.createElement('copy-data');
        btn.className = 'top';
        btn.innerHTML = 'Copy for MyPerfectice 2';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            const node = document.querySelector('#postBody a.a2');
            if (node) node.parentNode.removeChild(node);
            const div = document.querySelector("#postBody").innerText.split('\n');
            const map = { que: [], ans: [] };
            var index = 0;
            for (const item of div) {
                const text = item.trim();
                if (text && text.length > 1) {
                    if (text.startsWith('Q')) {
                        map.que[index] = (text.substring(text.indexOf(' ') + 1).toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || null;
                        index++;
                    } else if (text.startsWith('Ans')) {
                        map.ans[index - 1] = (text.substring(text.indexOf('-') + 1).toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || null;
                    }
                }
            }
            console.log(map);
            copyData(JSON.stringify(map));
            btn.innerHTML = 'Copied!';
            setTimeout(function () { btn.innerHTML = 'Copy for MyPerfectice 2'; }, 700);
        });
    }());
    (function () {
        const btn = document.createElement('copy-data');
        btn.className = 'bot';
        btn.innerHTML = 'Copy for MyPerfectice 3';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            const node = document.querySelector('#postBody a.a2');
            if (node) node.parentNode.removeChild(node);
            const div = document.querySelector("#postBody").innerText.split('\n');
            const map = { que: [], ans: [] };
            var index = 0;
            for (const item of div) {
                const text = item.trim();
                if (text && text.length > 1) {
                    if (text.startsWith('Q')) {
                        map.que[index] = (text.substring(text.indexOf('.') + 1).toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || '';
                        index++;
                    } else if (text.startsWith('Ans')) {
                        map.ans[index - 1] = (text.substring(text.indexOf('-') + 1).toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || '';
                    } else if (map.que[index - 1]) {
                        map.que[index - 1] += (text.toLowerCase().replaceAll('\n', '').replace(/[^a-zA-Z0-9]/g, '')) || '';
                    }
                }
            }
            console.log(map);
            copyData(JSON.stringify(map));
            btn.innerHTML = 'Copied!';
            setTimeout(function () { btn.innerHTML = 'Copy for MyPerfectice 3'; }, 700);
        });
    }());
    (function () {
        const btn = document.createElement('copy-data');
        btn.className = 'bot-n';
        btn.innerHTML = 'Copy for HitBullsEye';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            const div = document.querySelector("#postBody").querySelectorAll('table > tbody td');
            let map = [];
            for (const item of div) {
                if (item.innerText && item.innerText.length > 1) {
                    const text = item.innerText;
                    const pattern = (text.match(/\[(.*?)\]/) || ['', ''])[1];
                    console.log(pattern);
                    if (pattern && text.startsWith('[')) {
                        const index = parseInt(pattern, 10) - 1;
                        map[index] = ((text.substring(text.indexOf('-') + 2).toUpperCase().replaceAll('\n', '').replace(/[^A-Z]/g, '')) || '');
                    }
                }
            }
            console.log(map);
            copyData(map.join(''));
            btn.innerHTML = 'Copied!';
            setTimeout(function () { btn.innerHTML = 'Copy for HitBullsEye'; }, 700);
        });
    }());
}());