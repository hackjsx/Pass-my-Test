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
        const li = document.createElement('li');
        document.querySelector("body > div > div > div.content > app-testzone > app-question-wise-analysis > div > div > div > div > div.col-md-12.graph-colors-analysis > ul").appendChild(li);
        btn.innerHTML = 'Copy Test Data';
        li.appendChild(btn);
        btn.addEventListener('click', function () {
            const rows = document.querySelectorAll("body > div > div > div.content > app-testzone > app-question-wise-analysis > div > div > div > div > table > tbody tr.tr_fa-times > td:nth-child(3)");
            let map = '';
            for (const td of rows) {
                map += td.textContent;
            }
            console.log(map);
            copyData(map);
            btn.innerHTML = 'Copied!';
            setTimeout(function () { btn.innerHTML = 'Copy Test Data'; }, 700);
        });
    }());
}());