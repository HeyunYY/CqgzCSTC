const {ElMessageBox} = window.ElementPlus;
// Ajax开始时启动进度条
$(document).ajaxStart(function() {
    NProgress.start();
});

// Ajax结束时完成进度条
$(document).ajaxStop(function() {
    //等待
    setTimeout(function() {
        NProgress.done();
    }, 100)
    // NProgress.done();
});

// DOM准备就绪时启动进度条
$(document).ready(function() {
    NProgress.start();
});

// 页面完全加载时完成进度条
$(window).load(function() {
    setTimeout(function() {
        NProgress.done();
    }, 100)
    ElMessageBox({
        title: '欢迎访问CSTC Official Website！',
        message: '本站为学校社团专属网站，仅供本校学生及教师交流使用',
        center: true,
        showClose: false,
        type: 'primary',
    }).then(() => {
        ElMessageBox({
            title: '特别提示',
            message: '本站目前为更新测试阶段，功能完善度较低，如遇BUG请于CSTC交流群中反馈！万分感谢！',
            center: true,
            showClose: false,
            type: 'warning',
        })
    })
});

// 导航栏滚动效果
$(window).on('scroll', function() {
    const $header = $('header');
    if ($(window).scrollTop() > 50) {
        $header.css({
            'padding': '5px 0',
            'box-shadow': '0 2px 20px rgba(66, 133, 244, 0.3)'
        });
    } else {
        $header.css({
            'padding': '0',
            'box-shadow': '0 2px 20px rgba(66, 133, 244, 0.2)'
        });
    }
});

// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // 添加旋转动画类
    this.classList.toggle('rotated');
    
    // 切换汉堡包图标
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 点击导航链接时自动折叠菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // 移除active类以折叠菜单
        navLinks.classList.remove('active');
        
        // 移除旋转类
        mobileMenuBtn.classList.remove('rotated');
        
        // 恢复汉堡包图标
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 登录/注册面板功能
const $loginBtn = $('#loginBtn');
const $registerBtn = $('#registerBtn');
const $closeAuth = $('#closeAuth');
const $authPanel = $('#authPanel');
const $authTabs = $('.auth-tab');
const $authContents = $('.auth-content');
const $authTitle = $('#authTitle');
const $mainContent = $('main');

function openAuthPanel(tab) {
    $authPanel.addClass('active');
    $mainContent.css('transform', 'translateX(-200px)');
    $('body').css('overflow', 'hidden');

    // 切换到指定标签
    if (tab === 'register') {
        switchAuthTab('register');
    } else {
        switchAuthTab('login');
    }
}

function closeAuthPanel() {
    $authPanel.removeClass('active');
    $mainContent.css('transform', 'translateX(0)');
    $('body').css('overflow', 'auto');
}

function switchAuthTab(tab) {
    // 更新标签状态
    $authTabs.each(function() {
        if ($(this).data('tab') === tab) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    // 更新内容显示
    $authContents.each(function() {
        if (this.id === `${tab}Content`) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    // 更新标题
    $authTitle.text(tab === 'login' ? '登录' : '注册');
}

$loginBtn.on('click', function() {
    openAuthPanel('login');
});

$registerBtn.on('click', function() {
    openAuthPanel('register');
});

$closeAuth.on('click', closeAuthPanel);

// 标签切换
$authTabs.each(function() {
    $(this).on('click', function() {
        const tabName = $(this).data('tab');
        switchAuthTab(tabName);
    });
});


// 轮播图功能
const $carousel = $('#carousel');
const $carouselItems = $('.carousel-item');
const $carouselIndicators = $('.carousel-indicator');
const $carouselPrev = $('#carouselPrev');
const $carouselNext = $('#carouselNext');

let currentIndex = 0;
const totalItems = $carouselItems.length;

function updateCarousel() {
    $carousel.css('transform', `translateX(-${currentIndex * 100}%)`);

    // 更新指示器状态
    $carouselIndicators.each(function(index) {
        if (index === currentIndex) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// 自动轮播
let autoSlide = setInterval(nextSlide, 5000);

// 鼠标悬停时暂停自动轮播
const $carouselContainer = $('.carousel-container');
$carouselContainer.on('mouseenter', () => {
    clearInterval(autoSlide);
});

$carouselContainer.on('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// 按钮事件
$carouselNext.on('click', nextSlide);
$carouselPrev.on('click', prevSlide);

// 指示器点击事件
$carouselIndicators.each(function() {
    $(this).on('click', function() {
        currentIndex = parseInt($(this).attr('data-index'));
        updateCarousel();
    });
});

// 页面加载动画
$(window).on('load', function() {
    $('body').addClass('loaded');
});

// FAQ功能
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentNode;
        faqItem.classList.toggle('active');
    });
});
