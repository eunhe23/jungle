$(function(){
    $(".txt_area input").keypress(function(e){
        // console.log(e.keyCode)
        if(e.keyCode == 13 && $(this).val().length){//엔터를 누를 경우 실행
            //console.log($(this).val())/* 콘솔에나옴 */
            //console.log($(this).hasClass("mymsg"));
            //if($(this).hasClass("mymsg")){/* mymsg라는 클래스가 있는경우 실행 */}
            var _val = $(this).val();
            var _class = $(this).attr("class");
            var _time = currentTimeFn();

            $(this).val("");/* 입력된value삭제 */
            $(".chat_wrap .inner").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>')
            setTimeout(function(){/* 애니메이션 클래스는 시간차를 줘야 작동함 */
                $(".chat_wrap .inner .item").last().addClass("on");
                var _h = $(".chat_wrap .inner .item").height();/* item의 높이 값 */
                var _l = $(".chat_wrap .inner .item").length;/* item의 갯수 */
                var _mt = $(".chat_wrap .inner .item").last().css("margin-top");/* item의 margin-to값 */
                _mt = parseInt(_mt, 10);/* margin-top의 값중 px를 삭제 */
                // $(".chat_wrap .inner").scrollTop(_h*_l + _mt*(_l-1));/* 위의 알아낸 값들의 계산식을 scrollTop에 적용 */
                $(".chat_wrap .inner").stop().animate({
                    scrollTop:_h*_l + _mt*(_l-1)
                },500)
            },10)
        }
    });
});

/* 현재시간을 알아내고 값을 반환하는 함수 */
function currentTimeFn(){
    var _data = new Date();/* 현재시간객체 */
    var _hh = _data.getHours();/* 현재시 */
    var _mm = _data.getMinutes();/* 현재분 */
    var _apm;
    // console.log(_data.getHours());
    if(_hh > 12){
        /* 오후정보를 담는 변수 */
        _apm = "오후";
        _hh = _hh - 12;
    }else{
        _apm = "오전";
    }
    if(_hh < 10) _hh = "0"+_hh; 
    if(_mm < 10) _mm = "0"+_mm; 

    var _ct = _apm +" "+_hh+":"+_mm;
    return _ct;
}
