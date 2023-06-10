layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel, form = layui.form;

    //自定义验证规则
    form.verify({
        vercodes: function (value) {
            var inputValue = value.toLowerCase();
            //获取验证码
            var verCode = $(".verCode").html().toLowerCase();
            if (inputValue !== verCode) {
                return '验证码错误';
            }
        }, content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听提交
    form.on('submit(commit)', function (data) {

        $.ajax({
            url: "/login",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data.field),
            async: false,
            success: function (res) {
                var success = res.success;
                if (success) {
                    window.location.href = "/index";
                } else {
                    layer.alert(res.msg, {
                        title: '登录失败'
                    })
                }
            }
        })
        return false;
    });


    //设置轮播主体高度
    var login_height = $(window).height() / 1.3;
    var car_height = $(".login_height").css("cssText", "height:" + login_height + "px!important");


    //Login轮播主体
    carousel.render({
        elem: '#login'//指向容器选择器
        , width: '100%' //设置容器宽度
        , height: 'car_height', arrow: 'always' //始终显示箭头
        , anim: 'fade' //切换动画方式
        , autoplay: true //是否自动切换false true
        , arrow: 'hover' //切换箭头默认显示状态||不显示：none||悬停显示：hover||始终显示：always
        , indicator: 'none' //指示器位置||外部：outside||内部：inside||不显示：none
        , interval: '5000' //自动切换时间:单位：ms（毫秒）
    });

    //监听轮播--案例暂未使用
    carousel.on('change(login)', function (obj) {
        var loginCarousel = obj.index;
    });

    //粒子线条
    $(".login_cont").jParticle({
        background: "rgba(0,0,0,0)",//背景颜色
        color: "#fff",//粒子和连线的颜色
        particlesNumber: 100,//粒子数量
        //disableLinks:true,//禁止粒子间连线
        //disableMouse:true,//禁止粒子间连线(鼠标)
        particle: {
            minSize: 1,//最小粒子
            maxSize: 3,//最大粒子
            speed: 30,//粒子的动画速度
        }
    });

});