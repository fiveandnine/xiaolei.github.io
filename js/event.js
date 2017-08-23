var infinitfunc = function() {
    var tomDOM;
    var page = 1;
    lastpage = false;
    var fetching = false;
    var viewport2top = window.scrollY; //目前窗口viewport离最顶端距离
    // var item2top = item.offsetTop;
    var viewportHeight = window.innerHeight;
    var prevscolly = window.scrollY;
    // 滑动处理函数onscroller
    function handleScroll() {
        if (window.location.hash !== "#/event" || lastpage) {
            clearTimeout();
            return false;
        }
        var bodyHeight = document.body.scrollHeight;
        // && !force
        if (window.scrollY == prevscolly) {
            window.setTimeout(handleScroll, 1000);
            console.log("noscroll");
            return;
        } else {
            prevscolly = window.scrollY;
            console.log("scroll");
            console.log(prevscolly);

        }

        // 判断viewport是否超过上下阈值，即是否需要加载
        if (window.scrollY + viewportHeight + 300 > bodyHeight) {
            // 加载数据
            // lazyloading0();
            getdata();
            // 
        }
        // 懒加载
        // console.log("lazyloading");
        // lazyloading();
        window.setTimeout(handleScroll, 1000);
    }

    function lazyloading(datainit) {
        var fragment = document.createDocumentFragment(); //container
        for (var i = 0; i < datainit.length; i++) {
            var divtemp = document.createElement("div");
            divtemp.className = "isi";
            fragment.appendChild(divtemp);

        }
        var body = document.getElementsByClassName("container")[0];
        body.appendChild(fragment);
    }
    //加载创建墓碑
    var fragment = document.createDocumentFragment();
    var fragmentDIv = document.createElement("div");
    fragmentDIv.className = "tomdiv";
    for (var i = 0; i < 4; i++) {
        var divtemp = document.createElement("div");
        divtemp.className = "isp";
        fragmentDIv.appendChild(divtemp);
    }

    function lazyloading0() {


        fragment.appendChild(fragmentDIv);
        var body = document.getElementsByClassName("container")[0];
        body.appendChild(fragment);
    }

    function getdata() {
        lazyloading0(); //加载墓碑
        var myXMLHttpRequest = null;
        if (window.ActiveXObject) {
            myXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP")
        } else {
            myXMLHttpRequest = new XMLHttpRequest();
        }
        var url = "json/indexdata_" + page + ".json";
        page = page + 1;
        myXMLHttpRequest.open("get", url, true);
        myXMLHttpRequest.send(null);
        myXMLHttpRequest.onreadystatechange = function() {
            if (myXMLHttpRequest.readyState == 4 && myXMLHttpRequest.status == 200) {
                var body = document.getElementsByClassName("container")[0];
                var tom = document.getElementsByClassName("tomdiv")[0];
                body.removeChild(tom);
                var data = myXMLHttpRequest.responseText;
                var datainit = eval(data);
                lazyloading(datainit);
                if (datainit.length < 6) {
                    lastpage = true;
                }
            }

        }
    }
    window.setTimeout(handleScroll, 1000);

}
infinitfunc();