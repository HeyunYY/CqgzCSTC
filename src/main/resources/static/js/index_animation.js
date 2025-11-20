// 视差滚动动画效果

// 初始化函数
function initScrollAnimations() {
    // 获取所有需要动画的元素
    const animateElements = document.querySelectorAll(
        '.section-title, .service-card, .project-card, .team-member, .about-text, .carousel-container, .other-members'
    );
    
    // 为每个元素添加初始动画类
    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
    });
    
    // 创建交叉观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 当元素进入视口时，添加动画类
                entry.target.classList.add('animate');
                
                // 可选：观察一次后停止观察该元素
                // observer.unobserve(entry.target);
            }
            // 注意：此处不移除animate类，确保动画只播放一次
        });
    }, {
        threshold: 0.1, // 当10%的元素可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前50px触发
    });
    
    // 开始观察所有动画元素
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// 页面加载完成后初始化滚动动画
document.addEventListener('DOMContentLoaded', function() {
    // 等待一小段时间确保页面渲染完成
    setTimeout(initScrollAnimations, 100);
});

// 如果页面已经加载完成，则直接初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    // DOM已经加载完成
    initScrollAnimations();
}