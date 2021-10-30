$(function() {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录吗？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvater(res.data)
        },
    })
}

function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcom').html('欢迎&nbsp&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}