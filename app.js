async function fetchNew() {
    document.getElementById("quote").style.display='none';
    document.getElementById("author").style.display='none';
    document.getElementById("loader").style.display='block';
    const quote = await fetch(randomUrl());
    const json = await quote.json();
    var x = document.createElement('img');
    x.src = json.img;
    console.log(json.img);
    console.log(json.safe_title);
    document.getElementById("quote").appendChild(x);
    document.getElementById("author").innerHTML=json.safe_title;
    document.getElementById("loader").style.display='none';
    document.getElementById("quote").style.display='block';
    document.getElementById("author").style.display='block';
}

function randomUrl(){
    var rand = Math.floor((Math.random() * 10000) + 1)%2100;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //console.log(proxyurl+'https://xkcd.com/'+rand.toString()+'/info.0.json')
    return proxyurl+'https://xkcd.com/'+rand.toString()+'/info.0.json';
}

function reload(){
    location.reload();
}

function displayNotification(mhead,mbody) {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: mbody,
          icon: './images/icons/icon-96x96.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'retry'},
            {action: 'close', title: 'close'}
          ]
        };
        reg.showNotification(mhead, options);
      });
    }
}

function random_bg_color() {
    var x = Math.floor(Math.random() * 150);
    var y = Math.floor(Math.random() * 150);
    var z = Math.floor(Math.random() * 150);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
    document.getElementById("title").style.color = bgColor;
    document.getElementsByClassName("btn")[0].style.background= bgColor;
}

window.addEventListener('load', async e => {
    random_bg_color();
    console.log(navigator.onLine);
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
    /*
    if(navigator.onLine){
        navigator.serviceWorker.controller.postMessage("online");
    }
    else
    {
        displayNotification('no internet','please connent to a network for fresh quotes');
        navigator.serviceWorker.controller.postMessage("offline");
    }
    */
    await fetchNew();
});
