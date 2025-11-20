/**
 * 通用提示框组件
 */

// 提示框管理器
class PromptBoxManager {
  constructor() {
    this.containerCenter = null;
    this.containerTopRight = null;
    this.containerTop = null;
    this.initContainers();
  }

  // 初始化容器
  initContainers() {
    // 创建屏幕中心容器
    this.containerCenter = document.createElement('div');
    this.containerCenter.className = 'prompt-box-container prompt-box-center';
    document.body.appendChild(this.containerCenter);

    // 创建右上角容器
    this.containerTopRight = document.createElement('div');
    this.containerTopRight.className = 'prompt-box-container prompt-box-top-right';
    document.body.appendChild(this.containerTopRight);

    // 创建顶部容器
    this.containerTop = document.createElement('div');
    this.containerTop.className = 'prompt-box-container prompt-box-top';
    document.body.appendChild(this.containerTop);
  }

  // 获取对应容器
  getContainer(position) {
    switch (position) {
      case 'center':
        return this.containerCenter;
      case 'top-right':
        return this.containerTopRight;
      case 'top':
        return this.containerTop;
      default:
        return this.containerTopRight;
    }
  }

  // 显示提示框
  showPrompt(type, message, iconAnimated, position = 'top-right') {
    const container = this.getContainer(position);
    
    // 创建提示框元素
    const promptBox = document.createElement('div');
    
    // 设置基础类名，动画效果默认开启
    let className = `prompt-box ${type} fade-in`;
    
    // 如果是center位置，添加特殊布局类
    if (position === 'center') {
      className += ' center-layout';
    }
    
    promptBox.className = className;
    
    // 设置图标
    let iconSymbol = '';
    switch (type) {
      case 'success':
        iconSymbol = '✓';
        break;
      case 'failure':
        iconSymbol = '✕';
        break;
      case 'error':
        iconSymbol = '!';
        break;
    }
    
    // 构建HTML
    promptBox.innerHTML = `
      <div class="prompt-icon">${iconSymbol}</div>
      <div class="prompt-message">${message}</div>
      <button class="prompt-close">&times;</button>
    `;
    
    // 添加关闭事件
    const closeBtn = promptBox.querySelector('.prompt-close');
    closeBtn.addEventListener('click', () => {
      this.hidePrompt(promptBox, true, position);
    });
    
    // 添加到容器
    container.appendChild(promptBox);
    
    // 4秒后自动消失
    setTimeout(() => {
      this.hidePrompt(promptBox, true, position);
    }, 4000);
    
    return promptBox;
  }

  // 隐藏提示框
  hidePrompt(promptBox, animated, position) {
    if (animated) {
      // 添加淡出动画
      if (position === 'center') {
        promptBox.classList.remove('scale-in');
        promptBox.classList.remove('fade-in');
        promptBox.classList.add('scale-out');
      } else if (position === 'top-right') {
        promptBox.classList.remove('slide-in');
        promptBox.classList.remove('fade-in');
        promptBox.classList.add('slide-out');
      } else {
        promptBox.classList.remove('fade-in');
        promptBox.classList.add('fade-out');
      }
      
      // 动画结束后移除元素
      setTimeout(() => {
        if (promptBox.parentNode) {
          promptBox.parentNode.removeChild(promptBox);
        }
      }, 300);
    } else {
      // 直接移除元素
      if (promptBox.parentNode) {
        promptBox.parentNode.removeChild(promptBox);
      }
    }
  }
}

// 创建全局实例
const promptManager = new PromptBoxManager();

/**
 * 显示成功提示框
 * @param {boolean} iconAnimated - 图标是否显示动态效果
 * @param {string} message - 提示信息
 * @param {string} position - 显示位置 ('center', 'top-right', 'top')
 */
function showSuccessPrompt(iconAnimated, message, position = 'top-right') {
  return promptManager.showPrompt('success', message, iconAnimated, position);
}

/**
 * 显示失败提示框
 * @param {boolean} iconAnimated - 图标是否显示动态效果
 * @param {string} message - 提示信息
 * @param {string} position - 显示位置 ('center', 'top-right', 'top')
 */
function showFailurePrompt(iconAnimated, message, position = 'top-right') {
  return promptManager.showPrompt('failure', message, iconAnimated, position);
}

/**
 * 显示错误提示框
 * @param {boolean} iconAnimated - 图标是否显示动态效果
 * @param {string} message - 提示信息
 * @param {string} position - 显示位置 ('center', 'top-right', 'top')
 */
function showErrorPrompt(iconAnimated, message, position = 'top-right') {
  return promptManager.showPrompt('error', message, iconAnimated, position);
}