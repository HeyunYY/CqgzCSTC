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