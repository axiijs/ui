import {
  atom,
  Component,
  FixedCompatiblePropsType,
  PropsType,
  PropTypes,
  RenderContext
} from "axii";

type InputOTPPropTypes = {
  value: string;
  length?: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  mask?: boolean;
};

const InputOTPPropTypes = {
  value: PropTypes.atom<string>().default(() => atom('')),
  length: PropTypes.atom<number>().default(() => atom(6)),
  onChange: PropTypes.function,
  placeholder: PropTypes.atom<string>().default(() => atom('-')),
  disabled: PropTypes.atom<boolean>().default(() => atom(false)),
  mask: PropTypes.atom<boolean>().default(() => atom(false)),
};

export const InputOTP: Component = function(props: FixedCompatiblePropsType<typeof InputOTPPropTypes>, { createElement }: RenderContext) {
  const { value, length, onChange, placeholder, disabled, mask } = props as PropsType<typeof InputOTPPropTypes>;
  
  // 当前聚焦的输入框索引
  const focusIndex = atom(-1);
  
  const rootStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
  };
  
  const cellStyle = (index: number) => {
    const isFocused = focusIndex() === index;
    const hasValue = value().length > index;
    
    return {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${isFocused ? '#1677ff' : '#d9d9d9'}`,
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: disabled() ? '#f5f5f5' : 'white',
      color: disabled() ? '#bfbfbf' : '#000',
      cursor: disabled() ? 'not-allowed' : 'text',
      transition: 'all 0.2s',
      boxShadow: isFocused ? '0 0 0 2px rgba(24, 144, 255, 0.2)' : 'none',
      ':hover': {
        borderColor: !disabled() ? '#1677ff' : '#d9d9d9',
      },
    };
  };
  
  // 处理输入框点击
  const handleCellClick = (index: number) => {
    if (disabled()) return;
    focusIndex(index);
  };
  
  // 处理键盘输入
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled()) return;
    
    const currentIndex = focusIndex();
    if (currentIndex === -1) return;
    
    // 处理数字输入
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const newValue = value().split('');
      newValue[currentIndex] = e.key;
      
      // 更新值
      value(newValue.join(''));
      
      // 触发onChange回调
      if (onChange) {
        onChange(newValue.join(''));
      }
      
      // 自动聚焦下一个输入框
      if (currentIndex < length() - 1) {
        focusIndex(currentIndex + 1);
      }
    }
    // 处理删除键
    else if (e.key === 'Backspace') {
      e.preventDefault();
      const newValue = value().split('');
      
      // 如果当前位置有值，则删除当前位置的值
      if (newValue[currentIndex]) {
        newValue[currentIndex] = '';
        value(newValue.join(''));
        
        // 触发onChange回调
        if (onChange) {
          onChange(newValue.join(''));
        }
      } 
      // 否则聚焦到前一个输入框
      else if (currentIndex > 0) {
        focusIndex(currentIndex - 1);
      }
    }
    // 处理左右箭头键
    else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      focusIndex(currentIndex - 1);
    }
    else if (e.key === 'ArrowRight' && currentIndex < length() - 1) {
      e.preventDefault();
      focusIndex(currentIndex + 1);
    }
  };
  
  // 渲染输入单元格
  const renderCells = () => {
    const cells = [];
    const valueArray = value().split('');
    
    for (let i = 0; i < length(); i++) {
      const cellValue = valueArray[i] || '';
      cells.push(
        <div 
          key={`cell-${i}`}
          as="cell" 
          style={cellStyle(i)} 
          onClick={() => handleCellClick(i)}
          tabIndex={0}
        >
          {cellValue ? (mask() ? '•' : cellValue) : placeholder()}
        </div>
      );
    }
    
    return cells;
  };
  
  // 添加键盘事件监听
  const handleMount = (el: HTMLElement) => {
    if (el) {
      el.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      if (el) {
        el.removeEventListener('keydown', handleKeyDown);
      }
    };
  };
  
  return (
    <div as="root" style={rootStyle} ref={handleMount}>
      {renderCells()}
    </div>
  );
};

InputOTP.propTypes = InputOTPPropTypes;
