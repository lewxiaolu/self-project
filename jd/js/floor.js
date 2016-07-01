var floorAry = [
    {id: "floor1", text: "服装", top: null},
    {id: "floor2", text: "美妆", top: null},
    {id: "floor3", text: "家电", top: null},
    {id: "floor4", text: "数码", top: null},
    {id: "floor5", text: "运动", top: null},
    {id: "floor6", text: "居家", top: null},
    {id: "floor7", text: "母婴", top: null},
    {id: "floor8", text: "食品", top: null},
    {id: "floor9", text: "图书", top: null},
    {id: "floor10", text: "服务", top: null}
];

var floorIndex = document.getElementById("floorIndex"), oLis = null;
var winW = document.documentElement.clientWidth||document.body.clientWidth;
floorIndex.style.left = (winW-1210)/2-30+"px";
window.onresize = function (){
    var winW = document.documentElement.clientWidth||document.body.clientWidth;
    floorIndex.style.left = (winW-1210)/2-30+"px";
};



~function () {
    var str = "";
    for (var i = 0, len = floorAry.length; i < len; i++) {
        var curFloor = floorAry[i];
        var curFloorEle = document.getElementById(curFloor["id"]);
        curFloor["top"] = utils.offset(curFloorEle).top;

        str += "<li curId = '"+curFloor["id"]+"' floorText='" + curFloor["text"] + "' floorTop='" + curFloor["top"] + "'>" + (i + 1) + "F</li>";
    }
    floorIndex.innerHTML = str;

    utils.css(floorIndex, "marginTop", -len * 31 / 2);

    oLis = utils.children(floorIndex);
}();

~function () {
    for (var i = 0, len = oLis.length; i < len; i++) {
        var curLi = oLis[i];
        curLi.index = i;
        curLi.onmouseover = function () {
            utils.css(this, {
                background: "orangered",
                color: "#fff"
            });
            this.innerHTML = this.getAttribute("floorText");
        };
        curLi.onmouseout = function () {
            if (this.getAttribute("isLoad") === "true") {
                utils.css(this, {
                    background: "",
                    color: "red"
                });
                return;
            }
            utils.css(this, {
                background: "",
                color: "#000"
            });
            this.innerHTML = (this.index + 1) + "F";
        };
    }
}();

function showFloor() {
    var curTop = utils.win("scrollTop"), curHeight = utils.win("clientHeight");

    floorIndex.style.display = curTop + curHeight > oLis[0].getAttribute("floorTop") ? "block" : "none";

    for (var i = 0, len = oLis.length; i < len; i++) {
        var curLi = oLis[i], curLiTop = curLi.getAttribute("floorTop"), curLiText = curLi.getAttribute("floorText"), curLiF = (i + 1) + "F";
        curLi.index = i;

        var aa = i === 0 ? curHeight : (curHeight / 2);
        if (curTop + aa > curLiTop) {
            utils.css(curLi, "color", "red");
            curLi.setAttribute("isLoad", true);
            curLi.innerHTML = curLiText;

            var curDivId = curLi.getAttribute("curId");
            var curDivContent = document.getElementById(curDivId);
             utils.addClass(curDivContent,"floor-current");
            var curSiblings = utils.siblings(curLi);
            for (var k = 0; k < curSiblings.length; k++) {
                utils.css(curSiblings[k], "color", "#000");
                curSiblings[k].setAttribute("isLoad", false);
                curSiblings[k].innerHTML = (curSiblings[k].index + 1) + "F";
            }
            var curDivSiblings = utils.siblings(curDivContent);
            for (var g = 0; g < curDivSiblings.length; g++) {
                var curDivSibling = curDivSiblings[g];
               utils.removeClass(curDivSibling,"floor-current");
            }

        }
    }
}
//window.onscroll = showFloor;
window.addEventListener("scroll",showFloor,false);

var timer = null;
for (var i = 0; i < oLis.length; i++) {
    var curLi = oLis[i];
    curLi.onclick = function () {
       //window.onscroll = null;
        window.removeEventListener("scroll",showFloor,false);
        var target = this.getAttribute("floorTop");
        move(target);
    }
}
function move(target) {
    var begin = utils.win("scrollTop"), duration = 500;
    var step = Math.abs((target - begin) / duration * 10);
    _move();
    function _move() {
        window.clearTimeout(timer);
        var cur = utils.win("scrollTop");
        if (target > begin) {//->向下
            if (cur + step >= target) {
               // window.onscroll = showFloor;
                window.addEventListener("scroll",showFloor,false);
                utils.win("scrollTop", target);
                return;
            }
            utils.win("scrollTop", cur + step);
        } else if (target < begin) {//->向上
            if (cur - step <= target) {
               //window.onscroll = showFloor;
               window.addEventListener("scroll",showFloor,false);
                utils.win("scrollTop", target);
                return;
            }
            utils.win("scrollTop", cur - step);
        } else {//->不动
            //window.onscroll = showFloor;
            window.addEventListener("scroll",showFloor,false);
            return;
        }
        timer = window.setTimeout(_move, 10);
    }
}
