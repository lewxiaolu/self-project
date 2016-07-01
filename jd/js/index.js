(function () {
    var oSeleAddress = document.getElementById('selected_a'),
        oSeleChild = utils.getByClass(oSeleAddress, 'hide_add')[0],
        oSeleUl = utils.children(oSeleChild, 'ul')[0],
        aSeleLis = utils.children(oSeleUl, 'li'),
        oAddress = document.getElementById('address'),
        oSpe_r = utils.getByClass(document, 'spe_r')[0],
        oSpe_rChild = utils.getByClass(oSpe_r, 'my_c')[0],
        oTopBan = utils.getByClass(document, 'top-banner')[0],
        oTopBanChild = utils.getByClass(oTopBan, 'w-close')[0],
        guessyou = document.getElementById("guessyou"),
        oPad = utils.getByClass(guessyou, "pad")[0],
        oPadChild = utils.children(oPad, "i")[0];


    utils.hoverAll(oSeleAddress, oSeleChild);
    for (var i = 0; i < aSeleLis.length; i++) {
        var oLi = aSeleLis[i];
        oLi.onclick = function () {
            for (var j = 0; j < aSeleLis.length; j++) {
                var oAllLi = utils.children(aSeleLis[j], 'a')[0];
                oAllLi.className = '';
            }
            var oLiChild = utils.children(this, 'a')[0];
            var oLiTest = oLiChild.innerHTML;
            utils.addClass(oLiChild, 'selected');
            oAddress.innerHTML = oLiTest;
        }
    }
    utils.hoverAll(oSpe_r, oSpe_rChild);
    oTopBanChild.onclick = function () {
        utils.css(oTopBan, 'opacity', "0");
        setTimeout(function () {
            utils.css(oTopBan, 'display', "none");
        }, 500);
    }
    var oBanner = new AutoBanner("tip", 'json/data.txt', 2000);
/*    var oBanner1 = new AutoBanner1("mainLeft1", 'json/data.json', 2000);
    var oBanner2 = new AutoBanner1("mainLeft2", 'json/data.json', 2000);
    var oBanner3 = new AutoBanner1("mainLeft3", 'json/data.json', 2000);
    var oBanner4 = new AutoBanner1("mainLeft4", 'json/data.json', 2000);
    var oBanner5 = new AutoBanner1("mainLeft5", 'json/data.json', 2000);
    var oBanner6 = new AutoBanner1("mainLeft6", 'json/data.json', 2000);
    var oBanner7 = new AutoBanner1("mainLeft7", 'json/data.json', 2000);
    var oBanner8 = new AutoBanner1("mainLeft8", 'json/data.json', 2000);
    var oBanner9 = new AutoBanner1("mainLeft9", 'json/data.json', 2000);
    var oBanner10 = new AutoBanner1("mainLeft10", 'json/data.json', 2000);*/

    for(var num= 1; num <= 10 ; num++){
        new AutoBanner1("mainLeft"+num, 'json/data.json', 2000);
    }
  /*  var ary = 0;
    for(i =0;i<11;i++){
        ary.push(new AutoBanner1("mainLeft"+i, 'json/data.json', 2000));
    }
*/


    guessyou.onmouseenter = function () {
         oPadChild.style.webkitTransitionDuration = "0s";
         oPadChild.style.left = "-365px";
         window.setTimeout(function () {
         oPadChild.style.webkitTransitionDuration = "0.8s";
         oPadChild.style.left = "844px";
         }, 100);
     };

    //选项卡


})();

//选项卡
tabChange();
function tabChange(){
   var oFloors = utils.getByClass(document, "floor");
    for(var i=0;i<oFloors.length;i++){
        var oFloor = oFloors[i];
        var oTab = utils.getByClass(oFloor, "tab")[0],
            oTabLisChild = oTab.getElementsByTagName("li"),
            oContent = utils.getByClass(oFloor, "main");
        utils.tab(oTabLisChild,oContent,"selected","show");
    }
}
searchCheck();
//location.onload(http:)
function searchCheck() {
    var oInput = document.getElementById('seachkey'),
        oInputHide = document.getElementById("shelper"),
        oInputHideChild = utils.children(oInputHide, 'li'),
        oLSearch = document.getElementById('l-search'),
        oClose = document.getElementById('light-close'),
        timer = null;
    oInput.onkeyup = function () {
        oInputHide.style.display = 'block';
        this.placeholder = "";
    };
    oInputHide.onmouseenter = function () {
        clearTimeout(timer);
        utils.css(oInputHide, "display", "block");
    };
    oLSearch.onmouseleave = function () {
        timer = setTimeout(function () {
            utils.css(oInputHide, "display", "none");
        }, 500);
    };
    oClose.onclick = function () {
        utils.css(oInputHide, "display", "none");
    };
    for (var i = 0, len = oInputHideChild.length - 1; i < len; i++) {
        var cur = oInputHideChild[i];
        cur.onclick = function () {
            var curText = utils.getByClass(this, 'search-item')[0];
            oInput.value = curText.innerHTML;
            utils.css(oInputHide, "display", "none");
        }
    }
}
//单机轮播
var tipImg = function carouselImg() {
    var oBox = document.getElementById('box'),
        oImgWrap = oBox.getElementsByTagName('div')[0],
        aDiv = oImgWrap.getElementsByTagName('div'),
        oBtn = document.getElementById("btn"),
        oBtnLeft = oBtn.getElementsByTagName('a')[0],
        oBtnRight = oBtn.getElementsByTagName('a')[1],
        autoTimer = null,
        interval = 1000,
        step = 0;
    oImgWrap.innerHTML += '<div><a href="javascript:;"><img  width="250" height="164" src="img/575e287fN215129c3.jpg" alt=""/></a><a href="javascript:;"><img  width="250" height="164" src="img/5757bf42N08620e78.jpg" alt=""/></a><a href="javascript:;"><img  width="250" height="164"src="img/5757bf70N41491dbf.jpg" alt=""/></a><a href="javascript:;"><img  width="250" height="164" src="img/5757c006Ndf9eafbb.jpg" alt=""/></a></div>';
    oImgWrap.style.width = aDiv.length * aDiv[0].offsetWidth + 'px';
    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = 0;
            utils.css(oImgWrap, 'left', -step * 1000);
        }
        step++;
        zhufengAnimate(oImgWrap, {'left': -step * 1000}, 500);

    }

    oBox.onmouseover = function () {
        clearInterval(autoTimer);
        utils.css(oBtnLeft, 'display', 'block');
        utils.css(oBtnRight, 'display', 'block');
    };
    oBox.onmouseout = function () {
        utils.css(oBtnLeft, 'display', 'none');
        utils.css(oBtnRight, 'display', 'none');
    };
    oBtnRight.onclick = autoMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length - 1;
            utils.css(oImgWrap, 'left', -step * 1000)
        }
        step--;
        zhufengAnimate(oImgWrap, {'left': -step * 1000}, 500);
    };
};
tipImg();
//纵向滚动
var direction = function () {
    var oDir = document.getElementById("dir");
    var oDirection = utils.getByClass(oDir,"direction")[0];
    var aLis = oDirection.getElementsByTagName("li");
    var autoTimer1 = null;
    var interval1 = 2000;
    var step = 0;
    oDirection.style.height = aLis.length*aLis[0].offsetHeight+"px";
    clearInterval(autoTimer1);
    autoTimer1 = setInterval(autoDirection,interval1);
    function autoDirection(){
        if(step >= aLis.length-2){
            step = 0;
            utils.css(oDirection,"top",-step*aLis[0].offsetHeight)
        }
        step++;
        zhufengAnimate(oDirection,{'top':-step*aLis[0].offsetHeight},500)
    }
    oDir.onmouseenter = function(){
        clearInterval(autoTimer1);
    }
    oDir.onmouseleave = function(){
        autoTimer1 = setInterval(autoDirection,interval1);
    }
};
direction();
//楼层跟着页面的动而动

//回到顶部
goBack();
function goBack(){
    var goLink = document.getElementById("goLink");
       //window.onscroll=computedDisplay;
     window.addEventListener("scroll",computedDisplay,false);
    function computedDisplay(){
        if(utils.win('scrollTop')>=utils.win('clientHeight')){
            utils.setCss(goLink,'display','block');
        }else{
            utils.setCss(goLink,'display','none');
        }
    }
    goLink.onclick=function(){
        utils.setCss(goLink,'display','none');
       // window.onscroll=null;
       window.removeEventListener("scroll",computedDisplay,false);
        var target=utils.win('scrollTop');
        var duration=500;
        var interval=10;
        var step=(target/duration)*interval;
        var timer=setInterval(function(){
            var curT=utils.win('scrollTop');
            if(curT<=0){
                clearInterval(timer);
                //window.onscroll=computedDisplay;
                window.addEventListener("scroll",computedDisplay,false);
                return;
            }
            curT-=step;
            utils.win('scrollTop',curT);
        },interval)
    }
}


