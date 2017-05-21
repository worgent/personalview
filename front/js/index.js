/**
 * Created by worgen on 2015/11/19.
 */
function index_load(){
    clickGoUp();
    navHover();
}

function clickGoUp(){
    var ob = $(".right-fixed-wrapper .up");
    ob.bind("click", function(){
        $("html,body").animate({"scrollTop":0}, 500);
    });
}

function navHover(){
    var ob = $(".menu-nav li span");
    var tag = $(".j-nav-lable");
    var nvaPanel = $(".menu-nav");
    var firstTop = 0;
    var navFirstTop = 0;
    var navCurrentTop = tag.position().top;

    var interval = 40;
    ob.bind("mouseenter", function(){
        console.info("mouserenter,"+$(this).text()+","
            +$(this).position().left+","
            +$(this).position().top
        );
        var setTop = ($(this).position().top - firstTop)+navFirstTop;
        tag.animate({"top":setTop+"px"}, 100);
    });
    nvaPanel.bind("mouseleave", function(){
        tag.animate({"top":navCurrentTop+"px"}, 100);
    });
}

function mouseScroll(){
    var nvaPanel = $(".menu-nav");
    var rightFixedWrapper = $(".right-fixed-wrapper");

    nvaPanel.bind("scroll", function(){

    });
    rightFixedWrapper.bind("scroll", function(){

    });
}