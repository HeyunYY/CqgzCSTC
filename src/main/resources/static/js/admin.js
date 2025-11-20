// 管理员登录功能
$(document).ready(function() {
    // 获取相关元素
    const $loginUsername = $('#loginUsername');
    const $userTypeToggle = $('.user-type-toggle');
    const $userTypeInputs = $('input[name="userType"]');
    const $userLoginForm = $('#userLoginForm');
    const $adminLoginForm = $('#adminLoginForm');
    
    // 检查是否显示管理员选项
    function checkShowAdminOption() {
        const emailValue = $loginUsername.val().trim();
        // 当邮箱输入特定内容时显示管理员选项
        if (emailValue === 'admin@example.com' || emailValue === 'admin@cstc.com') {
            $userTypeToggle.addClass('active');
        } else {
            $userTypeToggle.removeClass('active');
            // 重置为用户表单
            showUserForm();
            $userTypeInputs.first().prop('checked', true);
        }
    }
    
    // 显示用户表单
    function showUserForm() {
        if ($adminLoginForm.hasClass('active')) {
            // 添加淡出动画
            $userLoginForm.removeClass('active');
            $adminLoginForm.addClass('form-fade-out');
            
            setTimeout(function() {
                $adminLoginForm.removeClass('active form-fade-out');
                $userLoginForm.addClass('active form-fade-in');
                
                setTimeout(function() {
                    $userLoginForm.removeClass('form-fade-in');
                }, 300);
            }, 300);
        }
    }
    
    // 显示管理员表单
    function showAdminForm() {
        if ($userLoginForm.hasClass('active')) {
            // 添加淡出动画
            $userLoginForm.addClass('form-fade-out');
            
            setTimeout(function() {
                $userLoginForm.removeClass('active form-fade-out');
                $adminLoginForm.addClass('active form-fade-in');
                
                setTimeout(function() {
                    $adminLoginForm.removeClass('form-fade-in');
                }, 300);
            }, 300);
        }
    }
    
    // 切换用户类型
    function toggleUserType() {
        const selectedType = $('input[name="userType"]:checked').val();
        
        if (selectedType === 'admin') {
            showAdminForm();
        } else {
            showUserForm();
        }
    }
    
    // 绑定事件监听器
    if ($loginUsername.length) {
        $loginUsername.on('input', checkShowAdminOption);
    }
    
    $userTypeInputs.each(function() {
        $(this).on('change', toggleUserType);
    });
});