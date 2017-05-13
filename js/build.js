define('build',function(require, exports){

    if($('#per_center').length>0){
        require.async(['per_center'], function(){});
    }

    /**
     * 公用成功失败提示配置。
     */
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'flat'
    };

    /**
     * 小屏幕不显示用户反馈
     */
    if(window.innerWidth < 1320){
        $('.go-top').hide();
        $('.min-feedback').show();
    }else{
        $('.min-feedback').hide();
        $('.go-top').show();
    }
    $(window).resize(function(){
        if(window.innerWidth < 1320){
            $('.go-top').hide();
            $('.min-feedback').show();
        }else{
            $('.min-feedback').hide();
            $('.go-top').show();
        }
    });

    /**
     * 通用弹出框
     */
    function showBox(id, title, body, footer){

        var strHtml = '<div id="'+id+'" class="modal fade" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title">'+title+'</h4>' +
            '</div>' +
            '<div class="modal-body">' + body + '</div>' +
            '<div class="modal-footer">' + footer + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        if($('#'+ id).length > 0){
            $('#' + id).remove();

        }
        $('body').append(strHtml);
        $('#'+id+'').modal();
    };


    /**
     * 通用弹框2
     */
    function showBoxContent(id, title,body){
        var strHtml = '<div id="'+id+'" class="modal fade" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-body modal-body-alert"><div class="modal-alert-title">'+ title +'</div> <i class="icon icon-alert-close" data-dismiss="modal"></i>' + body + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        if($('#'+ id).length > 0){
            $('#' + id).remove();

        }
        $('body').append(strHtml);
        $('#'+id+'').modal();
    }

    /**
     * 关闭文集提示
     */
    $('body').on('click','.js-corpus-close',function(){
        $('.corpus-prompt').remove();
        localStorage.setItem('corpus_prompt',true);
    });

    if(localStorage.getItem('corpus_prompt')){
        $('.corpus-prompt').remove();
    }

    ///**
    // * 改版前通用登录
    // */
    //$('body').on('click','.moder-lgn-box',function(){
    //    var t = $(this);
    //    if(!t.hasClass('disabled')){
    //        t.addClass('disabled');
    //        var boxHtml = '<div class="lgn-wrap"><div class="form-horizontal lgn-box">'
    //                +'<div class="form-group"><div class="col-sm-12"><input class="form-control" type="text" id="lgn_username" placeholder="手机号 / 邮箱 / 虎嗅账号"></div><div class="error-tip"></div></div>'
    //                +'<div class="form-group"><div class="col-sm-12"><input class="form-control" type="password" id="lgn_pwd" placeholder="密码"></div><div class="error-tip"></div></div>'
    //                +'<div class="form-group forget-pwd"><div class="col-sm-12 text-right"><a href="/user/find_passwd" target="_blank">忘记密码？</a></div></div>'
    //                +'<div class="form-group group-btm"><div class="col-sm-12"><button type="button" class="btn btn-blue js-moder-lgnbtn">登录</button><div class="clearfix box-btm"><span class="pull-right btn-reg">没有帐号?<a href="http://www.huxiu.com/user/register" target="_blank">立即注册</a></span><div class="checkbox-wrap"><label><input type="checkbox" id="autologin" checked="checked" />2周内自动登录</label></div></div>'
    //                +'<h4 class="t-h4">第三方登录</h4>'
    //                +'</div></div>'
    //                +'</div></div>',
    //
    //            btnWrap = '<div class="clearfix login-three lgn-three-btnWrap"><a class="btn-weixin" href="/user/auth_login/weixin.html"><i></i><span>微信登录</span></a><a class="btn-sina" href="/user/auth_login/weibo.html"><i></i><span>微博登录</span></a><a class="btn-qq" href="/user/auth_login/qq.html"><i></i><span>QQ登录</span></a></div>';
    //        showBox('login_model','用户登录',boxHtml,btnWrap);
    //        t.removeClass('disabled');
    //
    //        //绑定回车键
    //        $('.modal').keydown(function(event){
    //            if($('.lgn-moder-wrap').hasClass('in') == true){
    //                if(event.keyCode==13){
    //                    $('.js-moder-lgnbtn').trigger('click');
    //                }
    //            }
    //        });
    //    }
    //});
    /**
     * 确认登录
     */

    $('body').on('click','.js-moder-lgnbtn',function(){
        var t = $(this),
            random = parseInt(Math.random()*100000),
            url = '/user/logindo',
            username = typeof($('#lgn_username').val())=='undefined'?'':$('#lgn_username').val(),
            password = typeof($('#lgn_pwd').val())=='undefined'?'':$('#lgn_pwd').val(),
            autologin = $('#autologin').prop('checked')==true?'1':'0',
            data = {
                'is_ajax':'1' ,
                'random':random ,
                'huxiu_hash_code':huxiu_hash_code,
                'username':username,
                'password':password,
                'autologin':autologin
            };
        if(data.username == ''){
            Messenger().post({
                message:'帐号不能为空',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        if(data.password == ''){
            Messenger().post({
                message:'密码不能为空',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }

        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){

                    if(data.result=='1'){
                        Messenger().post({
                            message: data.msg,
                            type: 'success',
                            showCloseButton: true
                        });
                        window.location.reload();
                    }else{
                        Messenger().post({
                            message: data.msg,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');
                },
                error:function(e){
                    t.removeClass('disabled');
                    Messenger().post({
                        message: data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            });
        }
    });

    /**
     * 退出
     */
    $('body').on('click','.js-btn-logout',function(){
        var t = $(this),
            random = parseInt(Math.random()*100000),
            url = '/user/logout',
            data = {
                'is_ajax':'1',
                'random':random,
                'huxiu_hash_code':huxiu_hash_code
            };
        if(!t.hasClass('disabled')){

            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result=='1'){
                        Messenger().post({
                            message: data.msg,
                            type: 'success',
                            showCloseButton: true
                        });
                        if(!(typeof(page)=="undefined")){
                            window.location.href = '/'
                        }else{
                            window.location.reload();
                        }
                    }else{
                        Messenger().post({
                            message: data.msg
                            ,type: 'error'
                            ,showCloseButton: true
                        });
                    }

                },
                error:function(e){
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            });
        }
    });




    /**
     * 回到顶部
     */
    if($('.js-go-top').length > 0){
        $('.js-go-top').click(function(){
            $('body, html').animate({'scrollTop':0}, 500);
        });
        var left = (window.innerWidth/2)+587,
            left2 = (window.innerWidth/2)+77;

        $('.js-go-top').css({'left':left+'px'});
        $('.feedback-box').css({'left':left2+'px'});
        $('.go-feedback').css({'left':left+'px'});
        $(window).scroll(function(){
            if(window.innerWidth < 1320){
                $('.go-top').hide();
                $('.min-feedback').show();
            }else{
                var h1 = $('.js-go-top').offset().top;
                var h2 = $('.footer').offset().top;
                var left = (window.innerWidth/2)+587,
                    left2 = (window.innerWidth/2)+77;
                if(($('.js-go-top').offset().top) > $(window).height()){
                    $('.js-go-top').fadeIn(500);
                    if(h1>h2){
                        var bottom = h1-h2+140+'px';
                        $('.go-top').css({'bottom': bottom});
                    }else{
                        $('.js-go-top').css({'bottom': '140px'});
                    }
                }else{
                    $('.js-go-top').fadeOut(500);
                }
                $('.js-go-top').css({'left':left+'px'});
                $('.feedback-box').css({'left':left2+'px'});
                $('.go-feedback').css({'left':left+'px'});
            }

        });
    }
    /**
     *显示栏目
     */
    var isOut=true;
    /**
     * 用于用户反馈
     * @type {boolean}
     */
    var is_feedback = true;
    $('body').on('click','.js-show-column',function(){

        if($('.header-column-zx').css('display') == 'none'){
            $('.header-column-zx').slideDown();
            $(this).toggleClass('dropup');
        }else{
            $('.header-column-zx').slideUp();
        }
    });
    /**
     * 资讯菜单添加解释
     */
    $('body').on('mouseover','.header-column-zx ul li a',function(){
        $('.explain'+ $(this).attr('data-link')).removeClass('hide');
    });
    $('body').on('mouseout','.header-column-zx ul li a',function(){
        $('.explain'+ $(this).attr('data-link')).addClass('hide');
    });
    /**
     * 用户菜单
     */
    $('body').on('click','.js-show-user',function(){

        if($('.header-column-user').css('display') == 'none'){
            $('.header-column-user').slideDown();
            $(this).toggleClass('dropup');
        }else{
            $('.header-column-user').slideUp();
        }
    });
    /**
     * 活动菜单
     */
    $('body').on('click','.js-show-activity',function(){

        if($('.header-column-activity').css('display') == 'none'){
            $('.header-column-activity').slideDown();
            $(this).toggleClass('dropup');
        }else{
            $('.header-column-activity').slideUp();
        }
    });



    document.onmousedown = function(){
        if($(".header-column-zx").css('display')!="none" && isOut){
            $('.header-column-zx').slideUp();
            $('.js-show-column').removeClass('dropup');
        }
        if($(".header-column-user").css('display')!="none" && isOut){
            $('.header-column-user').slideUp();
            $('.js-show-user').removeClass('dropup');
        }
        if($(".header-column-activity").css('display')!="none" && isOut){
            $('.header-column-activity').slideUp();
            $('.js-show-activity').removeClass('dropup');
        }
        /**
         * 用于用户反馈
         */
        if(is_feedback){
            $('.js-modal-backdrop').hide();
            $('.feedback-box').hide();
        }
        /**
         * 用于打赏
         */
        if($('.js-qr-ds').length>0){
            if(isOut){
                $('.js-qr-ds').css({
                    opacity:'1',
                    height: '48px',
                    overflow: 'hidden'
                }).show();
                $('.js-qr-img').removeClass('info-true');
                $('.js-qr-img').addClass('hide');
                $('.js-qr-img').addClass('info-false');
                setTimeout(function(){
                    $('.js-qr-ds').addClass('transition');
                },600);

            }
        }
    };

    $('body').on('mouseover','.feedback-box',function(){
        is_feedback = false;
    });
    $('body').on('mouseout','.feedback-box',function(){
        is_feedback = true;
    });

    /**
     * 栏目
     */

    /**
     * 随机数
     */
    var random = function(n){
        return Math.floor(Math.random()*n)
    };
    /**
     * 显示搜索页面
     */
    $('body').on('click','.js-show-search-box',function(){

        if($('#search-box').hasClass('search-box-last')){
            if($('.search-box').hasClass("active")){
                $('#history').addClass('hide');
                $('.search-box').removeClass('active');
                $('.search-box').addClass('hide');
                $('.search-content').removeClass('overlay-dialog-animate');
                $(document.body).removeClass("modal-open");
                $(document.body).removeAttr("style");
            }else{
                if(!!$.cookie('huxiu_search_history')){
                    var search_history = $.cookie('huxiu_search_history').split(','); // 读取 cookie
                    if(search_history.length > 0){
                        var history_html = '';
                        $.each(search_history,function(index,_history){
                            history_html += '<li class="transition"><a href="/search.html?s='+ _history +'">'+ _history +'</a></li>'
                        });
                        $('#history').removeClass('hide');
                        $('#history_ul').empty();
                        $('#history_ul').append(history_html);
                    }
                }
                $('.search-box').addClass('active');
                $('.search-content').addClass('overlay-dialog-animate');
                $('.search-box').removeClass('hide');
                $(document.body).css({'padding-right':' 17px'});
            }
        }else{
            if($('.search-box').hasClass("active")){
                $('#history').addClass('hide');
                $('.search-box').removeClass('active');
                $('.search-content').removeClass('overlay-dialog-animate');
                $(document.body).removeClass("modal-open");
                $(document.body).removeAttr("style");
            }else{
                if(!!$.cookie('huxiu_search_history')){
                    var search_history = $.cookie('huxiu_search_history').split(','); // 读取 cookie
                    if(search_history.length > 0){
                        var history_html = '';
                        $.each(search_history,function(index,_history){
                            history_html += '<li class="transition"><a href="/search.html?s='+ _history +'">'+ _history +'</a></li>'
                        });
                        $('#history').removeClass('hide');
                        $('#history_ul').empty();
                        $('#history_ul').append(history_html);
                    }
                }
                $('.search-box').addClass('active');
                $('.search-content').addClass('overlay-dialog-animate');
                $(document.body).addClass('modal-open');
                $(document.body).css({'padding-right':' 17px'});
            }
        }
    });

    /**
     * 新版登录注册页面
     */
    function tab_switch(){
        /**
         * 初始化展示页
         */
        $('.ordinary-login ul li:first-child').addClass('active');
        $('.ordinary-login ul li:last-child').removeClass('active');
    };
    var embed_captcha; //滑动验证;
    if($('.reg_gt_guide-box').length>0){
        embed_captcha = new window.Geetest({
            gt: 'a5a3b6cdb1b821dd0e3033efa7ebc2e9',
            product: ''
        }).appendTo('.reg_gt_guide-box');
    }

    $('body').on('click','.moder-lgn-box',function(){

        var html = '';

        if($('.login-warp').length == 0){
            var t = $(this),
                url = '/user_action/login',
                data = {
                    huxiu_hash_code:huxiu_hash_code
                };
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result=='1'){
                        $('#login-reg-warp').append(data.data);
                        $('.login-warp').addClass('active');
                        $('.login-box').addClass('overlay-dialog-animate');
                        $(document.body).addClass('modal-open');
                        $(document.body).css({'padding-right':' 17px'});
                        if(t.attr('data-type') == 'reg'){

                            $('.ordinary-login ul li:last-child').trigger('click');
                        };
                    }
                },
                error:function(e){
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            });
        }

        if($('.login-warp').hasClass('active')){
            $('.login-warp').removeClass('active');
            $('.login-box').removeClass('overlay-dialog-animate');
            $(document.body).removeClass("modal-open");
            $(document.body).css({'padding-right':'0'});
        }else{
            $('.login-warp').addClass('active');
            $('.login-box').addClass('overlay-dialog-animate');
            $(document.body).addClass('modal-open');
            $(document.body).css({'padding-right':' 17px'});
        }
    });

    /**
     * 注册校验手机号
     */
    $(document).on('input propertychange','.regphone', function() {
        if($('.regphone').val() == '' || $('.regphone').val() == undefined){
            $('.input-code').slideUp();
        }else{
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(myreg.test($(".regphone").val())){
                $('.input-code').slideDown();
            }else{
                $('.input-code').slideUp();
            }
        }
        $('.regphone').removeClass('success');
        $('.error-msg').html('').addClass('hide');
    });

    /**
     *校验手机号是否可用注册
     */
    $(document).on('blur','.regphone',function(){

        if($(".regphone").hasClass('success')){
            return false;
        }

        var t = $(this);
        if ($(".regphone").val() == "") {
            Messenger().post({
                message: '手机号不能为空'
                ,type: 'error'
                ,showCloseButton: true
            });
            return false;
        }
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test($(".regphone").val())){
            $('.error-msg').html('请输入正确的手机号');
            $('.error-msg').removeClass('hide');
            return false;
        }else{

            var url = '/user/check_reg_phone',
                data = {
                    is_ajax:'1',
                    huxiu_hash_code:huxiu_hash_code,
                    regphone:$('.regphone').val(),
                    hx_auth_token:$('#hx_auth_token').val()
                };
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result=='1'){
                        $(".regphone").addClass('success')
                        Messenger().post({
                            message: data.msg,
                            type: 'success',
                            showCloseButton: true
                        });
                        $('.js-ver-code').attr('disabled',false);
                    }else{
                        Messenger().post({
                            message: data.msg
                            ,type: 'error'
                            ,showCloseButton: true
                        });
                    }
                },
                error:function(e){
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            });
        }
    });
    /**
     * 校验 验证码是否正确；
     * @type {number}
     */
    $('body').on('blur','#captchaphone',function(){
        var t = $(this),
            url = '/user/check_mobile_captcha',
            data = {
                is_ajax:1,
                huxiu_hash_code:huxiu_hash_code,
                regphone:$('.regphone').val(),
                auth_token:$('#auth_token').val(),
                captcha:$('#captchaphone').val()

            };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result=='1'){
                    $('.js-ver-code').removeClass('has-error');
                }
            },
            error:function(e){
                Messenger().post({
                    message: data.msg
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });
    });
    /**
     * 校验昵称是否正确
     */
    $('body').on('blur','#username',function(){
        var t = $(this),
            url = '/user/check_reg_username',
            data = {
                is_ajax:1,
                huxiu_hash_code:huxiu_hash_code,
                username:$('#username').val(),
                auth_token:$('#auth_token').val(),
                captcha:$('#captchaphone').val(),
                hx_auth_token:$('#hx_auth_token').val()
            };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result=='1'){
                    Messenger().post({
                        message:'昵称'+data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                }else{
                    Messenger().post({
                        message:'昵称'+data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: data.msg
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });
    })
    var delayTime = 60;
    function delayOpen(t) {
        var t = $('.js-ver-code');
        if(delayTime > 1) {
            delayTime--;
            t.html(delayTime+'秒后重新发送...');
            t.css({'font-size':'12px','padding':'0'});
            t.addClass('disabled');
            setTimeout(function(){delayOpen()}, 1000);
        } else {
            t.removeClass('disabled');
            t.html('点击获取');
            t.css({'font-size':'16px'});
            delayTime = 60;
            return false;
        }
    }
    /**
     * 邮箱手机获取验证码
     */
    $('body').on('click','.js-ver-code',function(){

        var t = $(this),
            url = '/user/send_mobile_captcha',
            data = {
                'is_ajax':1,
                'huxiu_hash_code':huxiu_hash_code,
                'regphone':$('.regphone').val(),
                'auth_token':$('#auth_token').val(),
                'geetest_challenge':$('.geetest_challenge').val(),
                'geetest_validate':$('.geetest_validate').val(),
                'geetest_seccode':$('.geetest_seccode').val()
            };
        if(!!(t.attr('data-type'))){
            if(t.attr('data-type') == 'back-pwd'){
                url = '/user/send_email_captcha';
                data.authkey = $('#authkey').val();
                console.log(data,url)
            }
        }
        if(t.attr('data-type') == '' || t.attr('data-type') == undefined){
            if($('.geetest_challenge').val() == ''){
                Messenger().post({
                    message: '请滑动滑块完成验证',
                    type: 'error',
                    showCloseButton: true
                });
                return false;
            }
        }

        if(!t.hasClass('disabled')){
            delayTime = 60;
            delayOpen();
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result=='1'){

                        Messenger().post({
                            message: data.msg,
                            type: 'success',
                            showCloseButton: true
                        });
                        if(t.attr('data-type') == 'back-pwd'){
                            $('.email-prompt').removeClass('hide');
                        }
                    }else{
                        Messenger().post({
                            message: data.msg,
                            type: 'error',
                            showCloseButton: true
                        });
                    }

                },
                error:function(e){
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            });
        }
    });


    /**
     * 注册提交接口
     */
    $('body').on('click','.js-register-submit',function(){
        var t = $(this),
            url = '/user/mobile_register',
            data = {
                'is_ajax':1,
                'huxiu_hash_code':huxiu_hash_code,
                'regphone':$('.regphone').val(),
                'captcha':$('#captchaphone').val(),
                'username':$('#username').val(),
                'password':$('#password').val(),
                'hx_auth_token':$('#hx_auth_token').val(),
                'geetest_challenge':$('.geetest_challenge').val(),
                'geetest_validate':$('.geetest_validate').val(),
                'geetest_seccode':$('.geetest_seccode').val()
            };
        if($('#step').length>0){
            data.step = $('#step').val();
        }
        if(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test($('.regphone').val())){

        }else{
            $('.error-msg').html('请输入正确的手机号').removeClass('hide');
            return false;
        }
        if($('#username').val() == '' || $('#username').val() == null){
            $('.error-msg').html('请输入昵称').removeClass('hide');
            return false;
        }
        if($('#password').val() == '' || $('#password').val() == null){
            $('.error-msg').html('请输入密码').removeClass('hide');
            return false;
        }

        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result=='1'){
                    Messenger().post({
                        message: data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                    location.reload();
                }else{
                    embed_captcha.refresh();
                    Messenger().post({
                        message: data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: data.msg
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });
    });

    /**
     * 登录和注册切换
     */
    $('body').on('click','.tab-box li',function(){
        var t = $(this);
        if(t.hasClass('active')){
            return false;
        }
        $('.tab-box li').removeClass('active');
        t.addClass('active');
        $('.login').toggleClass('hide');
        $('.register').toggleClass('hide');
        if($('.gt_input').length == 0){
            //setTimeout(function(){
                embed_captcha = new window.Geetest({
                    gt: 'a5a3b6cdb1b821dd0e3033efa7ebc2e9',
                    product: ''
                }).appendTo('.gt_guide-box');
            //},00);
        }
    });
    /**
     * 登录
     */
    $('body').on('click','.js-login-submit',function(){
        var url = '',
            data = {

            };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result=='1'){
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                    window.location.reload();
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }

            },
            error:function(e){
                Messenger().post({
                    message: data.msg
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });

    });
    /**
     * 取消错误提示；
     */
    $('body').on('focus','.login input',function(){
        //$('.error-msg').removeClass('hide');
    });

    /**
     * 清空搜索历史
     */
    $('body').on('click','.js-empty-history',function(){
        $('#history').addClass('hide');
        $.cookie('huxiu_search_history', '', { expires: -1 }); // 删除 cookie
    });
    /**
     * 打赏按钮
     */
    $('body').on('click','.js-qr-ds',function(){
        $(this).css({
            opacity:'0',
            height: '0',
            overflow: 'hidden'
        }).hide().animate(300,function(){
            $(this).css({
                display:'none'
            })
        });
        $('.js-qr-img').removeClass('hide');
        $('.js-qr-img').addClass('info-true');
    });
    /**
     * 展开关闭点评
     */
    $('body').on('click','.js-show-hide-dp-box',function(){
        var t = $(this);
        if(t.attr('data-buttom') == 'true'){
            $('.span-mark-article-pl').attr('data-show','false');
            $('.span-mark-article-pl').html('展开');
            t.parents('.dp-box').find('.dl-user-list').slideDown();
            t.parents('.dp-box').find('.dp-list-box').hide();
        }else{
            if(t.attr('data-type') == 'dl-user'){
                t.parent('.dp-box').find('.span-mark-article-pl').html('收起');
                t.parent('.dp-box').find('.span-mark-article-pl').attr('data-show','true');
                t.parent('.dp-box').find('.dl-user-list').hide();
                t.parent('.dp-box').find('.dp-list-box').slideDown();
            }else{
                if(t.attr('data-show') == 'false'){
                    t.html('收起');
                    t.parent('.dp-box').find('.dl-user-list').hide();
                    t.parent('.dp-box').find('.dp-list-box').slideDown();
                    t.attr('data-show','true');
                }else{
                    t.html('展开');
                    t.parents('.dp-box').find('.dl-user-list').slideDown();
                    t.parents('.dp-box').find('.dp-list-box').hide();
                    t.attr('data-show','false');
                }
            }
        }
    });

    /**
     * 文章内容页微信分享显示隐藏
     */
    $(document).on('mouseenter','.article-left-btn-group .weixin',function(){

        var t = $(this);

        if(!$('.weixin-Qr-code').find('img').attr('src')){
            var t = $(this),
                url = '/action/weixin_qr',
                data = {
                    huxiu_hash_code:huxiu_hash_code,
                    id: aid,
                    type:'article',
                    f: t.attr('data-f')
                };
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                beforeSend:function(XMLHttpRequest){
                    $('.weixin-Qr-code').find('img').attr('src','/static_2015/img/loading.gif');
                },
                success: function(data){
                    if(data.result == 1){
                        $('.weixin-Qr-code').find('img').attr('src',data.weixin_qr);
                        ga('send', 'event', '第三方分享', '文章页', '朋友圈');
                    }
                },
                error:function(e){

                }
            });
        }else{
            ga('send', 'event', '第三方分享', '文章页', '朋友圈');
        }
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $('.weixin-Qr-code').stop().css({'opacity':'0','margin-left':'80px'}).show().animate({
                'opacity':'1',
                'margin-left':'70px'
            },300)
        }
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            app.stop().css({'opacity':'0','margin-top':'-175px'}).show().animate({
                'opacity':'1',
                'margin-top':'-165px'
            },300)
        }


    });
    $(document).on('mouseleave','.article-left-btn-group .weixin',function(){
        var t = $(this);
        $('.weixin-Qr-code').stop().animate({
            'opacity':'0',
            'margin-left':'80px'
        },400,function(){$('.weixin-Qr-code').hide();})
        t.removeClass('disabled');
    });

    $(document).on('mouseenter','.footer-icon-list .Qr-code-footer',function(){
        var t = $(this),
            app = t.find('.app-qrcode');
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            app.stop().css({'opacity':'0','margin-top':'-150px'}).show().animate({
                'opacity':'1',
                'margin-top':'-140px'
            },300)
        }
    });
    $(document).on('mouseleave','.footer-icon-list .Qr-code-footer',function(){
        var t = $(this),
            app = t.find('.app-qrcode');
        app.stop().animate({
            'opacity':'0',
            'margin-top':'-150px'
        },400,function(){app.hide();})
        t.removeClass('disabled');
    });

    $(document).on('mouseenter','.js-icon-moments',function(){
        var t = $(this),
            app = t.parent('.qr-moments-box').find('.qr-moments');

        if(!app.find('img').attr('src')){
            var t = $(this),
                url = '/action/weixin_qr',
                data = {
                    huxiu_hash_code:huxiu_hash_code,
                    id: t.attr('data-aid'),
                    type:'article',
                    f: t.attr('data-f')
                };
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                beforeSend:function(XMLHttpRequest){
                    app.find('img').attr('src','/static_2015/img/loading.gif');
                },
                success: function(data){
                    if(data.result == 1){
                        app.find('img').attr('src',data.weixin_qr);
                    }
                },
                error:function(e){

                }
            });
        }

        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            app.stop().css({'opacity':'0','margin-top':'-175px'}).show().animate({
                'opacity':'1',
                'margin-top':'-165px'
            },300)
        }

        if(t.attr('data-location') == 'index'){
            ga('send', 'event', '第三方分享', '首页', '朋友圈');
        }else if(t.attr('data-location') == 'column'){
            ga('send', 'event', '第三方分享', '栏目页', '朋友圈');
        }

    });
    $(document).on('mouseleave','.js-icon-moments',function(){
        var t = $(this),
            app = t.parent('.qr-moments-box').find('.qr-moments');
        app.stop().animate({
            'opacity':'0',
            'margin-top':'-175px'
        },400,function(){app.hide();});
        t.removeClass('disabled');
    });

    /**
     * 分享微博QQ空间
     */
    $('body').on('click','.js-share-article',function(){
        var t = $(this),des,aid = t.attr('aid'),pid = t.attr('pid'),url = '/action/share';
        if(t.hasClass('js-weibo')){
            des = 'hxs_tsina';
            if(t.attr('data-location') == 'article'){
                ga('send', 'event', '第三方分享', '文章页', '微博');
            }else if(t.attr('data-location') == 'index'){
                ga('send', 'event', '第三方分享', '首页', '微博');
            }else  if(t.attr('data-location') == 'index'){
                ga('send', 'event', '第三方分享', '栏目页', '微博');
            }
        }else if(t.hasClass('js-qzone')){
            des = 'hxs_qzone';

            if(t.attr('data-location') == 'article'){
                ga('send', 'event', '第三方分享', '文章页', 'QQ空间');
            }else if(t.attr('data-location') == 'index'){
                ga('send', 'event', '第三方分享', '首页', 'QQ空间');
            }else  if(t.attr('data-location') == 'index'){
                ga('send', 'event', '第三方分享', '栏目页', 'QQ空间');
            }
        }
        window.open(url+'?huxiu_hash_code='+huxiu_hash_code+'&aid='+aid+'&pid='+pid+'&des='+des+'&f='+t.attr('data-f'));
    });
    /**
     * 标签页面按字母按钮
     */
    $('body').on('click','.js-search-letter-btn',function(){
        var t = $(this);
        $(this).toggleClass('dropup');
        $(this).toggleClass('active');
        if(t.attr('data-show-box') == 'true'){
            t.attr('data-show-box','false');
            t.css({'border-bottom-color':'#f0f0f0'});
            t.animate({
                'height':'58px'
            },600);
            setTimeout(function(){
                $('.search-letter-box').slideUp();
            },100);
        }else{
            $('.search-letter-box').slideDown();
            t.css({'border-bottom-color':'#fff'});
            t.attr('data-show-box','true');
            t.animate({
                'height':'79px'
            },500);

        }
    });

    /**
     * 写点评
     */
    $('body').on('click','.js-add-dp-box',function(){
        $('.dp-article-box').slideUp();
        $('.hu-pl-box').slideUp();

        //删除回复框的id;
        if($('#saytext_reply').length>0){
            $('.pl-box-wrap textarea').attr('id','');
            $('.pl-box-wrap textarea').attr('name','');
        };
        if($(this).parent('.pl-box-btm').find('.dp-article-box').css('display') == 'none'){
            $(this).parent('.pl-box-btm').find('.dp-article-box').slideDown();
            var t = $(this).parent('.pl-box-btm').find('.dp-article-box').find('textarea');
            t.attr('id','saytext_reply');
            t.attr('name','saytext_reply');
        }else{
            $(this).parent('.pl-box-btm').find('.dp-article-box').slideUp();
        }

    });

    /**
     * 过滤点评
     */
    function dpFilterRep(t){
        t = t.replace(/’<q>‘/g, '');
        t = t.replace(/’<\/q>‘/g, '');
        return t;
    }

    /**
     * 回复评论
     */

    $('body').on('click','.js-hf-article-pl',function(){

        $('.dp-article-box').slideUp();
        $('.hu-pl-box').slideUp();
        //删除回复框的id;
        if($('#saytext_reply').length>0){
            $('.pl-box-wrap  textarea').attr('id','');
            $('.pl-box-wrap textarea').attr('name','');
        };


        if($(this).parent('.one-pl-content').find('.hu-pl-box').css('display') == 'none'){
            $(this).parent('.one-pl-content').find('.hu-pl-box').slideDown();
            var t = $(this).parent('.one-pl-content').find('.hu-pl-box').find('textarea');
            t.attr('id','saytext_reply');
            t.attr('name','saytext_reply');
            var dpName = $(this).parent('.one-pl-content').find('.content').find('.name').eq(0).text(),
                dpCtt = '// @'+dpName+' ：'+$(this).parent('.one-pl-content').find('.author-content').text();
            t.data({'dpData':'<q>'+dpFilterRep(dpCtt)+'</q>'}).val('回复 @'+ dpName +' ：');
        }else{
            $(this).parent('.one-pl-content').find('.hu-pl-box').slideUp();
        }



    });

    /**
     * 收起
     */
    $('body').on('click','.js-search-letter-close',function(){

        var t = $('.search-letter-btn');
        t.attr('data-show-box','false');
        t.animate({
            'height':'58px'
        },600);
        t.css({'border-bottom-color':'#f0f0f0'});
        setTimeout(function(){
            $('.search-letter-box').slideUp();
            t.removeClass('active');
        },100);

    });

    /**
     * 标签文章展开收起
     */
    $('body').on('click','.js-sea-more',function(){
        if($(this).hasClass('active')){
            $('.tag-content-all').slideDown();
            $('.tag-content-local').hide();
            $(this).html('收起<span class="caret"></span>');

        }else{
            $('.tag-content-all').hide();
            $('.tag-content-local').slideDown();
            $(this).html('更多<span class="caret"></span>')
        }
    });

    /**
     * 显示隐藏用户反馈
     */
    $('body').on('click','.js-show-feedback-box',function(){
        $('.js-modal-backdrop').show();
        $('.feedback-box').show();
    });
    $('body').on('click','.js-feedback-close',function(){
        $('.js-modal-backdrop').hide();
        $('.feedback-box').hide();
    });
    /**
     * 用户反馈提交
     */
    $('body').on('click','.js-feedback-submit',function(){
        if($('#content').val().length == 0){
            $('.will-choose-error').show();
            $('.will-choose-error').html("请输入反馈信息");
            return false;
        }
        var t = $(this),
            url = '/v2_action/feedback',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                content:$('#content').val(),
                contact:$('#contact').val()
            };
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            beforeSend:function(XMLHttpRequest){
                t.html('正在提交');
                t.removeClass('js-feedback-submit');
            },
            success: function(data){
                if(data.result == 1){
                    $('#content').val('');
                    $('#contact').val('');
                    var _href = document.location.href;
                    if(_href.indexOf('article')>=0){
                        _hmt.push(['_trackEvent', '用户反馈-文章页', '点击', '用户反馈成功']);
                    }else if(_href.indexOf('com/1.html')>=0){
                        _hmt.push(['_trackEvent', '用户反馈-栏目页', '点击', '用户反馈成功'])
                    }else{
                        _hmt.push(['_trackEvent', '用户反馈-首页', '点击', '用户反馈成功']);
                    };
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                    $('.js-feedback-close').trigger('click');
                    t.removeClass('disabled');
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                    t.removeClass('disabled');
                }
                t.html('提交');
                t.addClass('js-feedback-submit');
            },
            error:function(e){

            }
        });
    });

    /**
     * 首页/栏目页加载更多
     */
    $('body').on('click','.js-get-mod-more-list',function(){
        var t = $(this),
            url = '/v2_action/article_list',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                page: parseInt(t.attr('data-cur_page'))+1,
                catid:t.attr('data-catid')
            };

        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            beforeSend:function(XMLHttpRequest){
                //var html = '<div id="loading">正在加载...</div>'
                t.html('正在加载...');
                t.removeClass('js-get-mod-more-list');
            },
            success: function(data){
                if(data.result == 1){
                    $('.mod-info-flow').append(data.data);
                    t.attr('data-cur_page',parseInt(t.attr('data-cur_page'))+1);
                    $('#loading').remove();

                    $("img.lazy").lazyload({placeholder:"/static_2015/img/bg.png",effect:"fadeIn",threshold:1});
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                }
                if(parseInt(t.attr('data-cur_page'))+1 == data.total_page){
                    t.remove();
                }
                t.html('点击加载更多');
                t.addClass('js-get-mod-more-list');
            },
            error:function(e){

            }
        });
    });


    /**
     * 输入框自适应高度
     */
    if($('#saytext').length > 0){

        $('.pl-form-box textarea').autoResize({
            onResize : function() {
                $(this).css({opacity:0.8});
            },
            animateCallback : function() {
                $(this).css({opacity:1});
            },
            animateDuration : 300,
            extraSpace : 30
        });
    }
    $("img.lazy").lazyload({placeholder:"/static_2015/img/bg.png",effect:"fadeIn",threshold:1});
    /**
     * 二维码打赏
     */
    $('body').on('mouseover','.article-zfb-wx-box ul li',function(){
        var t = '';
        if($(this).find('.icon-zhifb').length > 0){
            t = $(this).find('.zfbdashang-wrap');
        }else if($(this).find('.icon-weix').length > 0){
            t = $(this).find('.wxdashang-wrap');
        };
        if(!!t){
            t.stop().css({'opacity':'0','margin-top':'-190px'}).show().animate({
                'opacity':'1',
                'margin-top':'-180px'
            },300)
        };
        isOut = false;
    });
    $('body').on('mouseout','.article-zfb-wx-box ul li',function(){
        var t = '';
        if($(this).find('.icon-zhifb').length > 0){
            t = $(this).find('.zfbdashang-wrap');
        }else if($(this).find('.icon-weix').length > 0){
            t = $(this).find('.wxdashang-wrap');
        };
        if(!!t){
            t.stop().animate({
                'opacity':'0',
                'margin-top':'-180px'
            },400,function(){t.hide();})
        }
        isOut = true;
    });


    /**
     * 内容页添加评论输入框错误动态
     */
    function errorAn(boxWrap){
        boxWrap.find('textarea').css({'background-color':'#fdf4eb'});
        boxWrap.css({'position':'relative'}).stop(true,true)
            .animate({'right':'10px'},100)
            .animate({'right':'-10px'},100)
            .animate({'right':'7px'},90)
            .animate({'right':'-7px'},90)
            .animate({'right':'4px'},80)
            .animate({'right':'-4px'},80)
            .animate({'right':'0'},70,function(){
                boxWrap.find('textarea').css({'background-color':'#fff'});
            });
    };
    /**
     * 正确评论输出动态
     */
    function boxAnSuccess(btnWrap,boxWrap, message){
        var newBtnWrap = '<div id="new_msg_wrap" style="position:absolute;width:100%;height:100%;right:0;padding:5px;background:#b4ffc7;border-radius:5px;overflow:hidden;">'+message+'</div>';
        btnWrap.css({'position':'relative'}).append(newBtnWrap);
        $('#new_msg_wrap').animate({
            'width':'0',
            'height':'0',
            'bottom':'0'
        },500,function(){
            $(this).animate({'bottom':'-80','opacity':'0'},200,function(){
                $('#new_msg_wrap').remove();
                boxWrap.eq(0).stop(true,true).animate({'height':'100%','opacity':'1'},600);
            })
        })
        setTimeout(function(){
            $('#new_msg_wrap').remove();
        },500);
    }
    $('body').on('click','.js-article-pl',function(){
        var t = $(this),
            random = parseInt(Math.random()*100000),
            url = '/action/comment',
            message = $('#saytext').val(),
            dataPost = {
                'is_ajax':'1',
                'random':random,
                'huxiu_hash_code':huxiu_hash_code,
                'aid':aid,
                'message':encodeURI(message)
            };
        if(message==''||message==null){
            errorAn($('.pl-form-box'));
            Messenger().post({
                message:'内容不能为空',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        if(message.length<10){
            errorAn($('.pl-form-box'));
            Messenger().post({
                message:'客官，8个字起评，不讲价哟',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result ==1){

                    $('#saytext').val('');
                    ga('send', 'event', '评论相关', '文章页', '评论');

                    var userFace = $('.pl-form-author').find('img').attr('src'),
                        userName = $('.pl-form-author').find('.author-name').text(),
                        boxHtml =
                            '<div class="pl-box-wrap" data-pid="'+ data.pid +'" id="g_pid'+ data.pid +'">'
                            +'<div class="pl-box-top">'
                            +'<div class="dropdown pull-right">'
                            +'<button class="btn btn-default dropdown-toggle" type="button" id="eqwe" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                            +'<span class="caret"></span>'
                            +'</button>'
                            +'<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'
                            +'<li class="js-pl-yl">有料</li>'
                            +'<li class="js-pl-dz">点睛</li>'
                            +'<li class="js-pl-banned">禁言</li>'
                            +'<li class="js-delpl-btn">删除</li>'
                            +'<li class="js-report-pl">举报</li>'
                            +'</ul>'
                            +'</div>'
                            +'<div class="author-info">'
                            +'<div class="author-face"><img src="'+ userFace +'"></div>'
                            +'<span class="author-name"><a href="/info">'+ userName +'</a></span>'
                            +'<span class="time">刚刚</span>'
                            +'</div>'
                            +'<div class="pl-content">'+ data.message +'</div>'
                            +'</div>'
                            +'<div class="pl-box-btm">'
                            +'<div class="article-type pull-right">'
                            +'<div class="icon-like-prompt">'
                            +'<i class="icon icon-like active"></i><span class="c1">+1</span>'
                            +'</div>'
                            +'<div class="icon-no-like-prompt">'
                            +'<i class="icon icon-no-like active"></i><span class="c1">+1</span>'
                            +'</div>'
                            +'<ul>'
                            +'<li class="js-icon-like"><i class="icon icon-like "></i><span class="like">0</span></li>'
                            +'<li class="js-no-icon-like"><i class="icon icon-no-like "></i><span>0</span></li>'
                            +'</ul>'
                            +'</div>'
                            +'<div class="btn-dp transition js-add-dp-box"><i class="icon icon-dp"></i>我要点评</div>'
                            +'<div class="pl-form-box dp-article-box">'
                            +'<textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea>'
                            +'<button class="btn btn-article js-article-dp">发表</button>'
                            +'</div>'
                            +'</div>'
                            +'</div>';
                    if($('.pl-list-wrap').length>0){
                        $('.pl-list-wrap').find('a').eq(1).after(boxHtml);
                    }else{
                        $('.pl-wrap').after('<div class="pl-list-wrap">'
                        +'<a href="/article/'+ aid +'/1.html#pl-wrap" class="span-mark-author active">默认评论</a>'
                        +'<a href="/article/'+ aid +'/1.html?odby=dateline#pl-wrap" class="span-mark-author new ">最新评论</a>'
                        +boxHtml+'</div>')
                    }

                    boxAnSuccess($('.pl-form-box'),$('.pl-article-wrap'), data.message);

                    Messenger().post({
                        message:data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }


            },
            error:function(e){

            }
        });
    });

    /**
     * 喜欢点赞
     */
    $('body').on('click','.js-icon-like',function(){
        var t = $(this);
        if(t.hasClass('active')){
            $('.icon-like-prompt').find('.c1').html('-1');
        }else{
            $('.icon-like-prompt').find('.c1').html('+1');
        }
        var prompt = $(this).parents('.article-type').find('.icon-like-prompt');
        prompt.css({'opacity':'1'}).animate({'opacity':'0','margin-top':'-25px'},400,function(){
            prompt.css({'margin-top':'-13px'});
        });
    });
    /**
     * 不喜欢踩一踩
     */
    $('body').on('click','.js-no-icon-like',function(){
        var t = $(this);
        if(t.hasClass('active')){
            $('.icon-no-like-prompt').find('.c1').html('-1');
        }else{
            $('.icon-no-like-prompt').find('.c1').html('+1');
        }

        var no_prompt = $(this).parents('.article-type').find('.icon-no-like-prompt');
        no_prompt.css({'opacity':'1'}).animate({'opacity':'0','margin-top':'-27px'},400,function(){
            no_prompt.css({'margin-top':'-17px'});
        });
    });
    /**
     * 踩顶
     */
    $('body').on('click','.js-icon-like,.js-no-icon-like',function(){
        var t = $(this),
            url = '';
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            if(t.hasClass('active')){
                if(t.attr('data-type') == 'like'){
                    url = '/action/agree';
                }else{
                    url = '/action/disagree';
                }
            }else{
                if(t.attr('data-type') == 'like'){
                    url = '/action/agree';
                }else{
                    url = '/action/disagree';
                }
            }

            var random = parseInt(Math.random()*100000),
                pid = t.parents('.pl-box-wrap ').attr('data-pid'),
                dataPost = {
                    'is_ajax':'1',
                    'random':random,
                    'huxiu_hash_code':huxiu_hash_code,
                    'pid':pid
                };
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function(data){

                    if(t.hasClass('js-icon-like')){
                        ga('send', 'event', '评论相关', '文章页', '点赞');
                    }else{

                        ga('send', 'event', '评论相关', '文章页', '点差');
                    }
                    var numWrap = t.find('.like');
                    if(data.result=='1'){
                        if(t.hasClass('active')){
                            t.removeClass('active');
                            numWrap.text(parseInt(numWrap.text())-1);

                            t.find('i').removeClass('active');
                            Messenger().post({
                                message: data.msg
                                ,type: 'success'
                                ,showCloseButton: true
                            });

                        }else{
                            numWrap.text(parseInt(numWrap.text())+1);
                            t.addClass('active');
                            t.find('i').addClass('active');
                            Messenger().post({
                                message: data.msg
                                ,type: 'success'
                                ,showCloseButton: true
                            });
                        }
                    }else{
                        Messenger().post({
                            message: data.msg
                            ,type: 'error'
                            ,showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');

                },
                error:function(e){

                }
            });
        }
    });
    /**
     * 收藏文章
     */
    $('body').on('click','.js-collection-article',function(){
        var t = $(this),
            url = '/member_action/get_favorite_category_all_list',
            dataPost = {
                huxiu_hash_code:huxiu_hash_code,
                'aid':aid
            };
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result=='1'){
                    var html = '';
                    $.each(data.data,function(index,_d){
                        var i = '';
                        if(_d.flag == '0'){
                            i = '<i class="icon icon-favor-radio pull-right hide"></i>';
                        }else{
                            i = '<i class="icon icon-favor-radio pull-right"></i>';
                        }
                        html += '<div class="favorites-box js-choose-favorites" data-cid="'+ _d.cid +'">'+ i +'<div class="favorites-name">'+ _d.name +'</div><div class="favorites-articel-number">'+ _d.count +'篇文章</div></div>'
                    });
                    var title,body;
                    title = '添加到收藏夹';
                    body =
                        '<div class="favorites-warp">'+ html +'</div>'+
                        '<div class="btn btn-add-default js-btn-add-default"><i class="icon icon-group-add"></i>创建收藏夹</div>'+
                        '<div class="add-favorites-box hide"><input placeholder="收藏夹名称（最多可输入20字）" id="favorites_name"><a class="btn btn-add-default js-add-favorites">创建</a></div>'+
                        '<div class="edit-title-box">'+
                        '<div class="btn-group"><div class="btn btn-determine js-favorite-category">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div>' +
                        '</div>';
                    showBoxContent('collection-article',title,body);

                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){

            }
        });


    });

    /**
     * 选择收藏夹
     */
    $('body').on('click','.js-choose-favorites',function(){
        var t = $(this);
        t.find('.icon-favor-radio').toggleClass('hide');
    });

    /**
     * 打开添加收藏夹
     */
    $('body').on('click','.js-btn-add-default',function(){
        $(this).addClass('hide');
        $('.add-favorites-box').removeClass('hide');
    });

    /**
     * 添加收藏夹
     */
    $('body').on('click','.js-add-favorites',function(){
        if($('#favorites_name').val() != ''){

            var t = $(this),
                url = '/member_action/add_favorite_category',
                data = {
                    'huxiu_hash_code':huxiu_hash_code,
                    'name':$('#favorites_name').val()
                };
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result=='1'){
                        var html = '<div class="favorites-box js-choose-favorites" data-cid="'+ data.cid +'"><i class="icon icon-favor-radio pull-right"></i><div class="favorites-name">'+ $('#favorites_name').val() +'</div><div class="favorites-articel-number">0篇文章</div></div>'
                        $('.favorites-warp').append(html);
                        $('#favorites_name').val('');
                        $('.add-favorites-box').addClass('hide');
                        $('.js-btn-add-default').removeClass('hide');
                        ga('send', 'event', '收藏', '文章页', '文章收藏-新建收藏夹');
                    }else{
                        Messenger().post({
                            message: data.msg
                            ,type: 'error'
                            ,showCloseButton: true
                        });
                    }
                },
                error:function(e){

                }
            });

        }else{
            alert('还没有填写收藏夹名字哦~~');
        }

    });
    /**
     * 文章收藏
     */
    $('body').on('click','.js-favorite-category',function(){
        var t = $(this),
            url = '/member_action/add_favorite',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                aid:aid,
                cid:''
            };
        var favorites = $('.favorites-warp').find('.favorites-box');
        if(favorites.length > 0){
            $.each(favorites,function(index,f){
                if(!favorites.eq(index).find('.icon-favor-radio').hasClass('hide')){
                    data.cid +=favorites.eq(index).attr('data-cid')+','
                }
            });
            if(data.cid.indexOf(',')>=0){

                data.cid = data.cid.substring(0,data.cid.length-1);
            };

            if(data.cid.length > 0){

                $.ajax({
                    type: 'post',
                    url: url,
                    data: data,
                    dataType: 'json',
                    async: true,
                    success: function(data){
                        if(data.result=='1'){
                            Messenger().post({
                                message: data.msg
                                ,type: 'success'
                                ,showCloseButton: true
                            });
                            location.reload();
                        }else{
                            Messenger().post({
                                message: data.msg
                                ,type: 'error'
                                ,showCloseButton: true
                            });
                        }
                    },
                    error:function(e){

                    }
                });
            }else{
                Messenger().post({
                    message: '请选择收藏夹',
                    type: 'error',
                    showCloseButton: true
                });
            }

        }


    });

    /**
     * 文章点赞
     */
    $('body').on('click','.js-like-article',function(){
        var t = $(this),
            url = '/action/like',
            dataPost = {
                'huxiu_hash_code':huxiu_hash_code,
                'aid': t.attr('data-type') == 'like' ? aid : -parseInt(aid)
            };




        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result=='1'){

                    if(t.hasClass('active')){
                        $('.praise-box-add').find('span').html('-1');
                    }else{
                        $('.praise-box-add').find('span').html('+1');
                    }
                    var prompt = t.find('.praise-box-add');
                    prompt.css({'opacity':'1'}).animate({'opacity':'0','margin-top':'-65px'},400,function(){
                        prompt.css({'margin-top':'-40px'});
                    });

                    if(t.hasClass('active')){
                        $('.praise-box').find('.num').text(parseInt($('.praise-box').find('.num').html())-1);
                    }else{
                        $('.praise-box').find('.num').text(parseInt($('.praise-box').find('.num').html())+1);
                    }
                    if(t.attr('data-type') == 'like'){
                        t.attr('data-type','dislike')
                    }else{
                        t.attr('data-type','like')
                    }
                    t.toggleClass('active');
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                    ga('send', 'event', '点赞', '文章页', '文章点赞');
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){

            }
        });
    });
    /**
     * 点睛，有料，Po主赞
     */
    $('body').on('click', '.js-pl-dz, .js-pl-yl, .js-pl-zz', function(){
        var btn = $(this),
            url = '/action/comment_recommend?is_ajax=1&huxiu_hash_code='+huxiu_hash_code,
            dataPost = {pid:btn.parents('.pl-box-wrap').attr('data-pid'), 'actype':btn.attr('actype')};
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){

                if(data.result == 1){
                    if(btn.attr('actype') == 'del_recommend' || btn.attr('actype') == 'del_article_eye'){
                        btn.parents('.pl-box-wrap').find('.btm-yl').remove();
                        btn.attr('actype', btn.attr('actype').slice(4, btn.attr('actype').length));
                        btn.parents('.pl-box-wrap').removeClass('active');
                        btn.find('span').remove();
                    }else{
                        if(btn.parents('.pl-box-wrap').find('.btm-yl').length > 0){
                            btn.parents('.pl-box-wrap').find('btm-yl').html(btn.html());
                        }else{
                            btn.parents('.pl-box-wrap').prepend('<div class="btm-yl">'+ btn.html() +'</div>');
                        }
                        btn.parents('.pl-box-wrap').addClass('active');
                        btn.attr('actype', 'del_'+btn.attr('actype'));
                        btn.html('<span>取消</span>'+btn.html());
                    }
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }

            },
            error:function(e){
                Messenger().post({
                    message: '网络错误提交失败，请重试。'
                    ,type: 'error'
                    ,showCloseButton: true
                });
                t.removeClass('disabled');
            }
        });
    })


    /**
     * 禁言
     */
    $('body').on('click', '.js-pl-banned', function(){
        var t = $(this),
            url = '/setuser/stop_user',
            dataPost = {
                'is_ajax':'1',
                'uid':t.attr('uid'),
                'pid':t.parents('.pl-box-wrap').attr('data-pid'),
                'type':t.attr('type'),
                'huxiu_hash_code':huxiu_hash_code
            };
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    if(t.attr('type')=='startuser'){
                        t.attr('type', 'stopuser');
                        t.find('span').remove();
                    }else{
                        t.attr('type', 'startuser');
                        t.html('<span>取消</span>'+t.html());
                    }
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: data.msg
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });
    });
    /**
     * 删除评论
     */
    $('body').on('click','.js-delpl-btn',function(){
        var t = $(this),
            random = parseInt(Math.random()*100000),
            url = '/action/deldata',
            pid = t.attr('pid'),
            actype = 'comment',
            dataPost = {
                'is_ajax':'1',
                'random':random,
                'huxiu_hash_code':huxiu_hash_code,
                'pid':pid,
                'actype':actype
            };

        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function(data){

                    if(data.result=='1'){
                        var boxWrap = $('#g_pid'+pid);
                        boxWrap.css({'opacity':' 0.3'}).find('.pl-box-nr').css({'height':'56px','overflow':'hidden'});
                        boxWrap.slideUp(200,function(){$(this).remove()});
                        Messenger().post({
                            message: data.msg
                            ,type: 'success'
                            ,showCloseButton: true
                        });
                    }else{
                        Messenger().post({
                            message: data.msg,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');

                },
                error:function(e){
                    Messenger().post({
                        message: e,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            });
        }
    });

    /**
     * 删除点评
     */
    $('body').on('click','.js-deldp-btn',function(){
        var t = $(this),
            random = parseInt(Math.random()*100000),
            url = '/action/deldata',
            cid = t.attr('cid'),
            actype = 'recomment',
            dataPost = {
                'is_ajax':'1',
                'random':random,
                'huxiu_hash_code':huxiu_hash_code,
                'cid':cid,
                'actype':actype
            };
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function(data){

                    if(data.result=='1'){
                        $('.del-pl'+ t.attr('cid')).remove();
                        if($('.dp-box').find('.dp-list-box').find('.dl-user').length == 0){
                            $('.dp-box').remove();
                        }
                    }else{
                        Messenger().post({
                            message: data.msg,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');

                },
                error:function(e){
                    Messenger().post({
                        message: e,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            });
        }
    });

    /**
     * 回复点评
     */
    $('body').on('click','.js-article-dp',function(){


        var t = $(this) ,
            boxWrap = t.parents('.pl-box-wrap') ,
            random = parseInt(Math.random()*100000) ,
            url = '/action/recomment',
            pid = boxWrap.attr('data-pid') ,
            msgWrap = t.parents('.dp-article-box'),
            message = $('#saytext_reply').val(),
            messageTmpData = msgWrap.find('.dp-article-box textarea').data('dpData'),
            messageData = typeof(messageTmpData)=='undefined'?'':messageTmpData,
            dataPost = {
                'is_ajax':'1',
                'random':random,
                'huxiu_hash_code':huxiu_hash_code,
                'pid':pid,
                'message':encodeURI(message+messageData)
            };
        if(message==''||message==null){
            errorAn(t.parents('.dp-article-box'));
            Messenger().post({
                message: '内容不能为空',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        var dpName = $(this).parents('.one-pl-content').find('.content').find('.name').text();
        if(message.replace('回复 @'+ dpName +' ：','').length<8){
            errorAn(t.parents('.dp-article-box'));
            errorAn(t.parents('.hu-pl-box'));
            Messenger().post({
                message: '客官，8个字起评，不讲价哟',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){

                if(data.result == 1){
                    $('.pl-box-wrap textarea').val('');
                    Messenger().post({
                        message:data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                    if(t.parents('.pl-box-wrap').find('.span-mark-article-pl').attr('data-show') == 'false'){
                        t.parents('.pl-box-wrap').find('.span-mark-article-pl').trigger("click");
                    }
                    var userFace = $('.pl-form-author ').find('img').attr('src'),
                        userName = $('.pl-form-author ').find('.author-name').text();
                    if(t.parents('.pl-box-wrap').find('.dp-box').length > 0){
                        var dp = t.parents('.pl-box-wrap').find('.dp-box');
                        var faceHtml = '',liHtml,zkHtml;
                        faceHtml = '<li><a href="/member/'+ uid +'.html" target="_blank"><img src="'+ userFace +'"></a></li>';

                        liHtml =
                            '<div class="dl-user del-pl'+ data.reppid +'">'
                            +'<ul>'
                            +'<li><a href="/member/'+ uid +'.html" target="_blank"><img src="'+ userFace +'"></a></li>'
                            +'</ul>'
                            +'<div class="one-pl-content">'
                            +'<div class="pull-right time">刚刚</div>'
                            +'<p class="content">'
                            +'<span class="name">'+ userName +': </span>'
                            +''+ data.message +''
                            +'</p>'
                            +'<div class="js-hf-article-pl"><span>回复</span></div>'
                            +'<div class="dropdown">'
                            +'<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                            +'<span class="caret"></span>'
                            +'</button>'
                            +'<ol class="dropdown-menu" aria-labelledby="dropdownMenu1">'
                            +'<li class="pl-kill js-deldp-btn" cid="'+ data.reppid +'">删除</li>'
                            +'</ol>'
                            +'</div>'
                            +'<div class="hu-pl-box">'
                            +'<textarea class="form-control" placeholder="客官，8个字起评，不讲价哟" id="" name=""></textarea>'
                            +'<button class="btn btn-article js-article-dp" data-type="hf">发表</button>'
                            +'</div>'
                            +'</div>'
                            +'</div>',
                            zkHtml = '<span class="span-mark-article-pl js-show-hide-dp-box" data-show="false">展开</span>';

                        dp.find('.dl-user-list').find('ul').append(faceHtml);
                        dp.find('.dp-list-box').prepend(liHtml);

                        t.parents('.pl-box-wrap').find('.one-pl-content-box').remove();

                    }else{
                        var boxHtml =
                            '<div class="dp-box del-pl'+ data.reppid +'">'
                            +'<span class="span-mark-author">点评</span>'
                            +'<span class="span-mark-article-pl js-show-hide-dp-box" data-show="false">展开</span>'
                            +'<div class="dl-user dl-user-list">'
                            +'<ul>'
                            +'<li class="del-pl'+ data.reppid +'"><a href="/member/'+ uid +'.html" target="_blank"><img src="'+ userFace +'"></a></li>'
                            +'</ul>'
                            +'<div class="one-pl-content one-pl-content-box">'
                            +'<div class="pull-right time">刚刚</div>'
                            +'<p class="content">'
                            +'<span class="name">'+ userName +'</span>:'
                            +''+ data.message +''
                            +'</p>'
                            +'<div class="js-hf-article-pl"><span>回复</span></div>'
                            +'<div class="dropdown">'
                            +'<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                            +'<span class="caret"></span>'
                            +'</button>'
                            +'<ol class="dropdown-menu" aria-labelledby="dropdownMenu1">'
                            +'<li class="pl-kill js-deldp-btn" cid="'+ data.reppid +'">删除</li>'
                            +'</ol>'
                            +'</div>'
                            +'<div class="hu-pl-box">'
                            +'<textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea>'
                            +'<button class="btn btn-article js-article-dp" data-type="hf">发表</button>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                            +'<div class="dp-list-box">'
                            +'<div class="dl-user del-pl'+ data.reppid +'">'
                            +'<ul>'
                            +'<li><a href="/member/'+ uid +'.html" target="_blank"><img src="'+ userFace +'"></a></li>'
                            +'</ul>'
                            +'<div class="one-pl-content">'
                            +'<div class="pull-right time">刚刚</div>'
                            +'<p class="content">'
                            +'<span class="name">'+ userName +'</span>'
                            +''+ data.message +''
                            +'</p>'
                            +'<div class="js-hf-article-pl"><span>回复</span></div>'
                            +'<div class="dropdown">'
                            +'<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                            +'<span class="caret"></span>'
                            +'</button>'
                            +'<ol class="dropdown-menu" aria-labelledby="dropdownMenu1">'
                            +'<li class="pl-kill js-deldp-btn" cid="'+ data.reppid +'">删除</li>'
                            +'</ol>'
                            +'</div>'
                            +'<div class="hu-pl-box">'
                            +'<textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea>'
                            +'<button class="btn btn-article js-article-dp" data-type="hf">发表</button>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                            +'<div class="close-dp-list-box js-show-hide-dp-box" data-buttom="true">收起</div>'
                            +'</div>'
                            +'</div>';
                        t.parents('.pl-box-wrap').find('.pl-box-top').append(boxHtml).slideDown();

                    };
                    $('.dp-article-box').slideUp();
                    $('.hu-pl-box').slideUp();


                    /**
                     * 删除回复框的id
                     */
                    if($('#saytext_reply').length>0){
                        $('.pl-box-wrap  textarea').attr('id','');
                        $('.pl-box-wrap  textarea').attr('name','');
                    };
                    if(t.attr('data-type') == 'hf'){
                        ga('send', 'event', '评论相关', '文章页', '回复点评');
                    }else{
                        ga('send', 'event', '评论相关', '文章页', '点评');
                    }
                }else{
                    Messenger().post({
                        message: data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            },
            error:function(e){

            }
        });
    });

    /**
     * 点评内引用内容展开
     */

    $(document).on('click','.dp-box .dl-user q',function(){
        var t = $(this)
            ;
        if(!t.hasClass('js-open')){
            t.addClass('js-open');
            t.css({'display':'inline','background':'transparent','color':'#555'},100)
        }else{
            t.removeClass('js-open');
            t.css({'display':'inline-block','background':'#0479c4','color':'#fff'},100)
        }
    });

    /**
     * 默认评论与最新品论的切换
     */
    $('body').on('click','.js-default-new-pl',function(){
        $('.js-get-pl-more-list').removeClass('hide');
        var t = $(this),
            url = '/v2_action/comment_list',
            dataPosst = {
                huxiu_hash_code:huxiu_hash_code,
                page: 1,
                aid:aid,
                type:t.attr('data-type')
            };
        $('.js-default-new-pl').removeClass('active');
        t.addClass('active');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPosst,
            dataType: 'json',
            async: true,
            beforeSend:function(XMLHttpRequest){
                $('.pl-loading').removeClass('hide');
            },
            success: function(data){
                if(data.result == 1){
                    $('.pl-box-wrap ').remove();
                    $('.pl-list-wrap').append(data.data);
                    $('.js-get-pl-more-list').attr('data-cur_page',1);
                    $('.js-get-pl-more-list').attr('data-type',t.attr('data-type'));
                }
                if(data.cur_page == data.total_page){
                    $('.js-get-pl-more-list').addClass('hide');
                }

                $('.pl-loading').addClass('hide');

            },
            error:function(e){

            }
        });
    });

    /**
     * 获取更多评论
     */
    $('body').on('click','.js-get-pl-more-list',function(){
        var t = $(this),
            url = '/v2_action/comment_list',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                page: parseInt(t.attr('data-cur_page'))+1,
                aid:aid,
                type:t.attr('data-type')
            };
        if(t.hasClass('disabled')){
            Messenger().post({
                message:'没有更多评论了。',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }else{
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result == 1){
                        $('.pl-list-wrap').append(data.data);
                        t.attr('data-cur_page',parseInt(t.attr('data-cur_page'))+1);
                    }
                    if(data.cur_page == data.total_page){
                        t.addClass('hide');
                    }

                },
                error:function(e){

                }
            });
        }
    });


    /**
     * 举报弹窗
     */
    $('body').on('click','.js-report-pl,.js-report-dp',function(){
        var t = $(this);

        if(t.hasClass('js-report-pl')){
            var reportid = t.attr('pid'),
                btnClass = 'js-rep-pl-btn';
        }else if(t.hasClass('js-report-dp')){
            var reportid = t.attr('reppid') ,
                btnClass = 'js-rep-dp-btn';
        }
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            var aid = t.attr('aid'),
                boxHtml = '<div class="rep-wrap"><div class="form-horizontal rep-moder-box" aid="'+aid+'" reportid="'+reportid+'">'
                    +'<label class="radio-inline"><input type="radio" name="repRadio" id="repRadio1" value="色情"> 色情</label>'
                    +'<label class="radio-inline"><input type="radio" name="repRadio" id="repRadio2" value="谣言"> 谣言</label>'
                    +'<label class="radio-inline"><input type="radio" name="repRadio" id="repRadio3" value="网络钓鱼/广告">网络钓鱼/广告</label>'
                    +'<label class="radio-inline"><input type="radio" name="repRadio" id="repRadio4" value="政治"> 政治</label>'
                    +'<label class="radio-inline"><input type="radio" name="repRadio" id="repRadio5" value="侵权"> 侵权</label>'
                    +'<label class="radio-inline"><input type="radio" name="repRadio" id="repRadio6" value="人身攻击"> 人身攻击</label>'
                    +'<h4 class="t-h4">补充说明</h4><div class="textarea-box"><textarea class="form-control" rows="3"></textarea></div>'
                    +'</div></div>',

                btnWrap = '<div class="clearfix text-right rep-moder-btm"><button class="btn btn-blue '+btnClass+'">提交</button></div>';

            showBox('jb_model','举报',boxHtml,btnWrap);

            t.removeClass('disabled');
        }
    });
    /**
     * 举报评论
     */
    $('body').on('click','.js-rep-pl-btn,.js-rep-dp-btn',function(){
        var t = $(this);
        if(t.hasClass('js-rep-pl-btn')){
            var type = 'comment';
        }else if(t.hasClass('js-rep-dp-btn')){
            var type = 'dianping';
        }

        var boxWrap = $('.rep-moder-box'),
            random = parseInt(Math.random()*100000),
            url = '/setuser/report',
            reportid = boxWrap.attr('reportid'),
            aid = boxWrap.attr('aid'),
            radioVal = boxWrap.find('input:checked').val(),
            description = boxWrap.find('.textarea-box textarea').val(),
            dataPost = {
                'is_ajax':'1',
                'random':random,
                'huxiu_hash_code':huxiu_hash_code,
                'reportid':reportid,
                'aid':aid,
                'type':type,
                'description':encodeURI('#'+radioVal+'#'+description)
            };
        if(typeof(radioVal)=='undefined'){
            Messenger().post({
                message: '请选择一个举报类型'
                ,type: 'error'
                ,showCloseButton: true
            });
            return false;
        }
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function(data){

                    if(data.result=='1'){

                        if(t.hasClass('js-rep-pl-btn')){
                            var plWrap = $('#g_pid'+reportid)
                                ;
                            plWrap.find('.pl-box').css({'background':'#fcb8b8'});
                        }else if(t.hasClass('js-rep-dp-btn')){
                            var plWrap = $('.dianping-box[reppid='+reportid+']')
                                ;
                            plWrap.css({'opacity':'.6'});
                        }

                        Messenger().post({
                            message: data.msg
                            ,type: 'success'
                            ,showCloseButton: true
                        });
                    }else{
                        Messenger().post({
                            message: data.msg
                            ,type: 'error'
                            ,showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');

                },
                error:function(e){
                    Messenger().post({
                        message: '网络错误提交失败，请重试。'
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                    t.removeClass('disabled');
                }
            });

        }
    });
    /**
     * 标签页添加更多
     */
    $('body').on('click','.js-get-tag-more-list',function(){
        var t = $(this),
            url = '/v2_action/tag_article_list',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                page: t.attr('data-cur_page'),
                tag_id: t.attr('data-tag_id')
            };
        if(t.hasClass('disabled')){
            Messenger().post({
                message:'没有更多标签了',
                type: 'error',
                showCloseButton: true
            });
        }else{
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                beforeSend:function(XMLHttpRequest){
                    t.html('正在加载...');
                    t.removeClass('js-get-tag-more-list');
                },
                success: function(data){
                    if(data.result == 1){
                        var tagHtml = '';
                        $.each(data.data,function(index,_data){
                            tagHtml +=
                                '<li><a href="'+ _data.url +'" target="_blank">'+ _data.title +'</a><span class="pull-right time">'+ _data.time +'</span></li>'
                        });
                        t.attr('data-cur_page',parseInt(t.attr('data-cur_page'))+1);
                        $('.related-article ul').append(tagHtml);
                        if(parseInt(t.attr('data-cur_page'))-1 == data.total_page){
                            t.addClass('disabled');
                            t.remove();
                        }
                    }else{
                        Messenger().post({
                            message:data.msg,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                    t.addClass('js-get-tag-more-list');
                    t.html('点击加载更多');
                },
                error:function(e){

                }
            });
        }

    });
    /**
     * 删除文章
     */
    if($('.js-pc-del').length > 0){
        $('.js-pc-del').click(function(){
            btn = $(this);
            var id = 'del_article_top';
            var title = '删除';
            var body = '确认要删除吗？';
            var footer = '<div><button class="btn js-pc-del-article" data-dismiss="modal">删除</button><button type="button" class="btn btn-gray" data-dismiss="modal">取消</button></div>';

            showBox(id, title, body, footer);

        });
    }
    /**
     * 获取关联列表
     */
    function getRelatedInfo(showBox, type, weiboUrl, btn){
        if(!btn.hasClass('disabled')){
            btn.addClass('disabled');
            var url = '/action/weibo_related'
                , param = {
                    is_ajax: 1
                    , huxiu_hash_code: huxiu_hash_code
                    , aid: aid
                    , type: type
                    , url: weiboUrl
                }
                ;
            $.post(url, param, function(data){
                data = eval('('+data+')');
                if(data.result == 1){
                    if(type == 'get'){
                        var str = '';
                        if(data.mid_urls == undefined || data.mid_urls.length == 0){
                            str == '<li>暂时没有关联的网址</li>';
                        }else{
                            $.each(data.mid_urls, function(i, ele){
                                str += '<li><a class="url" target="_blank" href="'+ ele +'">'+ ele +'</a><span class="glyphicon glyphicon-remove js-remove"></span></li>';
                            })
                        }
                        var id = 'related_box'
                            , title = '管理-关联微博'
                            , body = '<div class="js-alert"></div>' +
                                '<div class="relating-wrap">' +
                                '<a class="btn btn-default pull-right js-submit" href="javascript:void(0);">提交</a><input class="form-control js-text" type="text" />' +
                                '</div>' +
                                '<div class="related-wrap">' +
                                '<p>已关联微博</p>' +
                                '<ul class="js-related-wrap">' + str + '</ul>' +
                                '</div> '
                            , footer = '<button type="button" class="btn btn-gray" data-dismiss="modal">关闭</button>'
                            ;
                        showBox(id, title, body, footer);
                    }else if(type == 'add'){
                        $('.js-related-wrap').prepend('<li><a class="url" href="'+ weiboUrl +'">'+ weiboUrl +'</a><span class="glyphicon glyphicon-remove js-remove"></span></li>');
                        $('.js-text').val('');
                        $('.js-alert').addClass('alert alert-success').html(data.msg);
                        setTimeout(function(){
                            $('.js-alert').removeClass('alert alert-success').html('');
                        }, 2000);
                    }else if(type == 'del'){
                        btn.parents('li').remove();
                        $('.js-alert').addClass('alert alert-success').html(data.msg);
                        setTimeout(function(){
                            $('.js-alert').removeClass('alert alert-success').html('');
                        }, 2000)
                    }

                    //result != 1
                }else{
                    $('.js-alert').addClass('alert alert-danger').html(data.msg);
                    setTimeout(function(){
                        $('.js-alert').removeClass('alert alert-danger').html('');
                    }, 2000)
                }
                btn.removeClass('disabled');

            })
        }
    }


    /**
     * 关联对话框
     */
    $('body').on('click', '.js-btn-related', function(){
        var type = 'get'
            ;
        getRelatedInfo(showBox, type, '', $(this));
    })

    /**
     * 关联网址
     */
    $('body').on('click', '.js-submit', function(){
        var type = 'add'
            , weiboUrl = $('.js-text').val()
            ;
        getRelatedInfo(showBox, type, weiboUrl, $(this));
    });


    /**
     * 删除关联
     */
    $('body').on('click', '.js-remove', function(){
        var type = 'del'
            , weiboUrl = $(this).parents('li').find('.url').html()
            ;
        getRelatedInfo(showBox, type, weiboUrl, $(this));
    });


    /**
     * 获取忽略列表
     * @param btn
     */
    function getIgnoredList(btn){

        if(!btn.hasClass('disabled')){
            btn.addClass('disabled');
            var url = '/admin/article_reasons',
                post_data = {'huxiu_hash_code':huxiu_hash_code, 'is_ajax':1},
                aid = btn.attr('aid');
            $.post(url, post_data, function(data){
                data = eval('('+data+')');
                if(data.result == 1){
                    var html = '';
                    for(var i=0;i<data.data.length;i++){
                        html+= '<label class="new-lb">' +
                        '<input id="'+ data.data[i].id +'" name="reason" value="'+ data.data[i].message +'" type="checkbox" />'+ data.data[i].message +
                        '</label>';
                    }

                    var id = 'ignoreModal'
                        , body = '<div class="js-alert"></div>' +
                            '<div class="clearfix">' +
                            '<div class="pull-left">忽略理由如下:</div>' +
                            '<div class="modal-manage pull-right"><a class="js-modal-manage" href="javascript:void(0);">管理</a></div>' +
                            '</div>' +
                            '<div class="reason-box js-reason-box">' + html +
                            '<label class="new-lb"><textarea class="form-control js-custom-reason" placeholder="您可在此输入自定义忽略理由"></textarea></label>' +
                            '<label class="new-lb-message"><input id="is-group-message" type="checkbox">不合适在虎嗅主站发布，推荐发布到群组</label>'+
                            '</div>' +
                            '<div class="reason-edit-box js-reason-edit-box"></div>'
                        , title = '忽略'
                        , footer = '<button class="btn btn-success article-check-ignore-conform" aid='+ aid +'>确定</button>'
                        ;

                    showBox(id, title, body, footer);

                }else{
                    showBox.showBox('ignoreModal', '忽略', data.msg, '<button class="btn btn-success" data-dismiss="modal" aria-hidden="true">关闭</button>');
                }
                btn.removeClass('disabled');
            });
        }

    }


    /**
     * 忽略
     */

    $('body').on('click', '.js-btn-ignored', function(){
        getIgnoredList($(this));
    });

    /**
     * 点击忽略对话框中的忽略按钮
     */
    $('body').on('click', '#ignoreModal .article-check-ignore-conform', function(){
        var btn = $(this),
            oParent = btn.parents('.modal'),
            oReasonBox = oParent.find('.js-reason-box'),
            iReason = oReasonBox.find('.js-custom-reason').val(),
            aid = $(this).attr('aid'),
            url = '/admin/article_ignore_action',
            param = {'huxiu_hash_code':huxiu_hash_code,'aid':aid},
            reason = new Array, i = 0;
        if(!btn.hasClass('disabled')){

            $.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function(index, ele){
                var value = $(ele).val(),
                    id = $(ele).attr('id'),
                    isChecked = ($(ele).prop('checked')== true) ? true:false;
                if(isChecked){
                    reason[i] = {'id':id, 'message':value};
                    i++;
                }
            });
            if(iReason != ''){
                reason[reason.length] = {'id':0, 'message':iReason};
            }

            if(!reason[0] && (iReason=='') && $('#is-group-message').prop('checked') == false){
                alert('请至少选择一种忽略理由'); return;
            }

            param.reasons = reason;
            param.ismessage = $('#is-group-message').prop('checked')  == true ? 1:0;

            $.post(url, param, function(data){
                var data = eval('('+data+')');
                if(data.result == 1){
                    $('#ignoreModal').modal('hide');
                    window.location.reload();
                }else{
                    $('.js-alert').addClass('alert alert-danger').removeClass('alert-success').html('忽略理由修改失败');
                    setTimeout(function(){
                        $('.js-alert').removeClass('alert alert-danger').html('');
                    }, 1500);
                }
                btn.removeClass('disabled');
            })
        }

    });
    /**
     * 点击管理按钮
     */
    $('body').on('click', '#ignoreModal .js-modal-manage', function(){
        var btn = $(this)
            , oParent = btn.parents('.modal')
            , oReasonBox = oParent.find('.js-reason-box')
            , oReasonEditBox = oParent.find('.js-reason-edit-box')
            ;
        $.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function(index, ele){
            var strHtml = '<label class="new-lb">' +
                '<span class="remove-article-reason">-</span>' +
                '<input class="form-control" id="'+ $(ele).attr('id') +'" name="reason" type="text" value="'+$(ele).val()+'" />' +
                '</label>';
            oReasonEditBox.append(strHtml);
        });
        oReasonBox.css('display', 'none');
        btn.attr('class', 'js-btn-reason-add').html('添加');
        oParent.find('.article-check-ignore-conform').attr('class', 'btn btn-success js-btn-article-manage-ignore');
    });

    /**
     * 点击删除按钮
     */
    $('body').on('click', '#ignoreModal .js-reason-edit-box .new-lb span', function(){
        var btn = $(this)
            , iReasonBox = btn.parent().find('input[type="text"]')
            , url = '/admin/article_reason_delete_action'
            , param = {'huxiu_hash_code':huxiu_hash_code, 'reason_id':iReasonBox.attr('id')}
            ;

        if(iReasonBox.attr('id')==undefined){
            iReasonBox.parent().remove();
            return;
        }

        $.post(url, param, function(data){
            data = eval('('+data+')');
            if(data.result == 1){
                btn.parent().remove();
            }else{
                $('.js-alert').addClass('alert alert-danger').removeClass('alert-success').html('忽略理由修改失败');
                setTimeout(function(){
                    $('.js-alert').removeClass('alert alert-danger').html('');
                }, 1500);
            }
        });


    });

    /**
     * 点击添加按钮
     */
    $('body').on('click', '.js-btn-reason-add', function(){
        var btn = $(this),
            oParent = btn.parents('.modal'),
            oReasonEditBox = oParent.find('.js-reason-edit-box');
        oReasonEditBox.prepend('<label class="new-lb"><span class="remove-article-reason">-</span><input class="form-control" name="reason" type="text" value="" /></label>');
        oReasonEditBox.find('.new-lb:first-child input').focus();
    });

    /**
     * 点击管理忽略理由中确定按钮
     */
    $('body').on('click', '.js-btn-article-manage-ignore', function(){
        var btn = $(this),
            oParent = btn.parents('.modal'),
            oReasonEditBox = oParent.find('.js-reason-edit-box'),
            urlModify = '/admin/article_reason_edit_action',
            urlAdd = '/admin/article_reason_add_action',
            paramAdd = {'huxiu_hash_code':huxiu_hash_code},
            paramModify = {'huxiu_hash_code':huxiu_hash_code},
            arrModify = [],
            arrAdd = [];
        if(!btn.hasClass('disabled')){
            btn.addClass('disabled');
            $.each(oReasonEditBox.find('.new-lb input[type="text"]'), function(index, ele){
                if($(ele).attr('id') == undefined){
                    arrAdd.push($(ele).val());
                }else{
                    var obj = {};
                    obj.id = $(ele).attr('id');
                    obj.message = $(ele).val();
                    arrModify.push(obj);
                }
                paramAdd['reason'] = arrAdd;
                paramModify['reason'] = arrModify;

            });

            if(arrAdd.length > 0){
                $.post(urlAdd, paramAdd, function(data){
                    var data = eval('('+data+')');
                    if(data.result == 1){
                        $('#ignoreModal').modal('hide');
                    }else{
                        $('.js-alert').addClass('alert alert-danger').removeClass('alert-success').html('忽略理由修改失败');
                        setTimeout(function(){
                            $('.js-alert').removeClass('alert alert-danger').html('');
                        }, 1500);
                    }
                    btn.removeClass('disabled')
                })
            }

            if(arrModify.length > 0){
                $.post(urlModify, paramModify, function(data){
                    var data = eval('('+data+')');
                    if(data.result == 1){
                        $('#ignoreModal').modal('hide');
                    }else{
                        $('.js-alert').addClass('alert alert-danger').removeClass('alert-success').html('忽略理由修改失败');
                        setTimeout(function(){
                            $('.js-alert').removeClass('alert alert-danger').html('');
                        }, 1500);
                    }
                    btn.removeClass('disabled');
                })
            }
        }
    });

    /**
     * 文章内容页打赏埋点
     */
    $('body').on('mouseover','.zhifb-mouseover',function(){
        if($(this).find('.icon-zhifb').length>0){
            _hmt.push(['_trackEvent', '文章打赏_支付宝', '作家名称',aid]);
        }

    });
    $('body').on('mouseover','.weix-mouseover',function(){
        if($(this).find('.icon-weix').length>0){
            _hmt.push(['_trackEvent', '文章打赏_微信', '作家名称',aid]);
        }
    });

    /**
     * 管理员文章内容页推送
     */
    $('body').on('click','.js-push-model',function(){

        var t = $(this);
        if(t.attr('data-location') == 'main'){

            var url = '/v2_admin_action/push_article_get',
                dataPost = {
                    is_ajax : 1,
                    'huxiu_hash_code':huxiu_hash_code,
                    aid:aid
                };
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function(data){

                    var manageHtml = '',manageActiveHtml = '',flag = 0;
                    if(data.result == 1){
                        $.each(data.list,function(k,v){
                            if(v.pushed == 1){
                                manageHtml += '<label class="btn" title="'+ v.name+'" push_type="'+ v.push_type+'" for="itemid'+ v.push_type+'" disabled><input  id="itemid'+ v.push_type+'" name="item" type="radio" disabled>'+ v.name+'</label>';
                                flag +=1;
                                manageActiveHtml += '<span class="btn active" push_type="'+ v.push_type+'" aid="'+ t.attr('aid') +'" title="'+ v.name+'"><i></i><input type="checkbox" checked="checked">'+ v.name+'</span>';
                            }else{
                                manageHtml += '<label class="btn" title="'+ v.name+'" push_type="'+ v.push_type+'" for="itemid'+ v.push_type+'" ><input  id="itemid'+ v.push_type+'" name="item" type="radio">'+ v.name+'</label>';
                            }
                        });
                        manageHtml = '<div class="btn-group checkbox-list modal-push-box" data-toggle="buttons">'+manageHtml+'</div>';

                        if(flag>0){
                            manageActiveHtml = '<br/><br/><div class="alert alert-success push-modal-title">已推送到下列位置</div><div class="btn-group checkbox-list modal-push-box new-manage-push-btn-wrap" data-toggle="buttons">'+manageActiveHtml+'</div>';
                        }else{
                            manageActiveHtml = '<br/><br/><hr style="margin:10px 0;"><div class="text-center"><span class="label" style="padding:5px 10px;">这篇文章还没有被推送过</span></div>';
                        }

                    }else {
                        manageHtml = '<div class="alert alert-error">'+data.msg+'</div>';
                    };

                    var boxHtml =
                        '<div class="modal-body">' +
                        '<div class="alert alert-success push-modal-title">推送列表：</div>' +
                        manageHtml +
                        '' +
                        manageActiveHtml +
                        '</div>';

                    var footerHtml = '<button class="btn btn-success new-push-modal2" aid="'+ t.attr('aid') +'" data-dismiss="modal" aria-hidden="true">确定</button><button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>'

                    showBox('newPushModal','新版管理推送',boxHtml,footerHtml);

                },
                error:function(e){
                    Messenger().post({
                        message: data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            });

        }
    });


    /**
     * 确认选择文章推送位置
     */
    $('body').on('click','.new-push-modal2',function(){


        var t = $(this),
            url = '/v2_admin_action/push_article_add',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                aid : t.attr('aid'),
                push_type:$('.modal-push-box').eq(0).find('.btn input[type="radio"]:checked').parent().attr('push_type')
            };
        if(data.push_type == undefined){

            Messenger().post({
                message: '请选择推送位置。',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({message: data.msg, type: 'success',showCloseButton: true });
                }else{
                    Messenger().post({message: data.msg, type: 'error',showCloseButton: true });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e.msg,
                    type: 'error',
                    showCloseButton: true
                });
            }
        });
    });
    /**
     * 取消已经推送的列表
     */
    $('body').on('click','.new-manage-push-btn-wrap .btn',function(){
        if(confirm('确认要取消推送么？')){

            var t = $(this),
                url = '/v2_admin_action/push_article_delete',
                data = {
                    'huxiu_hash_code':huxiu_hash_code,
                    'aid': t.attr('aid'),
                    'push_type': t.attr('push_type')
                };
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result == 1){
                        Messenger().post({message: data.msg, type: 'success',showCloseButton: true });
                        t.remove();

                        var label_list = $('.modal-push-box').find('label');
                        $.each(label_list,function(index,label){
                            if(label_list.eq(index).attr('push_type') == t.attr('push_type')){
                                label_list.eq(index).removeAttr('disabled');
                                label_list.eq(index).find('input').removeAttr('disabled');
                            }
                        });

                    }else{
                        Messenger().post({message: data.msg, type: 'error',showCloseButton: true });
                    }
                },
                error:function(e){
                    Messenger().post({
                        message: e.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            });
        };
    });


    /**
     * 确认删除文章
     */
    $('body').on('click', '.js-pc-del-article', function(){


        var t = $(this),
            url = '/action/deldata',
            data = {
                huxiu_hash_code:huxiu_hash_code,
                is_ajax:1,
                actype: 'article',
                aid:aid
            };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e.msg,
                    type: 'error',
                    showCloseButton: true
                });
            }
        });

    });



    /**
     * 推送到站外
     */
    $('body').on('click','.js-push-outs',function(){
        var t = $(this),
            url = '/pushdata',
            dataPost = {
                huxiu_hash_code:huxiu_hash_code,
                aid:aid,
                ftype:'pushAd',
                is_ajax : 1,
                act:'getList'
            };
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){

                if(data.result == 1){

                    var strHtml = ''
                    $.each(data.content, function(i, ele){
                        var strCheck = '';
                        if(ele.status == 1){
                            strCheck = 'checked';
                        }
                        strHtml += '<label class="checkbox-inline"><input name="pro[]" oid="'+ ele.oid +'" openid="'+ ele.openid +'" '+ strCheck +' type="checkbox" >'+ ele.openname +'</label>'
                    })
                    var id = 'push_box_three_party',
                        title = '管理第三方推送',
                        body = '<div class="js-msg"></div><div class="">' + strHtml +'</div>',
                        footer = '<button type="button" class="btn btn-success js-btn-push-three">提交</button> <button type="button" class="btn btn-gray" data-dismiss="modal">关闭</button>';
                    showBox(id, title, body, footer);
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });

    });

    /**
     * 点击申诉按钮
     */

    $('body').on('click', '.js-btn-shensu', function(){
        var id = 'd_shensu_box'
            , body = '<div class="js-alert"></div>' +
                '<div>' +
                '<p>您可以再次<a href="/contribute?aid='+ $(this).attr("aid") +'">编辑</a>您的稿件，然后在这里写下您的申诉理由。我们会对您的稿件进行复核。复核为终审，如果您的稿件还是没有通过，我们只能表示非常遗憾。</p>'+
                '<textarea class="form-control js-text" placeholder="您可在此输入申诉理由" rows="5"></textarea>' +
                '</div>'

            , title = '填写申诉理由'
            , footer = '<button class="btn btn-success js-btn-submit" aid="'+ $(this).attr("aid") +'">确定</button>'
            ;

        showBox(id, title, body, footer);
    });

    $('body').on('click', '#d_shensu_box .js-btn-submit', function(){
        var btn = $(this);
        if(!btn.hasClass('disabled')){
            btn.addClass('disabled');
            var url = '/setuser/author_reason'
                , param = {
                    huxiu_hash_code: huxiu_hash_code
                    , is_ajax: 1
                    , aid: aid
                    , message: $('#d_shensu_box .js-text').val()
                }
                ;

            $.each($('.js-radio-box input'), function(i, ele){
                if($(ele).prop('checked') == true){
                    param['clickid'] = $(ele).val();
                    return;
                }
            });

            $.post(url, param, function(data){
                data = eval('(' +data+ ')');
                if(data.result == 1){
                    btn.removeClass('disabled');
                    $('.js-alert').addClass('alert alert-success').removeClass('alert-danger').html('申诉成功');
                    setTimeout(function(){

                        $('.js-alert').removeClass('alert alert-success').html('');
                        location.reload();
                    }, 1500);
                }else{
                    $('.js-alert').addClass('alert alert-danger').removeClass('alert-success').html(data.msg);
                    setTimeout(function(){
                        $('.js-alert').removeClass('alert alert-danger').html('');
                    }, 1500);
                }
                btn.removeClass('disabled');
            })
        }
    });

    /**
     * 确认提交到站外
     */
    $('body').on('click','.js-btn-push-three',function(){

        var t = $(this),
            openid = [];
        $.each($('.modal-body').find('.checkbox-inline'), function(i, ele){
            var val = $(ele).find('input:checked').attr('openid');
            openid[i] = val;
        });
        var url = '/pushdata',
            dataPost = {
                huxiu_hash_code:huxiu_hash_code,
                aid:aid,
                act:'getSubmit',
                pro: openid,
                ftype: 'pushAd'
            };
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                    setTimeout(function(){
                        location.reload();
                    },2000);
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });

    });


    /**
     * 推送到专题
     */
    $('body').on('click','.js-push-topic',function(){

        var t = $(this),
            url = '/pushdata',
            dataPost = {
                huxiu_hash_code:huxiu_hash_code,
                aid:aid,
                act:'getList',
                ftype: 'pushZt'
            };
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    var strZtHtml = '<li class="js-type-opt" ztnameen="default" zid="0">默认无选择</li>', strZtTypeHtml = '<li>还未选择专题</li>';

                    $.each(data.content, function(i, ele){
                        strZtHtml += '<li class="js-type-opt" ztnameen="'+ ele.ztnameen +'" zid="'+ ele.zid +'">' +ele.zanzhushang +'</li>'
                    })

                    var id = 'push_box_zt',
                        title = '管理专题推送',
                        body = '<div class="js-msg"></div>' +
                            '<div class="clearfix">' +
                            '<ul class="form-control js-zt-type">'+ strZtHtml +'</ul>' +
                            '<ul class="form-control js-zt-type-cnt">'+ strZtTypeHtml +'</ul>' +
                            '</div>' +
                            '',
                        footer = '<button type="button" class="btn btn-success js-btn-push-zt">提交</button> <button type="button" class="btn btn-gray" data-dismiss="modal">关闭</button>';
                    showBox(id, title, body, footer);
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });
    });


    $('body').on('click', '.js-zt-type .js-type-opt, .js-zt-type-cnt .js-type-opt', function(){
        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');
    });

    /**
     * 专题推送分类的详细内容
     */

    $(document).on('click', '.js-zt-type .js-type-opt', function(){
        var zid = $(this).attr('zid');
        if(zid == 0){
            $('.js-zt-type-cnt').html('<li>还未选择专题</li>')
        }else{
            var url = '/pushdata',
                dataPost = {
                    huxiu_hash_code:huxiu_hash_code,
                    aid:aid,
                    act:'getClass',
                    ftype:'pushZt',
                    zid: zid
                };
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function(data){
                    if(data.result == 1){
                        var strHtml = '';
                        $.each(data.content, function(i, ele){
                            strHtml += '<li class="js-type-opt" tid="'+ ele.tid +'">' +ele.ztclassname +'</li>'
                        });
                        $('.js-zt-type-cnt').html(strHtml);
                    }else{
                        $('.js-msg').addClass('alert alert-danger').removeClass('hidden').html(data.msg);
                        setTimeout(function(){
                            $('.js-msg').removeClass('alert alert-danger').html('');
                        }, 2000);
                    }
                },
                error:function(e){
                    Messenger().post({
                        message: e
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            });
        }
    });


    /**
     * 确认推送专题
     */
    $('body').on('click','.js-btn-push-zt',function(){

        var tid = $('.js-zt-type-cnt').find('li.active').attr('tid'),
            ztnameen = $('.js-zt-type').find('li.active').attr('ztnameen'),
            zid = $('.js-zt-type').find('li.active').attr('zid')

        if($('.js-zt-type-cnt li').length>1){
            if(undefined == tid ){
                tid = $('.js-zt-type-cnt li').eq(1).attr('tid');
            }
            var dataPost = {
                huxiu_hash_code:huxiu_hash_code,
                aid:aid,
                act:'getSubmit',
                ftype:'pushZt',
                zid: zid,
                tid:tid,
                ztnameen:ztnameen
            };
        }else if($('.js-zt-type').find('li.active').length == 0){
            $('.js-msg').addClass('alert alert-danger').html('您还没有选择');
            setTimeout(function(){
                $('.js-msg').removeClass('alert alert-danger').html('');
            }, 2000);
        }else if(zid == 0){

            var dataPost = {
                huxiu_hash_code:huxiu_hash_code,
                aid:aid,
                act:'getSubmit',
                ftype:'pushZt'
            };
        }

        var url = '/pushdata';
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message: data.msg
                        ,type: 'success'
                        ,showCloseButton: true
                    });
                    setTimeout(function(){
                        location.reload();
                    },2000);
                }else{
                    Messenger().post({
                        message: data.msg
                        ,type: 'error'
                        ,showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e
                    ,type: 'error'
                    ,showCloseButton: true
                });
            }
        });
    });

    /**
     * 重新发送邮箱
     */
    $('body').on('click','.js-btn-resend',function(){
        var t = $(this),
            data = {
                'is_ajax':'1',
                'huxiu_hash_code':huxiu_hash_code,
                'regtype': t.attr('type'),
                'email': t.attr('email'),
                'auth_token':$('#auth_token').val()
            };
        $.ajax({
            type: 'post',
            url: '/user/hx_send_email',
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message: data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                }else{
                    Messenger().post({
                        message: data.msg,
                        type: 'error',showCloseButton: true
                    });
                }
            },
            error:function(e){
                Messenger().post({
                    message: e,
                    type: 'error',showCloseButton: true
                });
            }
        });

    });
    /**
     * 数据同步
     */
    if($('.js-yarcrontab').length > 0){
        $.get('http://www.huxiu.com/yarcrontab.html', function(data){});
    }
});


