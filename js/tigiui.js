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
     chrome : (navigator.userAgent.toLowerCase().indexOf("chrome") > -1),
  	 ie : (navigator.userAgent.toLowerCase().indexOf("msie") > -1),
  	 firefox : (navigator.userAgent.toLowerCase().indexOf("firefox") > -1),
 	 	 safari : (navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !this.chrome,
 	   ie78 : (navigator.userAgent.toLowerCase().indexOf("msie 8") > -1) || (navigator.userAgent.toLowerCase().indexOf("msie 7") > -1)
	 };

   /*
   * image slider
   */
   I.slider = {
     _param : {
       $area : null,
       $ulArea : null,
       $liArea : null,
       width : 0,
       height : 0,
       sliderTimerSet : 400,
       isAutoPlay : false,
       playTimerSet : 1000,
       isLoop : false,
       callback : null,

       $btnPlay : null,
       $btnStop : null,
       $btnLeft : null,
       $btnRight : null,

       autoSlideObj : null,
       curentIndex : 0,
			 totalCount : 0
     },
     init : function(p) {
       var slider = this;
       var params = slider._param;
       if (p == null || typeof p == 'undefined' || typeof p != 'object') return;

       // set params
       $.each(p, function(key, value){
         if (key == '$area') {
           params.$ulArea = value.find("ul");
           params.$liArea = value.find("li");
         }
         params[key] = value;
       });

       // set loop option
       if (params.isLoop) {
         var $clone = params.$liArea.eq(0).clone();
         params.$ulArea.append($clone);
         params.$liArea = params.$area.find("li");
       }

       // set slider
       params.totalCount = params.$liArea.length;
       params.$area.width(params.width)
                         .height(params.height)
                         .css({"overflow" : "hidden"});
       params.$ulArea.width(params.width * params.totalCount + 40)
                           .height(params.height)
                           .css({"list-style" : "none", "margin" : 0, "padding" : 0});
       params.$liArea.width(params.width)
                           .height(params.height)
                           .css({"list-style" : "none", "float" : "left"});

       // bind event on each button
       if(params.$btnLeft) params.$btnLeft.click(function(){
         console.log("left btn");
         var params = slider._param;
         slider.autoSlider.stop(slider);
         slider.leftSlider();
         if (params.isAutoPlay) slider.autoSlider.play(slider);
       });
       if(params.$btnRight) params.$btnRight.click(function(){
         console.log("right btn");
         var params = slider._param;
         slider.autoSlider.stop(slider);
         slider.rightSlider();
         if (params.isAutoPlay) slider.autoSlider.play(slider);
       });
       if(params.$btnPlay) params.$btnPlay.click(function(){
         console.log("play btn");
         params.isAutoPlay = true;
         slider.autoSlider.play(slider);
       });
       if(params.$btnStop) params.$btnStop.click(function(){
         console.log("stop btn");
         params.isAutoPlay = false;
         slider.autoSlider.stop(slider);
       });

       // set auto play
       if (params.isAutoPlay) slider.autoSlider.play(slider);
       // check init state
       slider.checkState(slider);
     },
     // move core
     slideCore : function(distance, duration, $slideArea) {
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
		 },
     // slide to left
     leftSlider : function() {
       var slider = this;
       var params = this._param;
       params.curentIndex = Math.max(params.curentIndex - 1, 0);
       slider.slideCore(params.width * params.curentIndex, params.sliderTimerSet, params.$ulArea);
       slider.checkState(slider);
     },
     // slide to right
     rightSlider : function() {
       var slider = this;
       var params = this._param;
       params.curentIndex = Math.min(params.curentIndex + 1, params.totalCount - 1);
       slider.slideCore(params.width * params.curentIndex, params.sliderTimerSet, params.$ulArea);
       slider.checkState(slider);
     },
     // check current state after sliding
     checkState : function (slider){
       var params = this._param;
       if (params.isLoop) {
         if (params.curentIndex == params.totalCount - 1) {
           params.curentIndex = 0;
           setTimeout(function(){
             slider.slideCore(params.width * params.curentIndex, 0, params.$ulArea);
           }, params.sliderTimerSet);
         }
       }
       if (params.callback != null && typeof params.callback != 'undefined') {
         params.callback(params.curentIndex);
       }
     },
     // auto slide
     autoSlider : {
       play : function(slider){
         var params = slider._param;
         if (params.autoSlideObj == null) {
           console.log("play auto slider");
           params.autoSlideObj = setInterval(function(){
             if (params.curentIndex == params.totalCount - 1) {
               params.isAutoPlay = false;
               slider.autoSlider.stop(slider);
               return;
             }
             slider.rightSlider();
           }, params.playTimerSet);
         }
       },
       stop : function(slider){
          var params = slider._param;
          if (params.autoSlideObj != null) {
            console.log("stop auto slider");
            clearInterval(params.autoSlideObj);
            params.autoSlideObj = null;
          }
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
