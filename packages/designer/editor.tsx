/**
 * DOM 画布工具
 * 支持以鼠标位置为中心的缩放和滚动功能
 */

class CanvasEditor {
  private container: HTMLElement;
  private canvas: HTMLElement;
  private scale: number = 1;
  private minScale: number = 0.1;
  private maxScale: number = 10;
  private scaleStep: number = 0.1;

  constructor(containerId: string) {
    // 获取容器元素
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;
    
    // 设置容器样式
    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    
    // 创建画布元素
    this.canvas = document.createElement('div');
    this.canvas.className = 'editor-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.transformOrigin = '0 0';
    this.canvas.style.width = '2000px';
    this.canvas.style.height = '2000px';
    this.canvas.style.backgroundColor = '#f0f0f0';
    
    // 添加网格背景以便于观察
    this.canvas.style.backgroundImage = 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)';
    this.canvas.style.backgroundSize = '20px 20px';
    
    // 将画布添加到容器中
    this.container.appendChild(this.canvas);
    
    // 绑定事件
    this.bindEvents();
    
    // 添加一些示例内容
    this.addSampleContent();
    this.bindHistoryEvents();
  }

  private bindEvents(): void {
    // 监听鼠标滚轮事件，只有按下 Ctrl 键时才触发缩放
    this.container.addEventListener('wheel', (event: WheelEvent) => {
      // 只有当按下 Ctrl 键时才执行缩放逻辑
      if (event.ctrlKey) {
        event.preventDefault();
        this.handleWheel(event);
      }
      // 不按 Ctrl 键时保持默认滚动行为
    }, { passive: false });
  }

  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    
    // 获取鼠标在容器中的位置
    const rect = this.container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left + this.container.scrollLeft;
    const mouseY = event.clientY - rect.top + this.container.scrollTop;
    
    // 计算鼠标在画布上的位置（考虑当前缩放）
    const canvasX = mouseX / this.scale;
    const canvasY = mouseY / this.scale;
    
    // 计算新的缩放比例
    let newScale = this.scale;
    if (event.deltaY < 0) {
      // 放大
      newScale = Math.min(this.scale + this.scaleStep, this.maxScale);
    } else {
      // 缩小
      newScale = Math.max(this.scale - this.scaleStep, this.minScale);
    }
    
    // 如果缩放比例没有变化，则不进行操作
    if (newScale === this.scale) return;
    
    // 更新缩放比例
    this.scale = newScale;
    
    // 应用缩放
    this.canvas.style.transform = `scale(${this.scale})`;
    
    // 计算新的滚动位置，以保持鼠标位置不变
    const newScrollLeft = canvasX * this.scale - (event.clientX - rect.left);
    const newScrollTop = canvasY * this.scale - (event.clientY - rect.top);
    
    if (this.scale > 1) {
      // 设置新的滚动位置
      this.container.scrollLeft = Math.max(newScrollLeft, 0);
      this.container.scrollTop = Math.max(newScrollTop, 0);
      this.container.style.paddingLeft = `${-newScrollLeft}px`;
      this.container.style.paddingTop = `${-newScrollTop}px`;
    } else {
      // 计算 trasform origin 百分比，通过修改该 transform origin 来保持鼠标位置不变
      const transformOrigin = `${event.clientX / this.canvas.offsetWidth * 100}% ${event.clientY / this.canvas.offsetHeight * 100}%`;
      console.log('scale < 1', transformOrigin);

      this.canvas.style.transformOrigin = transformOrigin;
    }
    
  }
  private bindHistoryEvents(): void {
    // 在构造函数中初始化时先push一个状态
    window.history.pushState(null, '', window.location.href);

    // 监听 popstate 事件（后退按钮触发）
    window.addEventListener('popstate', (event) => {
      // 阻止后退，重新push一个状态
      window.history.pushState(null, '', window.location.href);
    });
  }

  private addSampleContent(): void {
    // 添加一些示例元素到画布中
    for (let i = 0; i < 10; i++) {
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = `${Math.random() * 1800 + 100}px`;
      element.style.top = `${Math.random() * 1800 + 100}px`;
      element.style.width = '100px';
      element.style.height = '100px';
      element.style.backgroundColor = this.getRandomColor();
      element.style.border = '1px solid #333';
      element.style.display = 'flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
      element.textContent = `元素 ${i + 1}`;
      
      this.canvas.appendChild(element);
    }
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // 公共方法：重置画布缩放和位置
  public reset(): void {
    this.scale = 1;
    this.canvas.style.transform = 'scale(1)';
    this.container.scrollLeft = 0;
    this.container.scrollTop = 0;
  }

  // 公共方法：设置缩放比例
  public setScale(scale: number): void {
    this.scale = Math.max(this.minScale, Math.min(scale, this.maxScale));
    this.canvas.style.transform = `scale(${this.scale})`;
  }

  // 公共方法：获取当前缩放比例
  public getScale(): number {
    return this.scale;
  }
}

// 导出类以便使用
export default CanvasEditor;

// 使用示例
// const editor = new CanvasEditor('editor-container');
const canvas = new CanvasEditor('root');