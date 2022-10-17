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
    const btn = document.createElement('copy-data');
    btn.innerHTML = 'Copy Test Data';
    document.body.appendChild(btn);
    btn.addEventListener('click', function () {
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
        setTimeout(function () { btn.innerHTML = 'Copy Test Data'; }, 700);
    });
}());