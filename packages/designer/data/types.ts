/**
 * 画布图层数据结构类型定义
 * 支持三种节点类型：group、text、icon
 */

// 节点类型枚举
export enum NodeType {
  PAGE = 'page',
  GROUP = 'group',
  TEXT = 'text',
  ICON = 'icon'
}

// 布局类型枚举
export enum LayoutType {
  ROW = 'row',
  COLUMN = 'column',
  GRID = 'grid'
}

// 对齐方式枚举
export enum AlignType {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly'
}

// 单位类型枚举
export enum UnitType {
  PX = 'px',
  REM = 'rem',
  EM = 'em',
  VH = 'vh',
  VW = 'vw',
  PERCENT = "%"
}

// 支持变量的值类型
export interface VariableValue<T> {
  value: T;
  variable?: string;
}

// 盒模型信息接口
export interface BoxInfo {
  width?: VariableValue<[number, UnitType]>; 
  height?: VariableValue<[number, UnitType]>;
  minWidth?: VariableValue<[number, UnitType]>;
  maxWidth?: VariableValue<[number, UnitType]>;
  minHeight?: VariableValue<[number, UnitType]>;
  maxHeight?: VariableValue<[number, UnitType]>;
  padding?: VariableValue<[[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]]>; // [top, right, bottom, left]
  margin?: VariableValue<[[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]]>; // [top, right, bottom, left]
  overflow?: VariableValue<'visible' | 'hidden' | 'scroll' | 'auto'>;
  flexGrow?: VariableValue<number>;
  flexShrink?: VariableValue<number>;
  flexBasis?: VariableValue<[number, UnitType]>;
}

// 布局信息接口
export interface LayoutInfo {
  type: VariableValue<LayoutType>;
  rowGap?: VariableValue<[number, UnitType]>;
  columnGap?: VariableValue<[number, UnitType]>;
  justifyContent?: VariableValue<AlignType>;
  alignItems?: VariableValue<AlignType>;
  flexWrap?: VariableValue<'nowrap' | 'wrap' | 'wrap-reverse'>;
  // Grid 特有属性
  gridTemplateColumns?: VariableValue<string>;
  gridTemplateRows?: VariableValue<string>;
  gridAutoFlow?: VariableValue<'row' | 'column' | 'dense'>;
}

// 外观信息接口
export interface AppearanceInfo {
  opacity?: VariableValue<[number, string]>; // 0-1
  borderRadius?: VariableValue<[number, UnitType]>;
  visibility?: VariableValue<'visible' | 'hidden'>;
  zIndex?: VariableValue<[number, string]>;
}

// 描边信息接口
export interface StrokeInfo {
  width: VariableValue<[number, UnitType]>;
  style: VariableValue<'solid' | 'dashed' | 'dotted' | 'double'>;
  color: VariableValue<string>;
}

// 填充信息接口
export interface FillInfo {
  type: VariableValue<'color' | 'gradient' | 'image'>;
  value: VariableValue<string>; // 颜色值、渐变值或图片URL
}

// 效果信息接口
export interface EffectInfo {
  type: VariableValue<'shadow' | 'blur'>;
  // 阴影属性
  offsetX?: VariableValue<[number, UnitType]>;
  offsetY?: VariableValue<[number, UnitType]>;
  blur?: VariableValue<[number, UnitType]>;
  spread?: VariableValue<[number, UnitType]>;
  color?: VariableValue<string>;
  inset?: VariableValue<boolean>;
  // 模糊属性
  blurAmount?: VariableValue<[number, UnitType]>;
}

// 字体信息接口
export interface FontInfo {
  fontSize?: VariableValue<[number, UnitType]>;
  fontFamily?: VariableValue<string>;
  fontWeight?: VariableValue<number>;
  fontStyle?: VariableValue<'normal' | 'italic'>;
  textDecoration?: VariableValue<'none' | 'underline' | 'line-through'>;
  textAlign?: VariableValue<'left' | 'center' | 'right' | 'justify'>;
  color?: VariableValue<string>;
  lineHeight?: VariableValue<[number, UnitType]>;
  letterSpacing?: VariableValue<[number, UnitType]>;
  wordSpacing?: VariableValue<[number, UnitType]>;
  textTransform?: VariableValue<'none' | 'capitalize' | 'uppercase' | 'lowercase'>;
  fontVariant?: VariableValue<'normal' | 'small-caps'>;
  fontStretch?: VariableValue<'normal' | 'condensed' | 'expanded'>;
}

// 文本布局信息接口
export interface TextLayoutInfo {
  whiteSpace?: VariableValue<'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'>;
  textOverflow?: VariableValue<'clip' | 'ellipsis'>;
  wordBreak?: VariableValue<'normal' | 'break-all' | 'keep-all' | 'break-word'>;
  overflowWrap?: VariableValue<'normal' | 'break-word'>;
  hyphens?: VariableValue<'none' | 'manual' | 'auto'>;
  direction?: VariableValue<'ltr' | 'rtl'>;
  textIndent?: VariableValue<[number, UnitType]>;
}

// 基础节点接口
export interface BaseNode {
  id: string;
  type: NodeType;
  name: string;
  position?: {
    x: [number, UnitType];
    y: [number, UnitType];
  };
}

// 文本节点接口
export interface TextNode extends BaseNode {
  type: NodeType.TEXT;
  content: VariableValue<string>;
  font?: FontInfo;
  box?: BoxInfo;
  textLayout?: TextLayoutInfo;
}

// 图标节点接口
export interface IconNode extends BaseNode {
  type: NodeType.ICON;
  iconName: string;
  size?: VariableValue<[number, UnitType]>;
  color?: VariableValue<string>;
  box?: BoxInfo;
}

// 页面节点接口
export interface PageNode extends BaseNode {
  type: NodeType.PAGE;
  children: Node[];
  box?: BoxInfo;
  layout?: LayoutInfo;
  fills?: FillInfo[];
  font?: FontInfo;
}

// 组节点接口
export interface GroupNode extends BaseNode {
  type: NodeType.GROUP;
  children: Node[];
  box?: BoxInfo;
  layout?: LayoutInfo;
  appearance?: AppearanceInfo;
  strokes?: StrokeInfo[];
  fills?: FillInfo[];
  effects?: EffectInfo[];
}

// 节点类型联合
export type Node = GroupNode | TextNode | IconNode | PageNode; 