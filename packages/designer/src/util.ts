/**
 * 使用 requestAnimationFrame 实现的节流函数
 * 适用于与视觉更新相关的操作，如动画、DOM 操作等
 * @param callback 需要节流的函数
 * @returns 节流后的函数
 */
export function throttleRAF<T extends (...args: any[]) => any>(callback: T): (...args: Parameters<T>) => void {
  let requestId: number | null = null;
  
  return function(...args: Parameters<T>) {
    if (requestId === null) {
      requestId = requestAnimationFrame(() => {
        callback(...args);
        requestId = null;
      });
    }
  };
}

/**
 * 使用 requestIdleCallback 实现的节流函数
 * 适用于非关键任务，在浏览器空闲时执行
 * @param callback 需要节流的函数
 * @param options requestIdleCallback 的选项，可以设置超时时间
 * @returns 节流后的函数
 */
export function throttleIdle<T extends (...args: any[]) => any>(
  callback: T, 
  options?: { timeout?: number }
): (...args: Parameters<T>) => void {
  let requestId: number | null = null;
  let lastArgs: Parameters<T> | null = null;
  
  return function(...args: Parameters<T>) {
    lastArgs = args;
    
    if (requestId === null) {
      requestId = requestIdleCallback(
        (deadline) => {
          if (lastArgs) {
            callback(...lastArgs);
            lastArgs = null;
          }
          requestId = null;
        },
        options
      );
    }
  };
}

/**
 * 使用 setTimeout 实现的节流函数
 * 在指定的时间间隔内只执行一次函数
 * @param callback 需要节流的函数
 * @param delay 延迟时间，单位毫秒
 * @returns 节流后的函数
 */
export function throttleTimeout<T extends (...args: any[]) => any>(
  callback: T, 
  delay: number = 200
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;
  
  return function(...args: Parameters<T>) {
    const currentTime = Date.now();
    const remainingTime = delay - (currentTime - lastExecTime);
    
    if (remainingTime <= 0) {
      // 已经超过延迟时间，立即执行
      lastExecTime = currentTime;
      callback(...args);
    } else if (timeoutId === null) {
      // 设置定时器在剩余时间后执行
      timeoutId = setTimeout(() => {
        lastExecTime = Date.now();
        callback(...args);
        timeoutId = null;
      }, remainingTime);
    }
  };
}

// 为了兼容性，添加 requestIdleCallback 的 polyfill
if (typeof window !== 'undefined' && !('requestIdleCallback' in window)) {
  (window as any).requestIdleCallback = function(callback: IdleRequestCallback, options?: IdleRequestOptions) {
    const timeout = options?.timeout || 50;
    return setTimeout(() => {
      const deadline = {
        didTimeout: true,
        timeRemaining: () => 0
      };
      callback(deadline);
    }, timeout);
  };
  
  (window as any).cancelIdleCallback = function(id: number) {
    clearTimeout(id);
  };
}


export function scheduleNextTick<T>(callback: (...args: any[]) => T) {
  return (...args: any[]) => {
    setTimeout(() => {
      callback(...args)
    }, 0)
  }
}

export function nextTick<T>(callback: (...args: any[]) => T) {
  setTimeout(() => {
    callback()
  }, 0)
}
