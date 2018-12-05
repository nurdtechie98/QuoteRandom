async function fetchNew() {
    const quote = await fetch('https://talaikis.com/api/quotes/random/');
    const json = await quote.json();
    //console.log(json.author);
    document.getElementById("quote").innerHTML="&#34; "+json.quote+" &#34;";
    document.getElementById("author").innerHTML="- "+json.author;
}

function reload(){
    location.reload();
}

function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    //console.log(bgColor);
    document.body.style.background = bgColor;
    document.getElementsByClassName("btn")[0].style.background= bgColor;
}

window.addEventListener('load', async e => {
    random_bg_color();
    await fetchNew();
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
});
