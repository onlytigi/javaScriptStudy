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

* methods

| name | description |
|---|---|
| init | init a slider |
| autoPlaySlider | play the auto slider |
| autoStopSlider | stop the auto slider |
| leftSlider | move to left |
| rightSlider | move to right |
| moveSlider | move to the index of param |

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
<div>
  <button type="button" id="btn_to_0" class="btn_index">1</button>
  <button type="button" id="btn_to_1" class="btn_index">2</button>
  <button type="button" id="btn_to_2" class="btn_index">3</button>
  <button type="button" id="btn_to_3" class="btn_index">4</button>
</div>

<script>
var slider = tigi.ui.slider.init({
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
$(".btn_index").click(function() {
  var id = $(this).attr("id");
  switch (id) {
    case "btn_to_0":
      slider.moveSlider(0);
      break;
    case "btn_to_1":
      slider.moveSlider(1);
      break;
    case "btn_to_2":
      slider.moveSlider(2);
      break;
    case "btn_to_3":
      slider.moveSlider(3);
      break;
    default:
  }
});
</script>
```
