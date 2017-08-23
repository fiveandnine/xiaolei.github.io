function xmlReq(_url, senddata) {
    var senddata = senddata || null;
    var myXMLHttpRequest = null;
    if (window.ActiveXObject) {
        myXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP")
    } else {
        myXMLHttpRequest = new XMLHttpRequest();
    }
    var url = _url;
    myXMLHttpRequest.open("get", url, true);
    myXMLHttpRequest.send(senddata);
    return myXMLHttpRequest;
}

function getHtml(htmlsrc, js) {
    var myXMLHttpRequest = xmlReq(htmlsrc);
    myXMLHttpRequest.onreadystatechange = function() {
        if (myXMLHttpRequest.readyState == 4 && myXMLHttpRequest.status == 200) {
            htmltemp = myXMLHttpRequest.responseText;
            divele.innerHTML = htmltemp;
            // childjs.src = js;
            var oHead = document.getElementsByTagName('HEAD').item(0);
            oHead.removeChild(oHead.lastElementChild);
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.src = js;
            oScript.async = true;
            oHead.appendChild(oScript);

        }

    }
}

function Router() {
    this.routers = {};
    this.currenturl = "";
    this.refresh = function() {
        document.body.style.opacity = "0";
        this.currenturl = location.hash.slice(1) || '/';
        this.routers[this.currenturl]();
        document.body.style.opacity = "1";
    }
    this.router = function(path, callback) {
        this.routers[path] = callback || function() {
            console.log("callbackfunction");
        }
    }
    this.init = function() {
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
}

var divele = document.getElementById("divele");
var R = new Router();
var htmltemp;
R.init();
R.router("/", function() {
    getHtml("app/home.html", "js/home.js");
    // divele.style.background = "blue";
});
R.router("/event", function() {
    getHtml("app/event.html", "js/event.js");
    // divele.style.background = "blue";
});
R.router("/intro", function() {
    getHtml("app/intro.html", "js/b.js");
    // divele.style.background = "red";
});
R.router("/music", function() {
    getHtml("app/music.html", "js/c.js");

    // divele.style.background = "orange";
})