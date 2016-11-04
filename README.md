# tigiui

## Dependency
* jquery: lastest version

## Test environment
* Chrome Emulator

## Sample code
* [sample.html](https://github.com/onlytigi/javaScriptStudy/blob/master/sample/sample.html) in /sample folder

## Function
### image slider
function for sliding images
* param

| name | description | default value |
|---|---|---|
| sliderSelector | slider div selector (have to include "ul" and "ul>li" elements like the ex code) | #slider |
| btnPlaySelector | slider play btn selector | .tigiui_slider_btn_play |
| btnStopSelector | slider stop btn selector | .tigiui_slider_btn_stop |
| btnLeftSelector | slider left btn selector | .tigiui_slider_btn_left |
| btnRightSelector | slider right btn selector | .tigiui_slider_btn_right |
| width | image width | - |
| height | image height | - |
| sliderTimerSet | set timer for sliding | 400(ms) |
| isAutoPlay | start with auto play | false |
| playTimerSet | set timer for the play term | 1000(ms) |
| isLoop | slider on a loop (left, right directions) | false |
| callback| callback function for indicator, include current image index param (0, 1, 2, ...) | - |
* ex code

```javascript
<div id="slider">
  <ul>
    <li><img src="" alt=""></li>
    <li><img src="" alt=""></li>
    <li><img src="" alt=""></li>
    <li><img src="" alt=""></li>
  </ul>
</div>
<div>
  <button type="button" id="btn_left" class="tigiui_slider_btn_left"><</button>
  <button type="button" id="btn_play" class="tigiui_slider_btn_play">PLAY</button>
  <button type="button" id="btn_stop" class="tigiui_slider_btn_stop">STOP</button>
  <button type="button" id="btn_right" class="tigiui_slider_btn_right">></button>
</div>

<script>
tigi.ui.slider.init({
  sliderSelector : "#slider"
  , btnPlaySelector : ".tigiui_slider_btn_play"
  , btnStopSelector : ".tigiui_slider_btn_stop"
  , btnLeftSelector : ".tigiui_slider_btn_left"
  , btnRightSelector : ".tigiui_slider_btn_right"
  , width : 770
  , height : 320
  , sliderTimerSet : 400
  , isAutoPlay : true
  , playTimerSet : 1000
  , isLoop : true
  , callback : function(index) {
    console.log("current image index : " + index);
  }
});
</script>
```
