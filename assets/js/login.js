$(function() {
    // 点击'去注册账号'的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击'去登陆'的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui获取from对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) return '两次密码不一致'
            }
        })
        //监听注册表单的提交时间
    $("#form_reg").on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }, function(res) {
            if (res.status !== 0)
                return layer.msg(res.message);
            layer.msg('注册成功,请登录')
            $("#link_login").click()
        })
    })
    $("#form_login").on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0)
                    return layer.msg('登陆失败');
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})