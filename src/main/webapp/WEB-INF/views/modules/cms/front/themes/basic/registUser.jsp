<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
  <title>${article.title} - ${category.name}</title>
  <meta name="decorator" content="cms_default_${site.theme}"/>
  <meta name="description" content="${article.description} ${category.description}" />
  <meta name="keywords" content="${article.keywords} ${category.keywords}" />
  <script src="${ctxStatic}/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>

  <style>
  body {
    background-color: aliceblue;
    /*text-align: center;*/
    margin: 0 auto;
    /*margin: 0;*/
    padding: 0;
    width: 100%;
    height: 100%;
  }

  input[type="button"],
  input[type="submit"],
  input[type="date"],
  input[type="text"] {
    -webkit-appearance: none;
  }

  .mainDIV {
    /* margin-top: 4em;
     margin-left: 2em;
     margin-right: 2em;*/
    font-size: 12px;
    max-width: 600px;
    min-width: 300px;
    margin: 4em auto;
    position: relative;
    background-size: 100% 100%;
  }
  .top {
    width: 100%;

    /*height: 130px;*/
  }
  .top img{
    width: 100%;

    height: 130px;
  }
  .mainDIV label {
    font-family: "微软雅黑";
    font-size: 45px;
  }

  .mainDIV input[type="text"] {
    height: 60px;
    font-size: 35px;
    width: 100%;
    border-width: 3px;
    border-top-style: outset;
    border-left-style: outset;
    /* border-top-color: gainsboro;*/
    /* border-bottom-color: gainsboro;*/
    /* border-left-color: gainsboro;*/
    border-right-color: gainsboro;
  }


  /*.gender option:nth-child(2){
      darkgray
      font-size: 35px;
      color:blue;
  }*/

  .gender select {
    height: 60px;
    font-size: 35px;
    width: 100%;
    color: darkgray;

  }

  .mainDIV input[type="date"] {
    height: 60px;
    font-size: 35px;
    width: 100%;
    border-width: 3px;
    border-top-style: outset;
    border-left-style: outset;
    /*border-top-color: gainsboro;
    border-left-color: gainsboro;*/
    border-bottom-color: gainsboro;
    border-right-color: gainsboro;
  }

  .mainDIV input[type="button"] {
    width: 100%;
    height: 65px;
    font-size: 35px;
    font-family: "微软雅黑";
    background-color: cornflowerblue;
    border: 0;
    color: white;
  }

  .box {
    margin-bottom: 2em;
    width: 100%;
  }

  .chacked img {
    width: 38%;
    height: 63px;
  }

  .chacked input[type="text"] {
    width: 59%;
    float: left;
  }

  .chacked input[type="button"] {
    font-size: 34px;
    width: 39%;
    height: 64px;
    border: 0;
    background-color: coral;
  }

  .select_box {
    height: 65px;
  }


  /*.select_box div{
      float: left;
      width: 29%;
      margin-right: 2em;
  }*/

  .province {
    float: left;
    width: 30%;
    margin-right: 2.5em;
  }

  .city {
    float: left;
    width: 30%;
    margin-right: 2.5em;
  }

  .area {
    float: left;
    width: 30%;
  }

  .select {
    font-size: 33px;
    width: 100%;
    height: 63px;
  }
</style>
</head>
<body>
<div class="row">

  <div class="container">
    <h2>用户注册</h2>

    <form method="post" action=""  id="registerForm"  name="registerForm" >
      <div class="mainDIV">
        <div class="box name">
          <label for="fname">姓名:</label>
          <input type="text" name="fname" id="fname" placeholder="请输入姓名">
        </div>
        <div class="box phone">
          <label for="lname">手机:</label>
          <input type="text" name="lname" id="lname" placeholder="请输入手机号">
        </div>

        <div class="box chacked">
          <input type="text" id="verfication_code" name="verfication_code" placeholder="输入验证码">
          <input type="button" id="" value="获取验证码"
                 onclick="getReceiveMemberCardVCode(this,event,'registerForm', 'lname', 'registUserCode')">
          <!--<img src="/lib/img/1.png" alt="">-->
        </div>
        <input type="button" name=""  onclick="toRegister()" value="提交">

      </div>
    </form>

  </div>
  <script type="text/javascript">
    function isMobil(s)
    {
      var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
      if (!patrn.exec(s)) return false
      return true
    }

    var intervalId,buttonObj;
    //发送下一条短信需要间隔的秒数
    var seconds = 60;
    function getReceiveMemberCardVCode(clickObj, evt, formId, teleName,ch_type){
      var form = document.getElementById(formId);
      var req = {
        phone: $.trim(form[teleName].value),
        type:ch_type
      }
      if(!req.phone){
        alert("请输入手机号", 1000);return;
      }
      clickObj.setAttribute("disabled", "disabled");
      clickObj.value = "正在发送，请稍候...";
      $.ajax({
        url: "/check_code/getSMsCode.do",
        type:"post",
        data:req,
        dataType:"JSON",
        success: function(res){
          if(0 == res.errno){
            clickObj.value = '验证码发送成功';
            buttonObj = clickObj;
            intervalId = setInterval("ticker()",1000);
          }else{
            alert(res.error, 1500);
            return false;
          }
        }
      });
    }
    function ticker(){
      seconds --;
      if(seconds > 55){
        //提示消息显示5秒钟
      }else if(seconds>0){
        buttonObj.value = seconds+"秒后可重新获取";
      }else{
        clearInterval(intervalId);
        buttonObj.removeAttribute("disabled");
        buttonObj.value = "获取验证码";
        seconds = 60;
        buttonObj = null;
      }
    }
  </script>

  <script>

    function registCheck(){
      //姓名
      var nameVal = $("#fname").val();
      if( nameVal == "" ){
        alert("请输入姓名");
        return false;
      }
      //手机
      var telVal = $("#lname").val();
      var isTel = isMobil(telVal);
      if(isTel==false){
        alert("请输入正确的手机号");
        return false;
      }
      //性别
      var verfication_code = $("#verfication_code").val();
      if( verfication_code == "" ){
        alert("请输入验证码");
        return false;
      }

      return true;
    }
    //注册完成方法
    function toRegister(){
      //alert("toRegister");
      if( registCheck() == false ) return;

      jQuery.ajax({
        url: "/f/cmsUser/ajaxRegistUserByPhone.do",
        type: "post",
        dataType: "json",
        cache: false,
        async: false,
        data:$('#registerForm').serialize(),
        success: function(ret){
          if(ret.errno == 0){
            alert("注册成功");
            location.href = "/f";
          }else{
            alert(ret.error);
          }
        },
        error:function(){
          alert("error");
        }
      })
    }
  </script>
</div>
</body>
</html>