/**
 * Created by worgen on 2015/11/19.
 */
function index_load(){
    clickGoUp();
    navHover();
    mouseScroll();
}

function clickGoUp(){
    var ob = $(".right-fixed-wrapper .up");
    ob.bind("click", function(){
        $("html,body").animate({"scrollTop":0}, 500);
    });
}

function navHover(){
    var ob = $(".menu-nav li span");
    var obCurrent = $(".menu-nav .current span");
    var tag = $(".j-nav-lable");
    var nvaPanel = $(".menu-nav");
    var firstTop = 0;
    var navFirstTop = 0;
    var navCurrentTop = tag.position().top;

    var interval = 40;
    var setTop = (obCurrent.position().top - firstTop)+navFirstTop;

    tag.css("top", setTop+"px");
    ob.bind("mouseover", function(){
        console.info("mouseover,"+$(this).text()+","
            +$(this).position().left+","
            +$(this).position().top
        );
        var setTop = ($(this).position().top - firstTop)+navFirstTop;
        tag.animate({"top":setTop+"px"}, 10);
    });
    nvaPanel.bind("mouseleave", function(){
        tag.animate({"top":navCurrentTop+"px"}, 10);
    });
}

function mouseScroll(){
    var body = $("body");
    var html = $("html");
    var nvaPanel = $(".col-left");
    var pageNav = $(".page-nav");
    var rightFixedWrapper = $(".right-fixed-wrapper");
    var topper = $(".topper");

    window.onscroll = function(){
        //console.info("body.scrollTop:"+body.scrollTop());

        if( body.scrollTop() > 0 ){
            rightFixedWrapper.css("display", "block");
        }else{
            rightFixedWrapper.css("display", "none");
        }
        //导航下底边与page导航对齐
        var navPanelBottomTop = nvaPanel.offset().top+nvaPanel.height()-nvaPanel.css("top").replace("px", "");
        var pageNavBottomTop = topper.height()-80;//pageNav.offset().top+pageNav.height();
        //console.info("bottom top:"+navPanelBottomTop+","+pageNavBottomTop);

        if( pageNavBottomTop > nvaPanel.height() && navPanelBottomTop > pageNavBottomTop ){
            nvaPanel.css("top", (pageNavBottomTop-navPanelBottomTop)+"px");
            //nvaPanel.scrollTop((pageNavBottomTop-navPanelBottomTop)+"px");
        }else{
            nvaPanel.css("scrollTop", "0px");
            //nvaPanel.scrollTop("0px");
        }
        //console.info("window nvaPanel top:"+nvaPanel.css("top").replace("px", "")+","
        //    +nvaPanel.offset().top+","
        //    +nvaPanel.height());
        //
        //console.info("pageNav top:"+pageNav.position().top + ","
        //+ pageNav.offset().top+","
        //+ pageNav.height());

        //console.info("rightFixedWrapper top:"+rightFixedWrapper.position().top);
        ////console.info("rightFixedWrapper left:"+rightFixedWrapper.position().left);
        //console.info("rightFixedWrapper offset top:"+rightFixedWrapper.offset().top);
        //console.info("rightFixedWrapper offset left:"+rightFixedWrapper.offset().left);
    }

}

function supportClick(articleId){
    var obArticle=$(".post-"+articleId);
    var obSupport = obArticle.find(".support");
    var obSupportNum = obSupport.find(".num");
    var obSupportHeart = obSupport.find("i");
    var url = getRootPath() + "/taobao/support.do";
    $.ajax({
        url: url,
        data:{
            articleID: articleId
        },
        beforeSend:function(){

        },
        success:function(ret){
            if( ret.errno != 0 ){
                alert(ret.errmsg);
            }else{
                //更新数字和状态
                obSupportHeart.addClass("active");
                obSupportNum.text(ret.supportNum);
            }
        }
    })
}