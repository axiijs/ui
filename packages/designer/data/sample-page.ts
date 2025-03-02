/**
 * 示例页面数据
 * 使用types.ts中定义的数据结构
 */

import {
  NodeType,
  LayoutType,
  AlignType,
  UnitType,
  PageNode,
  GroupNode,
  TextNode,
  IconNode,
  VariableValue
} from './types';

// 示例页面数据
export const samplePage: PageNode = {
  id: 'sample-page',
  type: NodeType.PAGE,
  name: '示例页面',
  box: {
    width: { value: [1200, UnitType.PX] },
    height: { value: [800, UnitType.PX] },
    padding: { value: [[20, UnitType.PX], [20, UnitType.PX], [20, UnitType.PX], [20, UnitType.PX]] }
  },
  layout: {
    type: { value: LayoutType.COLUMN },
    rowGap: { value: [20, UnitType.PX] },
    justifyContent: { value: AlignType.START },
    alignItems: { value: AlignType.START }
  },
  font: {
    fontFamily: { value: 'Inter, sans-serif' },
    fontSize: { value: [16, UnitType.PX] },
    color: { value: '#333333' },
    lineHeight: { value: [1.5, UnitType.EM] }
  },
  children: [
    // 页面标题区域
    {
      id: 'header-section',
      type: NodeType.GROUP,
      name: '页面标题区域',
      box: {
        width: { value: [1160, UnitType.PX] },
        height: { value: [60, UnitType.PX] }
      },
      layout: {
        type: { value: LayoutType.ROW },
        justifyContent: { value: AlignType.SPACE_BETWEEN },
        alignItems: { value: AlignType.CENTER }
      },
      children: [
        {
          id: 'page-title',
          type: NodeType.TEXT,
          name: '页面标题',
          content: { value: '欢迎使用设计器' },
          font: {
            fontSize: { value: [32, UnitType.PX] },
            fontWeight: { value: 700 },
            color: { value: '#111111' }
          }
        },
        {
          id: 'page-subtitle',
          type: NodeType.TEXT,
          name: '页面副标题',
          content: { value: '这是一个使用types.ts中定义的数据结构创建的示例页面' },
          font: {
            fontSize: { value: [18, UnitType.PX] },
            fontWeight: { value: 400 },
            color: { value: '#666666' }
          }
        }
      ]
    },
    
    // 主要内容区域
    {
      id: 'main-content',
      type: NodeType.GROUP,
      name: '主要内容区域',
      box: {
        width: { value: [1160, UnitType.PX] },
        flexGrow: { value: 1 }
      },
      layout: {
        type: { value: LayoutType.COLUMN },
        rowGap: { value: [20, UnitType.PX] }
      },
      children: [
        // 卡片1
        {
          id: 'card-1',
          type: NodeType.GROUP,
          name: '功能卡片1',
          box: {
            width: { value: [320, UnitType.PX] },
            padding: { 
              value: [
                [24, UnitType.PX], // top
                [24, UnitType.PX], // right
                [24, UnitType.PX], // bottom
                [24, UnitType.PX]  // left
              ]
            }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [16, UnitType.PX] },
            columnGap: { value: [16, UnitType.PX] },
            alignItems: { value: AlignType.START }
          },
          appearance: {
            borderRadius: { value: [8, UnitType.PX] }
          },
          fills: [
            {
              type: { value: 'color' },
              value: { value: '#f5f5f5' }
            }
          ],
          effects: [
            {
              type: { value: 'shadow' },
              offsetX: { value: [0, UnitType.PX] },
              offsetY: { value: [4, UnitType.PX] },
              blur: { value: [12, UnitType.PX] },
              spread: { value: [0, UnitType.PX] },
              color: { value: 'rgba(0, 0, 0, 0.1)' }
            }
          ],
          children: [
            {
              id: 'card-1-icon',
              type: NodeType.ICON,
              name: '卡片1图标',
              iconName: 'star',
              size: { value: [32, UnitType.PX] },
              color: { value: '#4285F4' }
            },
            {
              id: 'card-1-title',
              type: NodeType.TEXT,
              name: '卡片1标题',
              content: { value: '功能一' },
              font: {
                fontSize: { value: [20, UnitType.PX] },
                fontWeight: { value: 600 },
                color: { value: '#333333' }
              }
            },
            {
              id: 'card-1-description',
              type: NodeType.TEXT,
              name: '卡片1描述',
              content: { value: '这是功能一的详细描述，介绍了该功能的主要用途和优势。' },
              font: {
                fontSize: { value: [14, UnitType.PX] },
                color: { value: '#666666' },
                lineHeight: { value: [1.6, UnitType.EM] }
              }
            }
          ]
        },
        
        // 卡片2
        {
          id: 'card-2',
          type: NodeType.GROUP,
          name: '功能卡片2',
          box: {
            width: { value: [320, UnitType.PX] },
            padding: { 
              value: [
                [24, UnitType.PX], // top
                [24, UnitType.PX], // right
                [24, UnitType.PX], // bottom
                [24, UnitType.PX]  // left
              ]
            }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [16, UnitType.PX] },
            columnGap: { value: [16, UnitType.PX] },
            alignItems: { value: AlignType.START }
          },
          appearance: {
            borderRadius: { value: [8, UnitType.PX] }
          },
          fills: [
            {
              type: { value: 'color' },
              value: { value: '#f5f5f5' }
            }
          ],
          effects: [
            {
              type: { value: 'shadow' },
              offsetX: { value: [0, UnitType.PX] },
              offsetY: { value: [4, UnitType.PX] },
              blur: { value: [12, UnitType.PX] },
              spread: { value: [0, UnitType.PX] },
              color: { value: 'rgba(0, 0, 0, 0.1)' }
            }
          ],
          children: [
            {
              id: 'card-2-icon',
              type: NodeType.ICON,
              name: '卡片2图标',
              iconName: 'settings',
              size: { value: [32, UnitType.PX] },
              color: { value: '#34A853' }
            },
            {
              id: 'card-2-title',
              type: NodeType.TEXT,
              name: '卡片2标题',
              content: { value: '功能二' },
              font: {
                fontSize: { value: [20, UnitType.PX] },
                fontWeight: { value: 600 },
                color: { value: '#333333' }
              }
            },
            {
              id: 'card-2-description',
              type: NodeType.TEXT,
              name: '卡片2描述',
              content: { value: '这是功能二的详细描述，介绍了该功能的主要用途和优势。' },
              font: {
                fontSize: { value: [14, UnitType.PX] },
                color: { value: '#666666' },
                lineHeight: { value: [1.6, UnitType.EM] }
              }
            }
          ]
        },
        
        // 卡片3
        {
          id: 'card-3',
          type: NodeType.GROUP,
          name: '功能卡片3',
          box: {
            width: { value: [320, UnitType.PX] },
            padding: { 
              value: [
                [24, UnitType.PX], // top
                [24, UnitType.PX], // right
                [24, UnitType.PX], // bottom
                [24, UnitType.PX]  // left
              ]
            }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [16, UnitType.PX] },
            columnGap: { value: [16, UnitType.PX] },
            alignItems: { value: AlignType.START }
          },
          appearance: {
            borderRadius: { value: [8, UnitType.PX] }
          },
          fills: [
            {
              type: { value: 'color' },
              value: { value: '#f5f5f5' }
            }
          ],
          effects: [
            {
              type: { value: 'shadow' },
              offsetX: { value: [0, UnitType.PX] },
              offsetY: { value: [4, UnitType.PX] },
              blur: { value: [12, UnitType.PX] },
              spread: { value: [0, UnitType.PX] },
              color: { value: 'rgba(0, 0, 0, 0.1)' }
            }
          ],
          children: [
            {
              id: 'card-3-icon',
              type: NodeType.ICON,
              name: '卡片3图标',
              iconName: 'description',
              size: { value: [32, UnitType.PX] },
              color: { value: '#FBBC05' }
            },
            {
              id: 'card-3-title',
              type: NodeType.TEXT,
              name: '卡片3标题',
              content: { value: '功能三' },
              font: {
                fontSize: { value: [20, UnitType.PX] },
                fontWeight: { value: 600 },
                color: { value: '#333333' }
              }
            },
            {
              id: 'card-3-description',
              type: NodeType.TEXT,
              name: '卡片3描述',
              content: { value: '这是功能三的详细描述，介绍了该功能的主要用途和优势。' },
              font: {
                fontSize: { value: [14, UnitType.PX] },
                color: { value: '#666666' },
                lineHeight: { value: [1.6, UnitType.EM] }
              }
            }
          ]
        }
      ]
    },
    
    // 底部区域
    {
      id: 'footer-section',
      type: NodeType.GROUP,
      name: '底部区域',
      box: {
        width: { value: [1160, UnitType.PX] },
        height: { value: [60, UnitType.PX] }
      },
      layout: {
        type: { value: LayoutType.ROW },
        justifyContent: { value: AlignType.SPACE_BETWEEN },
        alignItems: { value: AlignType.CENTER }
      },
      children: [
        {
          id: 'footer-text',
          type: NodeType.TEXT,
          name: '底部文本',
          content: { value: '© 2023 示例页面 - 保留所有权利' },
          font: {
            fontSize: { value: [14, UnitType.PX] },
            color: { value: '#999999' }
          }
        }
      ]
    }
  ]
};

export default samplePage; 