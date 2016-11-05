/**
 * tigiui - by tigi
 * modified : 2016/11/02
 * dependency : jquery
 */
(function(){
  /**
    * make Namespace
    */
   var namespace = function(notation) {
       var object = window;
       var names = notation.split('.');

       for (var i = 0; i < names.length; i++) {
           var next = object[names[i]];
           if (typeof next == 'undefined') {
               next = {};
               object[names[i]] = next;
           }
           object = next;
       }

       return object;
   };
   var U = namespace("tigi.util");
   var I = namespace("tigi.ui");

   /**
 	 * browser
 	 */
 	 U.browser = {
     chrome : (navigator.userAgent.toLowerCase().indexOf("chrome") > -1)
     , ie : (navigator.userAgent.toLowerCase().indexOf("msie") > -1)
     , firefox : (navigator.userAgent.toLowerCase().indexOf("firefox") > -1)
     , safari : (navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !this.chrome
     , ie78 : (navigator.userAgent.toLowerCase().indexOf("msie 8") > -1) || (navigator.userAgent.toLowerCase().indexOf("msie 7") > -1)
	 };

   /*
   * image slider
   */
   I.slider = {
     _param : {
       sliderSelector : "#slider"
       , btnPlaySelector : ""
       , btnStopSelector : ""
       , btnLeftSelector : ""
       , btnRightSelector : ""
       , width : 0
       , height : 0
       , sliderTimerSet : 400
       , isAutoPlay : false
       , playTimerSet : 1000
       , isLoop : false
       , callback : null
     }
     , _option : {
       autoSlideObj : null
       , curentIndex : 0
       , previousIndex : 0
       , totalCount : 0
       , slideFlag : true
     }
     , init : function(p) {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       if (p == null || typeof p == 'undefined' || typeof p != 'object') return;

       // set params
       $.each(p, function(key, value){
         params[key] = value;
       });

       // set elements of options
       options.$area = $(params.sliderSelector).eq(0);
       if (options.$area.length < 1) {
         console.log("sliderSelector is required");
         return;
       }
       options.$ulArea = options.$area.find("ul").eq(0);
       if (options.$ulArea.length < 1) {
         console.log("sliderSelector have to include a 'ul' element");
         return;
       }
       options.$liArea = options.$ulArea.find("li");
       if (options.$liArea.length < 1) {
         console.log("sliderSelector have to include at least one 'ul>li' element");
         return;
       }

       // init loop option
       if (params.isLoop) {
         options.$area.hide();
         var $cloneFirst = options.$liArea.eq(0).clone();
         var $cloneLast = options.$liArea.eq(options.$liArea.length - 1).clone();
         options.$ulArea.append($cloneFirst);
         options.$ulArea.prepend($cloneLast);
         options.$liArea = options.$area.find("li");
         //move image to index 1(start image), because index 0 is a clone image for looping
         slider.adjustImageTo(1);
       }

       // set slider element and option
       options.totalCount = options.$liArea.length;
       options.$area.width(params.width)
                         .height(params.height)
                         .css({"overflow" : "hidden"});
       options.$ulArea.width(params.width * options.totalCount + 40)
                           .height(params.height)
                           .css({"list-style" : "none", "margin" : 0, "padding" : 0});
       options.$liArea.width(params.width)
                           .height(params.height)
                           .css({"list-style" : "none", "float" : "left"});

       // bind event on each button
       if (params.btnPlaySelector != null
         && params.btnPlaySelector.trim() != ""
         && typeof params.btnPlaySelector == 'string')
         $(document).on("click", params.btnPlaySelector, function(e){
           e.preventDefault();
           console.log("play btn");
           params.isAutoPlay = true;
           slider.autoPlaySlider();
         });
       if (params.btnStopSelector != null
         && params.btnStopSelector.trim() != ""
         && typeof params.btnStopSelector == 'string')
         $(document).on("click", params.btnStopSelector, function(e){
           e.preventDefault();
           console.log("stop btn");
           params.isAutoPlay = false;
           slider.autoStopSlider();
         });
       if (params.btnLeftSelector != null
         && params.btnLeftSelector.trim() != ""
         && typeof params.btnLeftSelector == 'string')
         $(document).on("click", params.btnLeftSelector, function(e){
           e.preventDefault();
           console.log("left btn");
           var params = slider._param;
           slider.autoStopSlider();
           slider.leftSlider();
           if (params.isAutoPlay) slider.autoPlaySlider();
         });
       if (params.btnRightSelector != null
         && params.btnRightSelector.trim() != ""
         && typeof params.btnRightSelector == 'string')
         $(document).on("click", params.btnRightSelector, function(e){
           e.preventDefault();
           console.log("right btn");
           var params = slider._param;
           slider.autoStopSlider();
           slider.rightSlider();
           if (params.isAutoPlay) slider.autoPlaySlider();
         });

       // set auto play
       if (params.isAutoPlay) slider.autoPlaySlider();
       // check init state
       slider.checkState();
     }
     // auto play
     , autoPlaySlider : function() {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       if (options.autoSlideObj == null) {
         console.log("play auto slider");
         options.autoSlideObj = setInterval(function(){
           if (options.curentIndex == options.totalCount - 1) {
             params.isAutoPlay = false;
             slider.autoStopSlider();
             return;
           }
           slider.rightSlider();
         }, params.playTimerSet);
       }
     }
     // auto stop
     , autoStopSlider : function() {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       if (options.autoSlideObj != null) {
         console.log("stop auto slider");
         clearInterval(options.autoSlideObj);
         options.autoSlideObj = null;
       }
     }
     // slide to left
     , leftSlider : function() {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       var firstIndex = 0;
       var leftSideindex = options.curentIndex - 1;
       if (!slider.checkSlideFlag()) return;
       options.previousIndex = options.curentIndex;
       options.curentIndex = Math.max(leftSideindex, firstIndex);
       slider.slideCore(params.width * options.curentIndex, params.sliderTimerSet, options.$ulArea);
       slider.checkState();
     }
     // slide to right
     , rightSlider : function() {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       var lastIndex = options.totalCount - 1;
       var rightSideIndex = options.curentIndex + 1;
       if (!slider.checkSlideFlag()) return;
       options.previousIndex = options.curentIndex;
       options.curentIndex = Math.min(rightSideIndex, lastIndex);
       slider.slideCore(params.width * options.curentIndex, params.sliderTimerSet, options.$ulArea);
       slider.checkState();
     }
     // move image for adjusting a visible image
     , adjustImageTo : function(toIndex) {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       options.curentIndex = toIndex;
       setTimeout(function(){
         slider.slideCore(params.width * options.curentIndex, 0, options.$ulArea);
         options.$area.show();
       }, params.sliderTimerSet);
     }
     // check slider is available or not
     , checkSlideFlag : function () {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       if (!options.slideFlag) return false;
       options.slideFlag = false;
       setTimeout(function(){
         options.slideFlag = true;
       }, params.sliderTimerSet);
       return true;
     }
     // check current state after sliding
     , checkState : function () {
       var slider = this;
       var params = slider._param;
       var options = slider._option;
       var firstIndex = 0;
       var lastIndex = options.totalCount - 1;
       var startIndexInLoop = 1;
       var endIndexInLoop = options.totalCount - 2;
       // check for adjusting the loop image
       if (params.isLoop) {
         if (options.curentIndex == lastIndex && options.previousIndex == endIndexInLoop) { // from last image to first image (right direction)
           slider.adjustImageTo(startIndexInLoop);
         } else if (options.curentIndex == firstIndex && options.previousIndex == startIndexInLoop) { // from first image to last image (left direction)
           slider.adjustImageTo(endIndexInLoop);
         }
       }
       // index check in the callback function
       if (params.callback != null && typeof params.callback != 'undefined') {
         if (params.isLoop) {
           // in Loop, have to consider clone image index
           params.callback(options.curentIndex - 1);
         } else {
           params.callback(options.curentIndex);
         }
       }
     }
     // move core
     , slideCore : function(distance, duration, $slideArea) {
       var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();

       if (tigi.util.browser.ie78) {
         $slideArea.css("margin-left", value +"px");
       } else {
         $slideArea.css("-ms-transition-duration", (duration/1000).toFixed(1) + "s");
         $slideArea.css("-o-transition-duration", (duration/1000).toFixed(1) + "s");
         $slideArea.css("-moz-transition-duration", (duration/1000).toFixed(1) + "s");
         $slideArea.css("transition-duration", (duration/1000).toFixed(1) + "s");
         $slideArea.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");

         $slideArea.css("-ms-transform", "translate("+value+"px)");
         $slideArea.css("-o-transform", "translate("+value+"px)");
         $slideArea.css("-moz-transform", "translate("+value+"px)");
         $slideArea.css("transform", "translate("+value+"px)");
         $slideArea.css("-webkit-transform", "translate3d("+value+"px,0px,0px)");
       }
     }
   };
}());
if (tigi.util.browser.chrome) {
  console.log('%chttps://github.com/onlytigi/javaScriptStudy', 'font-size:20px;color:#ff9494;padding:2px 0px;border-radius:4px;background:#fff;');
  console.log('%cby tigi', 'font-size:14px;color:#ff1414;padding:2px 0px;border-radius:4px;background:#fff;');
} else {
  console.log('https://onlytigi.github.io');
  console.log('by tigi');
}
