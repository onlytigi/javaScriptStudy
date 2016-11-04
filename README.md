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
| $area | slider div element | - |
| $btnPlay | slider play btn element | - |
| $btnStop | slider stop btn element | - |
| $btnLeft | slider left btn element | - |
| $btnRight | slider right btn element | - |
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
  <button type="button" id="btn_left"><</button>
  <button type="button" id="btn_play">PLAY</button>
  <button type="button" id="btn_stop">STOP</button>
  <button type="button" id="btn_right">></button>
</div>

<script>
tigi.ui.slider.init({
  $area : $("#slider")
  , width : 770
  , height : 320
  , sliderTimerSet : 400
  , isAutoPlay : true
  , playTimerSet : 1000
  , $btnPlay : $("#btn_play")
  , $btnStop : $("#btn_stop")
  , $btnLeft : $("#btn_left")
  , $btnRight : $("#btn_right")
  , isLoop : true
  , callback : function(index) {
    console.log("current image index : " + index);
  }
});
</script>
```
