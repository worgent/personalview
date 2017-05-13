/**
 * Created by worgen on 2015/11/10.
 */


var isOut = false;
function clickZixunMenu(){
    var ob = $(".js-click-zixun");
    var extend = $("#top .nav-extend-zixun");
    ob.bind("click", function(){
        //alert("extend click");
        if( extend.css("display") == "none"){
            extend.slideDown();
            ob.find(".fa-caret-down").css("display", "none");
            ob.find(".fa-caret-up").css("display", "inline-block");
        }else{
            extend.slideUp();
            ob.find(".fa-caret-up").css("display", "none");
            ob.find(".fa-caret-down").css("display", "inline-block");

        }
    });
}

function clickSearch(){
    var searchClose = $(".c-search .close");
    var searchButton = $(".navbar-right .fa-search");
    var searchPanel = $(".c-search");
    searchClose.bind("click", function(){
        console.log("searchClose click");
        searchPanel.css("display", "none");
    });

    searchButton.bind("click", function(){
        console.log("searchButton click");
        searchPanel.css("display", "block");
    });
}


function huxiuLoad(){
    document.onclick= function(){
        //alert("document onmouse down");
        var extend = $("#top .nav-extend-zixun");
        if( extend.css("display") != "none" && isOut == true){
            extend.slideUp();
            var ob = $(".js-click-zixun");
            ob.find(".fa-caret-up").css("display", "none");
            ob.find(".fa-caret-down").css("display", "inline-block");

        }
    }
    clickZixunMenu();
    clickSearch();
}



