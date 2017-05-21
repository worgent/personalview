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
        var commentId = obComment.attr("id");
        commentId = commentId.replace("comment-", "");
        console.info("id-"+commentId);

        if( obComment.find("#J_CommenInput").length == 0 ){
            replyPanel.find("input[name='replyId']").val(commentId);
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
            replyPanel.find("input[name='replyId']").val("0");
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

function saveComment(){
    var replyPanel = $("#J_CommenInput");

    var replyId = replyPanel.find("input[name='replyId']").val();
    var categoryId = replyPanel.find("input[name='categoryId']").val();
    var contentId = replyPanel.find("input[name='contentId']").val();
    var title = replyPanel.find("input[name='title']").val();
    var name = replyPanel.find(".input-nickname").val();
    var email = replyPanel.find(".input-email").val();
    var site = replyPanel.find(".input-site").val();
    var content = replyPanel.find(".input-comment-content").val();
    var url = getRootPath()+"/taobao/commentSave.do";
    console.info("saveComment,"+replyId);

    //检查
    if( name == "")
    {
        alert("昵称不能为空");
        return false;
    }
    if( content == "")
    {
        alert("评论内容不能为空");
        return false;
    }
    $.ajax({
        url: url,
        type:"POST",
        data: {
            replyId : replyId,
            categoryId : categoryId,
            contentId : contentId,
            title : title,
            name : name,
            email : email,
            site : site,
            content : content
        },
        success: function(ret){
            //alert("success");
            if( ret.errno == 0 ){
                alert("留言成功");
                location.reload();
            }else{
                alert(ret.errmsg);
            }
        },
        error: function(ret){
            alert("error");

        }
    });
    return true;
}