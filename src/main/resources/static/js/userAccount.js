const { ElMessage, ElNotification, ElLoading} = window.ElementPlus;
const registerUsername = $('#registerUsername');
const registerEmail = $('#registerEmail');
const registerPassword = $('#registerPassword');
const registerConfirmPassword = $('#registerConfirmPassword');
const invitationCode = $('#invitationCode');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/;
let loadingInstance;

//表单提交处理
$('#loginForm').on('submit', function(e) {
    e.preventDefault();
    // closeAuthPanel();
});

$('#registerForm').on('submit', function(e) {
    e.preventDefault();
    const username = registerUsername.val();
    const email = registerEmail.val();
    const password = registerPassword.val();
    const Code = invitationCode.val();
    let verify = 0;
    $('.input-error').remove();
    $('.input-success').remove();
    ElNotification.closeAll()
    loadingInstance = ElLoading.service({
        target: '#authPanel',
        text: '提交中...',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    Notification('注册中..', '请稍后，正在进行初步数据校验', 'primary');
    if (!validatePasswords()) {
        verify = 1;
    }
    // if (username.length === 0) {
    //     registerUsername.parent().append('<div class="input-error username-error">请输入有效的用户名</div>');
    //     verify = 1;
    // }
    // if (!emailRegex.test(email)) {
    //     registerEmail.parent().append('<div class="input-error email-error">请输入有效的邮箱地址</div>');
    //     verify = 1;
    // }
    // if (!passwordRegex.test(password)) {
    //     registerPassword.parent().append('<div class="input-error password-err">密码长度在6-16位之间，必须包含字母和数字</div>');
    //     verify = 1;
    // }
    // if(Code.length === 0){
    //     invitationCode.parent().append('<div class="input-error register-error">请输入特殊邀请码</div>');
    //     verify = 1;
    // }
    const validations = [
        {
            condition: registerUsername.val().length === 0,
            element: registerUsername,
            message: '请输入有效的用户名',
            errorClass: 'username-error'
        },
        {
            condition: !emailRegex.test(registerEmail.val()),
            element: registerEmail,
            message: '请输入有效的邮箱地址',
            errorClass: 'email-error'
        },
        {
            condition: !passwordRegex.test(registerPassword.val()),
            element: registerPassword,
            message: '密码长度在6-16位之间，必须包含字母和数字',
            errorClass: 'password-err'
        },
        {
            condition: invitationCode.val().length === 0,
            element: invitationCode,
            message: '请输入特殊邀请码',
            errorClass: 'register-error'
        }
    ];
    validations.forEach(validation => {
        if (validation.condition) {
            validation.element.parent().append(
                `<div class="input-error ${validation.errorClass}">${validation.message}</div>`
            );
            verify = 1;
        }
    });
    if (verify === 1) {
        Notification('注册失败!', '初步数据校验未通过，请检查输入内容', 'error');
        loadingInstance.close();
        return;
    }
    Notification('注册中..', '数据校验通过，正在尝试注册，请稍后', 'success');
    $.ajax({
        type: 'POST',
        url: '/userAccount/register',
        data: {
            username: username,
            email: email,
            password: encryptPasswordWithAutoSalt(password),
            invitationCode: Code,
        },
        success: function(data) {
            if (data.code === 100){
                registerEmail.parent().append('<div class="input-success email-error">邮箱可用</div>');
                Notification('注册中..', '邮箱可用性验证通过', 'success');
                Notification('注册成功!', '注册已完成，您可以进行登录', 'success');
                loadingInstance.close();
            }else if (data.code === 300){
                $("#register-btn").parent().append('<div class="input-error register-error">特殊邀请码错误</div>');
                Notification('注册失败!', '特殊邀请码错误，请校验邀请码', 'error');
                loadingInstance.close();
            }else if (data.code === 400){
                registerEmail.parent().append('<div class="input-error email-error">邮箱已经存在或输入错误</div>');
                Notification('注册失败!', '邮箱已经存在或输入错误', 'error');
                loadingInstance.close();
            }else {
                $("#register-btn").parent().append('<div class="input-error register-error">注册失败</div>');
                Notification('注册失败!', '注册失败，请稍后重试', 'error');
                loadingInstance.close();
            }
        },
        error: function(xhr, status, error) {
            registerEmail.parent().append('<div class="input-error email-error">发生未知错误，请重试或联系网站管理员</div>');
            Notification('注册失败!', '发生未知错误，请重试或联系网站管理员', 'warning');
            Notification('获取数据失败!', error, 'warning');
            loadingInstance.close();
        }
    })
    // closeAuthPanel();
});

// 注册表单密码验证
registerPassword.on('input', function() {
    validatePasswords();
});
registerConfirmPassword.on('input', function() {
    validatePasswords();
});
function validatePasswords() {
    const password = registerPassword.val();
    const confirmPassword = registerConfirmPassword.val();
    // 移除之前的错误提示
    $('.input-error').remove();
    // 只有当确认密码字段有内容时才进行验证
    if (confirmPassword.length > 0) {
        if (password !== confirmPassword) {
            // 密码不匹配，显示错误提示
            // 将错误提示添加到确认密码字段的父容器中
            registerConfirmPassword.parent().append('<div class="input-error password-error">两次输入的密码不一致</div>');
            return false;
        }
    }
    return true;
}

function Message(message,type){
    ElMessage({
        message: message,
        type: type,
        grouping: true,
        duration: 2000,
    })
}

function Notification(title,message,type){
    setTimeout(() => {
        ElNotification({
            title: title,
            message: message,
            type: type,
            duration: 4500,
            // showClose: false,
            position: 'top-left',
        });
    }, 100);
}