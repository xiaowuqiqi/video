function myClass$(clo) {
    return document.getElementsByClassName(clo)[0];
}
Object.prototype.showEle = function(){
    this.style.display = "block";
};
Object.prototype.onEle = function (event,fn) {
    this.addEventListener(event,fn);
}
/**
 * hasClass
 * 检测class
 * */
Object.prototype.hasClass = function(classStr){
    // console.log(tagStr.className)
    var tagStr = this;
    var arr=String(tagStr.className).split(/\s+/);  //这个正则表达式是因为class可以有多个,判断是否包含
    for (var i=0;i<arr.length;i++){
        if (arr[i]==classStr){
            return true ;
        }
    }
    return false ;
}
/**
 * addClass
 * 添加class
 * 兼容到ie8(ie7Element没有定义)
 * */
Object.prototype.addClass = function(){
    for (var i=0;i<arguments.length;i++){
        this.className += " "+arguments[i];
    }
}//ends

/**
 * removeClass
 * 删除class
 * 兼容到ie8
 * */
Object.prototype.removeClass = function(){
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
Object.prototype.toggleClass = function(classname){
    if(this.className.indexOf(classname)==-1)
        this.className += " "+classname;
    else{
        this.className = this.className.replace(" "+classname,"");
        this.className = this.className.replace(classname,"");
    }


}//ends

/*获取需要操作的元素*/
var videoEle = document.getElementsByTagName("video")[0];

/*播放和暂停*/
var switchEle = myClass$("switch");
/*总时长*/
var totalEle = myClass$("total");

/*进度条*/
var lineEle = myClass$("line");
/*当前播放时间*/
var currentEle = myClass$("current");
/*全屏按钮*/
var expandEle = myClass$("expand");
/*灰色进度条*/
var barEle = myClass$("bar");

//把毫秒转化成 12：22：11的形式
var formatTime = function (time) {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 60);
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

videoEle.oncanplay=function () {
    //视频加载到可以播放了
    this.showEle();
    var timeStr = formatTime(videoEle.duration);//总时长
    totalEle.innerHTML = timeStr;
}

switchEle.onEle("click",function () {
    //播放与暂停
    console.log(switchEle.hasClass("icon-play"))
    if(switchEle.hasClass("icon-play")){
        videoEle.play();
        switchEle.removeClass("icon-play");
        switchEle.addClass("icon-pause");
    }else{
        videoEle.pause();
        switchEle.addClass("icon-play");
        switchEle.removeClass("icon-pause");
    }
});
videoEle.ontimeupdate = function () {
    // 进度条监听
    //console.log('当前播放时间：'+video.currentTime);
    var p = videoEle.currentTime/videoEle.duration*100+'%';
    //播放的百分比
    lineEle.style.width = p;
    currentEle.innerHTML = (formatTime(videoEle.duration));
}

expandEle.onEle("click",function () {
    if (videoEle.requestFullscreen) {
        videoEle.requestFullscreen();
    }
//FireFox
    else if (videoEle.mozRequestFullScreen) {
        videoEle.mozRequestFullScreen();
    }
//Chrome等
    else if (videoEle.webkitRequestFullScreen) {
        videoEle.webkitRequestFullScreen();
    }
//IE11
    else if (videoEle.msRequestFullscreen) {
        videoEle.msRequestFullscreen();
    }
    //test1
    //全屏操作
    // if(this.hasClass('icon-resize-full')){
    // videoEle.webkitRequestFullScreen();

        // this.removeClass('icon-resize-full')
        // this.addClass('icon-resize-small');
    // }else{
        // document.webkitCancelFullScreen();
        // this.addClass('icon-resize-full');
        // this.removeClass('icon-resize-small');
    // }
})

videoEle.onEle("ended",function () {
    //播放结束执行
    //重新播放，重置
    videoEle.currentTime = 0;//正在播放的时间置0.
    switchEle.addClass("icon-play");
    switchEle.removeClass("icon-pause");
});

barEle.onEle("click",function (e) {
    // 跳跃功能
    var p = e.offsetX/barEle.offsetWidth;//获取点击地方相对应的百分比
    var goTime = p * videoEle.duration;//百分比*总时长
    videoEle.currentTime = goTime;
})