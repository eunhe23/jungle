$(function(){
    // 첫화면 셋팅버튼
    $(".btn_setting").click(function(){
        $(this).parent().hide();
        //$(".section.reservation").show();
        $(".section.reservation").slideDown();
        loadDataFn();
    });
    
    // 테스트를 위한 임시호출
    // loadDataFn()
   // function settingFn(){

    var complateData; // json테이터 담는 변수(전역변수) 
    function loadDataFn(){
        // $(".section.reservation").show();
        $.ajax({
            url: "js/data.json",
            dataType: "json",
            success: function (result) {
                // console.log(result);
                complateData = result.seatInfo;
                settingSeatFn();
            }
        })
    };
    var selectArray = []
    // 테이터 받아온 후 보여준다
    function settingSeatFn(){
        $(".section.reservation").slideDown();
        $(".section.reservation > ol > li").remove();

        $(".txt_info_number").text("");
        $(".txt_info_total").text(0);

        //  console.log(complateData.length)
        // 파싱작업
        for(var i=0; i<complateData.length; i++){
            var name = complateData[i].name;
            var price = complateData[i].price;
            var reserve = complateData[i].reserve;
        $(".section.reservation > ol").append('<li class="unit"><button data-price="'+price+'" '+reserve+'>'+name+'</button></li>')
        }

        selectArray = [];//선택좌석 index를 담는 배열
        // 좌석버튼 클릭이벤트
        var name
        var price
        $(".section.reservation .unit > button").click(function(){
            // alert($(this).text());

            $(this).toggleClass("select");
            // console.log($(this).hasClass("select"))
            if($(this).hasClass("select")){//좌석선택할경우
                // consol.log($(this).parent().index());
                selectArray.push($(this).parent().index());

            }else{//좌석 해제될 경우
                var removeIndex = selectArray.indexOf($(this).parent().index());
                selectArray.splice(removeIndex, 1);
            }
            // console.log(selectArray.length);
            name = "";//초기화를 시킨거
            price = 0;
            for(var i=0; i<selectArray.length; i++){
                // console.log(selectArray[i])
                name += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").text()+" ";
                price += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").data("price");
            }
            // console.log(price);

            $(".txt_info_number").text(name);
            $(".txt_info_total").text(price);

            
        });
    
        //완료 클릭 이벤트
        $(".btn_submit").click(function(){
            //$(".section.reservation").hide();
            //$(".section.complete").show();
            console.log(selectArray.length)
            if(selectArray.length > 0){
            $(".section.reservation").slideUp();
            $(".section.complete").slideDown();
            $(".section.complete .txt_number").text(name);
            $(".section.complete .txt_price > strong").text(price);

            }else{
                alert("자리를 선택해 주세요~!");
            }
            
        });

        $(".btn_reset").click(function(){
            $(".box_intro").slideDown();
            $(".section.complete").slideUp();
        });

    }
})