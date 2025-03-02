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

// 盒模型信息接口
export interface BoxInfo {
  width?: [number, UnitType] ; 
  height?: [number, UnitType] ;
  minWidth?: [number, UnitType] ;
  maxWidth?: [number, UnitType] ;
  minHeight?: [number, UnitType];
  maxHeight?: [number, UnitType];
  padding?: [[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]]; // [top, right, bottom, left]
  margin?: [[number, UnitType], [number, UnitType], [number, UnitType], [number, UnitType]]; // [top, right, bottom, left]
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: [number, UnitType];
}

// 布局信息接口
export interface LayoutInfo {
  type: LayoutType;
  rowGap?: [number, UnitType];
  columnGap?: [number, UnitType];
  justifyContent?: AlignType;
  alignItems?: AlignType;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  // Grid 特有属性
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridAutoFlow?: 'row' | 'column' | 'dense';
}

// 外观信息接口
export interface AppearanceInfo {
  opacity?: [number, string]; // 0-1
  borderRadius?: [number, UnitType] | string;
  visibility?: 'visible' | 'hidden';
  zIndex?: [number, string];
}

// 描边信息接口
export interface StrokeInfo {
  width: [number, UnitType];
  style: 'solid' | 'dashed' | 'dotted' | 'double';
  color: string;
}

// 填充信息接口
export interface FillInfo {
  type: 'color' | 'gradient' | 'image';
  value: string; // 颜色值、渐变值或图片URL
}

// 效果信息接口
export interface EffectInfo {
  type: 'shadow' | 'blur';
  // 阴影属性
  offsetX?: [number, UnitType];
  offsetY?: [number, UnitType];
  blur?: [number, UnitType];
  spread?: [number, UnitType];
  color?: string;
  inset?: boolean;
  // 模糊属性
  blurAmount?: [number, UnitType];
}

// 字体信息接口
export interface FontInfo {
  fontSize?: [number, UnitType];
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline' | 'line-through';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  lineHeight?: [number, UnitType];
  letterSpacing?: [number, UnitType];
  wordSpacing?: [number, UnitType];
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  fontVariant?: 'normal' | 'small-caps';
  fontStretch?: 'normal' | 'condensed' | 'expanded';
}

// 文本布局信息接口
export interface TextLayoutInfo {
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  textOverflow?: 'clip' | 'ellipsis';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  overflowWrap?: 'normal' | 'break-word';
  hyphens?: 'none' | 'manual' | 'auto';
  direction?: 'ltr' | 'rtl';
  textIndent?: [number, UnitType];
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
  content: string;
  font?: FontInfo;
  box?: BoxInfo;
  textLayout?: TextLayoutInfo;
}

// 图标节点接口
export interface IconNode extends BaseNode {
  type: NodeType.ICON;
  iconName: string;
  size?: [number, UnitType];
  color?: string;
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