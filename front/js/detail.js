/**
 * Created by worgen on 2015/11/20.
 */
function detail_load(){
    clickCommentReply();
}

function clickCommentReply(){
    var obReply = $(".comment .comment-info .first-line .reply");
    //var obCancel = $(".comment .comment-info .first-line .cancel");
    var obCommentPanel = $(".comment-panel");
    var replyPanel = $("#J_CommenInput");

    obReply.bind("click", function(){
        var obComment = $(this).parents(".comment");
        if( obComment.find("#J_CommenInput").length == 0 ){
            replyPanel.addClass("child-comment-input");
            if( obComment.hasClass("comment-p2") == true ){
                replyPanel.addClass("child-comment-input-p2");
            }else{
                replyPanel.removeClass("child-comment-input-p2");
            }
            obComment.append(replyPanel);
            obReply.text("回复");
            $(this).text("取消");
        }
        else{
            replyPanel.removeClass("child-comment-input");
            replyPanel.removeClass("child-comment-input-p2");
            obCommentPanel.append(replyPanel);
            $(this).text("回复");
        }

    });
    //obCancel.bind("click", function(){
    //    obCommentPanel.append(replyPanel);
    //});
    //ob.bind("mouseleave", function(){
    //    $(this).remove(replyPanel);
    //});
}