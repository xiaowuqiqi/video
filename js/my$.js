/**
 * 封装name调用功能
 * */
function myName$Array(name) {
    return document.getElementsByName(name);
}
function myName$(name) {
    return document.getElementsByName(name)[0];
}
/**
 * 封装id调用功能
 * */
function myId$(id) {
    return document.getElementById(id);
}
/**
 * 封装tagname调用功能
 * */
function myTagName$Array(name) {
    return document.getElementsByTagName(name);
}
function myTagName$(name) {
    return document.getElementsByTagName(name)[0];
}
/**
 * 封装class调用功能
 * */
function myClass$(cla){//查找第一个符合条件元素
    if(!document.getElementsByClassName){
        var nodes = document.getElementsByTagName("*");
        for(var i = 0;i<nodes.length;i++){
            if(hasClass(nodes[i],cla)){
                return nodes[i];
            }
        }
    }else{
        return document.getElementsByClassName(cla)[0];
    }
}
/**
 * hasClass
 * 检测class
 * */
function hasClass(tagStr,classStr){
    // console.log(tagStr.className)
    var arr=String(tagStr.className).split(/\s+/);  //这个正则表达式是因为class可以有多个,判断是否包含
    for (var i=0;i<arr.length;i++){
        if (arr[i]==classStr){
            return true ;
        }
    }
    return false ;
}
function myClass$Array(myclass) {//兼容写法
    if (!document.getElementsByClassName) {
        var list = document.getElementsByTagName('*');
        var arr = [];
        for (var i = 0; i < list.length; i++) {
            if (hasClass(list[i],myclass)) {
                //在浏览器版本不支持该方法时使用className属性
                arr.push(list[i]);
            }
        }
        return arr;
    } else {
        return document.getElementsByClassName(myclass);
    }
}


/**
    * addClass
    * 添加class
    * 兼容到ie8(ie7Element没有定义)
    * */
Element.prototype.addClass = function(){
    for (var i=0;i<arguments.length;i++){
        this.className += " "+arguments[i];
    }
}//ends

/**
* removeClass
* 删除class
* 兼容到ie8
* */
Element.prototype.removeClass = function(){
    for (var i=0;i<arguments.length;i++){
        this.className = this.className.replace(" "+arguments[i],"");
        this.className = this.className.replace(arguments[i],"");
    }
}//ends

/**
* toggleClass
* 替换class
* 兼容到ie8
* */
Element.prototype.toggleClass = function(classname){
    if(this.className.indexOf(classname)==-1)
        this.className += " "+classname;
    else{
        this.className = this.className.replace(" "+classname,"");
        this.className = this.className.replace(classname,"");
    }


}//ends
/**
 * hasClass
 * 检测class
 * */
// Element.prototype.hasClass = function(cls) {
//     let elem = this;
//     cls = cls || '';
//     if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
//     return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
// }


/**
 * 工具类
 * */
/**
 * 存储器封装
 * */
function setlocalData(name,data){
    var jsg = JSON.stringify(data);
    localStorage.setItem(name,jsg);
}
function getlocalData(name){
    var jsg = localStorage.getItem(name);
    var f = JSON.parse(jsg);
    return f;
}
/**
 * url id获取
 * */

function getUrlParamID() {
    var reg = new RegExp("(^|&)id=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; //返回参数值
}
/**
 * 生成随机数[min,max)
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}//ends
/**
 * 删除子级所有div
 * */
function removeChildDivs(ElementP) {
    ElementP.innerHTML = "";
}

/**
 * 工厂封装，div位置信息
 * */
function divPositionInf(div) {
    let divPositionarr = divPositionInf.getPoint(div);
    let obj = new Object();
    obj.T = divPositionarr[0];
    obj.L = divPositionarr[1];
    obj.W = divPositionarr[2];
    obj.H = divPositionarr[3];
    return obj;
}
divPositionInf.getPoint = function (obj) { //获取某元素以浏览器左上角为原点的坐标
    var t = obj.offsetTop; //获取该元素对应父容器的上边距
    var l = obj.offsetLeft; //对应父容器的上边距
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
//判断是否有父容器，如果存在则累加其边距
    while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
        t += obj.offsetTop; //叠加父容器的上边距
        l += obj.offsetLeft; //叠加父容器的左边距
    }
    return [t, l, w, h];
}//ends
