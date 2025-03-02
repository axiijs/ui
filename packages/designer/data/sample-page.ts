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
  IconNode
} from './types';

// 示例页面数据
export const samplePage: PageNode = {
  id: 'sample-page',
  type: NodeType.PAGE,
  name: '示例页面',
  box: {
    width: '100%',
    height: '100%',
    padding: [
      [24, UnitType.PX], // top
      [24, UnitType.PX], // right
      [24, UnitType.PX], // bottom
      [24, UnitType.PX]  // left
    ],
    overflow: 'auto'
  },
  font: {
    fontFamily: 'Inter, sans-serif',
    fontSize: [16, UnitType.PX],
    color: '#333333',
    lineHeight: [1.5, UnitType.EM]
  },
  children: [
    // 页面标题区域
    {
      id: 'header-section',
      type: NodeType.GROUP,
      name: '页面标题区域',
      box: {
        width: '100%',
        margin: [
          [0, UnitType.PX],  // top
          [0, UnitType.PX],  // right
          [32, UnitType.PX], // bottom
          [0, UnitType.PX]   // left
        ]
      },
      layout: {
        type: LayoutType.COLUMN,
        rowGap: [16, UnitType.PX],
        columnGap: [16, UnitType.PX],
        alignItems: AlignType.START
      },
      children: [
        {
          id: 'page-title',
          type: NodeType.TEXT,
          name: '页面标题',
          content: '欢迎使用设计器',
          font: {
            fontSize: [32, UnitType.PX],
            fontWeight: 700,
            color: '#111111'
          }
        },
        {
          id: 'page-subtitle',
          type: NodeType.TEXT,
          name: '页面副标题',
          content: '这是一个使用types.ts中定义的数据结构创建的示例页面',
          font: {
            fontSize: [18, UnitType.PX],
            fontWeight: 400,
            color: '#666666'
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
        width: '100%'
      },
      layout: {
        type: LayoutType.ROW,
        rowGap: [24, UnitType.PX],
        columnGap: [24, UnitType.PX],
        flexWrap: 'wrap'
      },
      children: [
        // 卡片1
        {
          id: 'card-1',
          type: NodeType.GROUP,
          name: '功能卡片1',
          box: {
            width: [320, UnitType.PX],
            padding: [
              [24, UnitType.PX], // top
              [24, UnitType.PX], // right
              [24, UnitType.PX], // bottom
              [24, UnitType.PX]  // left
            ]
          },
          layout: {
            type: LayoutType.COLUMN,
            rowGap: [16, UnitType.PX],
            columnGap: [16, UnitType.PX],
            alignItems: AlignType.START
          },
          appearance: {
            borderRadius: [8, UnitType.PX]
          },
          fills: [
            {
              type: 'color',
              value: '#f5f5f5'
            }
          ],
          effects: [
            {
              type: 'shadow',
              offsetX: [0, UnitType.PX],
              offsetY: [4, UnitType.PX],
              blur: [12, UnitType.PX],
              spread: [0, UnitType.PX],
              color: 'rgba(0, 0, 0, 0.1)'
            }
          ],
          children: [
            {
              id: 'card-1-icon',
              type: NodeType.ICON,
              name: '卡片1图标',
              iconName: 'star',
              size: [32, UnitType.PX],
              color: '#4285F4'
            },
            {
              id: 'card-1-title',
              type: NodeType.TEXT,
              name: '卡片1标题',
              content: '功能一',
              font: {
                fontSize: [20, UnitType.PX],
                fontWeight: 600,
                color: '#333333'
              }
            },
            {
              id: 'card-1-description',
              type: NodeType.TEXT,
              name: '卡片1描述',
              content: '这是功能一的详细描述，介绍了该功能的主要用途和优势。',
              font: {
                fontSize: [14, UnitType.PX],
                color: '#666666',
                lineHeight: [1.6, UnitType.EM]
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
            width: [320, UnitType.PX],
            padding: [
              [24, UnitType.PX], // top
              [24, UnitType.PX], // right
              [24, UnitType.PX], // bottom
              [24, UnitType.PX]  // left
            ]
          },
          layout: {
            type: LayoutType.COLUMN,
            rowGap: [16, UnitType.PX],
            columnGap: [16, UnitType.PX],
            alignItems: AlignType.START
          },
          appearance: {
            borderRadius: [8, UnitType.PX]
          },
          fills: [
            {
              type: 'color',
              value: '#f5f5f5'
            }
          ],
          effects: [
            {
              type: 'shadow',
              offsetX: [0, UnitType.PX],
              offsetY: [4, UnitType.PX],
              blur: [12, UnitType.PX],
              spread: [0, UnitType.PX],
              color: 'rgba(0, 0, 0, 0.1)'
            }
          ],
          children: [
            {
              id: 'card-2-icon',
              type: NodeType.ICON,
              name: '卡片2图标',
              iconName: 'settings',
              size: [32, UnitType.PX],
              color: '#34A853'
            },
            {
              id: 'card-2-title',
              type: NodeType.TEXT,
              name: '卡片2标题',
              content: '功能二',
              font: {
                fontSize: [20, UnitType.PX],
                fontWeight: 600,
                color: '#333333'
              }
            },
            {
              id: 'card-2-description',
              type: NodeType.TEXT,
              name: '卡片2描述',
              content: '这是功能二的详细描述，介绍了该功能的主要用途和优势。',
              font: {
                fontSize: [14, UnitType.PX],
                color: '#666666',
                lineHeight: [1.6, UnitType.EM]
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
            width: [320, UnitType.PX],
            padding: [
              [24, UnitType.PX], // top
              [24, UnitType.PX], // right
              [24, UnitType.PX], // bottom
              [24, UnitType.PX]  // left
            ]
          },
          layout: {
            type: LayoutType.COLUMN,
            rowGap: [16, UnitType.PX],
            columnGap: [16, UnitType.PX],
            alignItems: AlignType.START
          },
          appearance: {
            borderRadius: [8, UnitType.PX]
          },
          fills: [
            {
              type: 'color',
              value: '#f5f5f5'
            }
          ],
          effects: [
            {
              type: 'shadow',
              offsetX: [0, UnitType.PX],
              offsetY: [4, UnitType.PX],
              blur: [12, UnitType.PX],
              spread: [0, UnitType.PX],
              color: 'rgba(0, 0, 0, 0.1)'
            }
          ],
          children: [
            {
              id: 'card-3-icon',
              type: NodeType.ICON,
              name: '卡片3图标',
              iconName: 'bolt',
              size: [32, UnitType.PX],
              color: '#FBBC05'
            },
            {
              id: 'card-3-title',
              type: NodeType.TEXT,
              name: '卡片3标题',
              content: '功能三',
              font: {
                fontSize: [20, UnitType.PX],
                fontWeight: 600,
                color: '#333333'
              }
            },
            {
              id: 'card-3-description',
              type: NodeType.TEXT,
              name: '卡片3描述',
              content: '这是功能三的详细描述，介绍了该功能的主要用途和优势。',
              font: {
                fontSize: [14, UnitType.PX],
                color: '#666666',
                lineHeight: [1.6, UnitType.EM]
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
        width: '100%',
        margin: [
          [48, UnitType.PX], // top
          [0, UnitType.PX],  // right
          [0, UnitType.PX],  // bottom
          [0, UnitType.PX]   // left
        ]
      },
      layout: {
        type: LayoutType.ROW,
        justifyContent: AlignType.CENTER,
        alignItems: AlignType.CENTER
      },
      children: [
        {
          id: 'footer-text',
          type: NodeType.TEXT,
          name: '底部文本',
          content: '© 2023 设计器示例 - 使用types.ts中的数据结构创建',
          font: {
            fontSize: [14, UnitType.PX],
            color: '#999999'
          }
        }
      ]
    }
  ]
};

export default samplePage; 