/**
 * 截图描述数据
 * 使用types.ts中定义的数据结构描述Screenshot 2025-02-28 at 21.41.33.png
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

// 截图页面数据描述
export const screenshotDescription: PageNode = {
  id: 'screenshot-page',
  type: NodeType.PAGE,
  name: '截图页面',
  box: {
    width: { value: [100, UnitType.PERCENT] },
    height: { value: [100, UnitType.PERCENT] },
    padding: {
      value: [
        [16, UnitType.PX], // top
        [16, UnitType.PX], // right
        [16, UnitType.PX], // bottom
        [16, UnitType.PX]  // left
      ]
    },
    overflow: { value: 'auto' }
  },
  font: {
    fontFamily: { value: 'Inter, sans-serif' },
    fontSize: { value: [14, UnitType.PX] },
    color: { value: '#333333' },
    lineHeight: { value: [1.5, UnitType.EM] }
  },
  children: [
    // 顶部导航栏
    {
      id: 'top-navbar',
      type: NodeType.GROUP,
      name: '顶部导航栏',
      box: {
        width: { value: [100, UnitType.PERCENT] },
        height: { value: [64, UnitType.PX] },
        padding: {
          value: [
            [0, UnitType.PX],
            [16, UnitType.PX],
            [0, UnitType.PX],
            [16, UnitType.PX]
          ]
        }
      },
      layout: {
        type: { value: LayoutType.ROW },
        justifyContent: { value: AlignType.SPACE_BETWEEN },
        alignItems: { value: AlignType.CENTER },
        rowGap: { value: [8, UnitType.PX] },
        columnGap: { value: [8, UnitType.PX] }
      },
      fills: [
        {
          type: { value: 'color' },
          value: { value: '#ffffff' }
        }
      ],
      strokes: [
        {
          width: { value: [1, UnitType.PX] },
          style: { value: 'solid' },
          color: { value: '#e0e0e0' }
        }
      ],
      effects: [
        {
          type: { value: 'shadow' },
          offsetX: { value: [0, UnitType.PX] },
          offsetY: { value: [2, UnitType.PX] },
          blur: { value: [4, UnitType.PX] },
          spread: { value: [0, UnitType.PX] },
          color: { value: 'rgba(0, 0, 0, 0.1)' }
        }
      ],
      children: [
        // 左侧Logo和标题
        {
          id: 'logo-title-group',
          type: NodeType.GROUP,
          name: 'Logo和标题',
          layout: {
            type: { value: LayoutType.ROW },
            rowGap: { value: [12, UnitType.PX] },
            columnGap: { value: [12, UnitType.PX] },
            alignItems: { value: AlignType.CENTER }
          },
          children: [
            {
              id: 'app-logo',
              type: NodeType.ICON,
              name: '应用Logo',
              iconName: 'logo',
              size: { value: [32, UnitType.PX] },
              color: { value: '#4285F4' }
            },
            {
              id: 'logo-text',
              type: NodeType.TEXT,
              name: 'Logo文字',
              content: { value: 'Design System' },
              font: {
                fontSize: { value: [18, UnitType.PX] },
                fontWeight: { value: 700 },
                color: { value: '#333333' },
                fontFamily: { value: 'Inter, sans-serif' },
                lineHeight: { value: [1.5, UnitType.EM] }
              }
            }
          ]
        },
        // 右侧用户信息
        {
          id: 'user-info',
          type: NodeType.GROUP,
          name: '用户信息',
          layout: {
            type: { value: LayoutType.ROW },
            rowGap: { value: [16, UnitType.PX] },
            columnGap: { value: [16, UnitType.PX] },
            alignItems: { value: AlignType.CENTER }
          },
          children: [
            {
              id: 'notification-icon',
              type: NodeType.ICON,
              name: '通知图标',
              iconName: 'notification',
              size: { value: [20, UnitType.PX] },
              color: { value: '#666666' }
            },
            {
              id: 'user-avatar',
              type: NodeType.ICON,
              name: '用户头像',
              iconName: 'user-avatar',
              size: { value: [32, UnitType.PX] },
              color: { value: '#4285F4' }
            }
          ]
        }
      ]
    },
    
    // 主要内容区域
    {
      id: 'main-content',
      type: NodeType.GROUP,
      name: '主要内容区域',
      box: {
        width: { value: [100, UnitType.PERCENT] },
        height: { value: [936, UnitType.PX] }, // 1000px - 64px (navbar height)
      },
      layout: {
        type: { value: LayoutType.ROW },
        rowGap: { value: [0, UnitType.PX] },
        columnGap: { value: [0, UnitType.PX] }
      },
      children: [
        // 左侧边栏
        {
          id: 'sidebar',
          type: NodeType.GROUP,
          name: '左侧边栏',
          box: {
            width: { value: [240, UnitType.PX] },
            height: { value: [100, UnitType.PERCENT] },
            padding: {
              value: [
                [16, UnitType.PX],
                [16, UnitType.PX],
                [16, UnitType.PX],
                [16, UnitType.PX]
              ]
            }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [24, UnitType.PX] },
            columnGap: { value: [24, UnitType.PX] }
          },
          fills: [
            {
              type: { value: 'color' },
              value: { value: '#F8F9FA' }
            }
          ],
          children: [
            // 导航菜单
            {
              id: 'nav-menu',
              type: NodeType.GROUP,
              name: '导航菜单',
              layout: {
                type: { value: LayoutType.COLUMN },
                rowGap: { value: [4, UnitType.PX] },
                columnGap: { value: [4, UnitType.PX] }
              },
              children: [
                {
                  id: 'nav-title',
                  type: NodeType.TEXT,
                  name: '导航标题',
                  content: { value: '导航' },
                  font: {
                    fontSize: { value: [12, UnitType.PX] },
                    fontWeight: { value: 600 },
                    color: { value: '#666666' },
                    textTransform: { value: 'uppercase' }
                  },
                  box: {
                    margin: { value: [
                      [0, UnitType.PX],
                      [0, UnitType.PX],
                      [8, UnitType.PX],
                      [0, UnitType.PX]
                    ] }
                  }
                },
                // 导航项目1 - 选中状态
                {
                  id: 'nav-item-1',
                  type: NodeType.GROUP,
                  name: '导航项目1',
                  box: {
                    width: { value: [100, UnitType.PERCENT] },
                    height: { value: [40, UnitType.PX] },
                    padding: {
                      value: [
                        [0, UnitType.PX],
                        [12, UnitType.PX],
                        [0, UnitType.PX],
                        [12, UnitType.PX]
                      ]
                    }
                  },
                  layout: {
                    type: { value: LayoutType.ROW },
                    rowGap: { value: [8, UnitType.PX] },
                    columnGap: { value: [8, UnitType.PX] },
                    alignItems: { value: AlignType.CENTER }
                  },
                  fills: [
                    {
                      type: { value: 'color' },
                      value: { value: '#E8F0FE' }
                    }
                  ],
                  appearance: {
                    borderRadius: { value: [4, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'nav-item-1-icon',
                      type: NodeType.ICON,
                      name: '导航项目1图标',
                      iconName: 'dashboard',
                      size: { value: [20, UnitType.PX] },
                      color: { value: '#4285F4' }
                    },
                    {
                      id: 'nav-item-1-text',
                      type: NodeType.TEXT,
                      name: '导航项目1文本',
                      content: { value: '组件' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        fontWeight: { value: 500 },
                        color: { value: '#4285F4' }
                      }
                    }
                  ]
                },
                // 导航项目2
                {
                  id: 'nav-item-2',
                  type: NodeType.GROUP,
                  name: '导航项目2',
                  box: {
                    width: { value: [100, UnitType.PERCENT] },
                    height: { value: [40, UnitType.PX] },
                    padding: {
                      value: [
                        [0, UnitType.PX],
                        [12, UnitType.PX],
                        [0, UnitType.PX],
                        [12, UnitType.PX]
                      ]
                    }
                  },
                  layout: {
                    type: { value: LayoutType.ROW },
                    rowGap: { value: [8, UnitType.PX] },
                    columnGap: { value: [8, UnitType.PX] },
                    alignItems: { value: AlignType.CENTER }
                  },
                  children: [
                    {
                      id: 'nav-item-2-icon',
                      type: NodeType.ICON,
                      name: '导航项目2图标',
                      iconName: 'palette',
                      size: { value: [20, UnitType.PX] },
                      color: { value: '#666666' }
                    },
                    {
                      id: 'nav-item-2-text',
                      type: NodeType.TEXT,
                      name: '导航项目2文本',
                      content: { value: '样式' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        fontWeight: { value: 400 },
                        color: { value: '#666666' }
                      }
                    }
                  ]
                },
                // 导航项目3
                {
                  id: 'nav-item-3',
                  type: NodeType.GROUP,
                  name: '导航项目3',
                  box: {
                    width: { value: [100, UnitType.PERCENT] },
                    height: { value: [40, UnitType.PX] },
                    padding: {
                      value: [
                        [0, UnitType.PX],
                        [12, UnitType.PX],
                        [0, UnitType.PX],
                        [12, UnitType.PX]
                      ]
                    }
                  },
                  layout: {
                    type: { value: LayoutType.ROW },
                    rowGap: { value: [8, UnitType.PX] },
                    columnGap: { value: [8, UnitType.PX] },
                    alignItems: { value: AlignType.CENTER }
                  },
                  children: [
                    {
                      id: 'nav-item-3-icon',
                      type: NodeType.ICON,
                      name: '导航项目3图标',
                      iconName: 'code',
                      size: { value: [20, UnitType.PX] },
                      color: { value: '#666666' }
                    },
                    {
                      id: 'nav-item-3-text',
                      type: NodeType.TEXT,
                      name: '导航项目3文本',
                      content: { value: '代码' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        fontWeight: { value: 400 },
                        color: { value: '#666666' }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        
        // 右侧内容区域
        {
          id: 'right-content',
          type: NodeType.GROUP,
          name: '右侧内容区域',
          box: {
            width: { value: [1200, UnitType.PX] }, // Approximation for calc(100% - 240px)
            height: { value: [100, UnitType.PERCENT] },
            padding: {
              value: [
                [24, UnitType.PX],
                [24, UnitType.PX],
                [24, UnitType.PX],
                [24, UnitType.PX]
              ]
            }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [24, UnitType.PX] },
            columnGap: { value: [24, UnitType.PX] }
          },
          fills: [
            {
              type: { value: 'color' },
              value: { value: '#FFFFFF' }
            }
          ],
          children: [
            // 页面标题区域
            {
              id: 'page-header',
              type: NodeType.GROUP,
              name: '页面标题区域',
              box: {
                width: { value: [100, UnitType.PERCENT] },
                margin: { value: [
                  [0, UnitType.PX],
                  [0, UnitType.PX],
                  [16, UnitType.PX],
                  [0, UnitType.PX]
                ] }
              },
              layout: {
                type: { value: LayoutType.COLUMN },
                rowGap: { value: [8, UnitType.PX] },
                columnGap: { value: [8, UnitType.PX] }
              },
              children: [
                {
                  id: 'page-title',
                  type: NodeType.TEXT,
                  name: '页面标题',
                  content: { value: '按钮组件' },
                  font: {
                    fontSize: { value: [24, UnitType.PX] },
                    fontWeight: { value: 700 },
                    color: { value: '#202124' }
                  }
                },
                {
                  id: 'page-description',
                  type: NodeType.TEXT,
                  name: '页面描述',
                  content: { value: '按钮用于触发一个操作或事件，如提交表单、打开对话框、取消操作或执行删除操作。' },
                  font: {
                    fontSize: { value: [14, UnitType.PX] },
                    color: { value: '#5F6368' },
                    lineHeight: { value: [1.5, UnitType.EM] }
                  }
                }
              ]
            },
            
            // 组件展示区域
            {
              id: 'component-showcase',
              type: NodeType.GROUP,
              name: '组件展示区域',
              box: {
                width: { value: [100, UnitType.PERCENT] }
              },
              layout: {
                type: { value: LayoutType.COLUMN },
                rowGap: { value: [32, UnitType.PX] },
                columnGap: { value: [32, UnitType.PX] }
              },
              children: [
                // 按钮类型部分
                {
                  id: 'button-types-section',
                  type: NodeType.GROUP,
                  name: '按钮类型部分',
                  layout: {
                    type: { value: LayoutType.COLUMN },
                    rowGap: { value: [16, UnitType.PX] },
                    columnGap: { value: [16, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'button-types-title',
                      type: NodeType.TEXT,
                      name: '按钮类型标题',
                      content: { value: '按钮类型' },
                      font: {
                        fontSize: { value: [18, UnitType.PX] },
                        fontWeight: { value: 600 },
                        color: { value: '#202124' }
                      }
                    },
                    // 按钮类型展示
                    {
                      id: 'button-types-showcase',
                      type: NodeType.GROUP,
                      name: '按钮类型展示',
                      box: {
                        width: { value: [100, UnitType.PERCENT] },
                        padding: {
                          value: [
                            [24, UnitType.PX],
                            [24, UnitType.PX],
                            [24, UnitType.PX],
                            [24, UnitType.PX]
                          ]
                        }
                      },
                      layout: {
                        type: { value: LayoutType.ROW },
                        rowGap: { value: [16, UnitType.PX] },
                        columnGap: { value: [16, UnitType.PX] },
                        alignItems: { value: AlignType.CENTER }
                      },
                      fills: [
                        {
                          type: { value: 'color' },
                          value: { value: '#F8F9FA' }
                        }
                      ],
                      appearance: {
                        borderRadius: { value: [8, UnitType.PX] }
                      },
                      children: [
                        // 主要按钮
                        {
                          id: 'primary-button',
                          type: NodeType.GROUP,
                          name: '主要按钮',
                          box: {
                            width: { value: [120, UnitType.PX] },
                            height: { value: [40, UnitType.PX] }
                          },
                          layout: {
                            type: { value: LayoutType.ROW },
                            justifyContent: { value: AlignType.CENTER },
                            alignItems: { value: AlignType.CENTER }
                          },
                          fills: [
                            {
                              type: { value: 'color' },
                              value: { value: '#4285F4' }
                            }
                          ],
                          appearance: {
                            borderRadius: { value: [4, UnitType.PX] }
                          },
                          children: [
                            {
                              id: 'primary-button-text',
                              type: NodeType.TEXT,
                              name: '主要按钮文本',
                              content: { value: '主要按钮' },
                              font: {
                                fontSize: { value: [14, UnitType.PX] },
                                fontWeight: { value: 500 },
                                color: { value: '#FFFFFF' }
                              }
                            }
                          ]
                        },
                        // 次要按钮
                        {
                          id: 'secondary-button',
                          type: NodeType.GROUP,
                          name: '次要按钮',
                          box: {
                            width: { value: [120, UnitType.PX] },
                            height: { value: [40, UnitType.PX] }
                          },
                          layout: {
                            type: { value: LayoutType.ROW },
                            justifyContent: { value: AlignType.CENTER },
                            alignItems: { value: AlignType.CENTER }
                          },
                          fills: [
                            {
                              type: { value: 'color' },
                              value: { value: '#FFFFFF' }
                            }
                          ],
                          strokes: [
                            {
                              width: { value: [1, UnitType.PX] },
                              style: { value: 'solid' },
                              color: { value: '#DADCE0' }
                            }
                          ],
                          appearance: {
                            borderRadius: { value: [4, UnitType.PX] }
                          },
                          children: [
                            {
                              id: 'secondary-button-text',
                              type: NodeType.TEXT,
                              name: '次要按钮文本',
                              content: { value: '次要按钮' },
                              font: {
                                fontSize: { value: [14, UnitType.PX] },
                                fontWeight: { value: 500 },
                                color: { value: '#5F6368' }
                              }
                            }
                          ]
                        },
                        // 文本按钮
                        {
                          id: 'text-button',
                          type: NodeType.GROUP,
                          name: '文本按钮',
                          box: {
                            width: { value: [120, UnitType.PX] },
                            height: { value: [40, UnitType.PX] }
                          },
                          layout: {
                            type: { value: LayoutType.ROW },
                            justifyContent: { value: AlignType.CENTER },
                            alignItems: { value: AlignType.CENTER }
                          },
                          children: [
                            {
                              id: 'text-button-text',
                              type: NodeType.TEXT,
                              name: '文本按钮文本',
                              content: { value: '文本按钮' },
                              font: {
                                fontSize: { value: [14, UnitType.PX] },
                                fontWeight: { value: 500 },
                                color: { value: '#4285F4' }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                
                // 按钮尺寸部分
                {
                  id: 'button-sizes-section',
                  type: NodeType.GROUP,
                  name: '按钮尺寸部分',
                  layout: {
                    type: { value: LayoutType.COLUMN },
                    rowGap: { value: [16, UnitType.PX] },
                    columnGap: { value: [16, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'button-sizes-title',
                      type: NodeType.TEXT,
                      name: '按钮尺寸标题',
                      content: { value: '按钮尺寸' },
                      font: {
                        fontSize: { value: [18, UnitType.PX] },
                        fontWeight: { value: 600 },
                        color: { value: '#202124' }
                      }
                    },
                    // 按钮尺寸展示
                    {
                      id: 'button-sizes-showcase',
                      type: NodeType.GROUP,
                      name: '按钮尺寸展示',
                      box: {
                        width: { value: [100, UnitType.PERCENT] },
                        padding: {
                          value: [
                            [24, UnitType.PX],
                            [24, UnitType.PX],
                            [24, UnitType.PX],
                            [24, UnitType.PX]
                          ]
                        }
                      },
                      layout: {
                        type: { value: LayoutType.ROW },
                        rowGap: { value: [16, UnitType.PX] },
                        columnGap: { value: [16, UnitType.PX] },
                        alignItems: { value: AlignType.CENTER }
                      },
                      fills: [
                        {
                          type: { value: 'color' },
                          value: { value: '#F8F9FA' }
                        }
                      ],
                      appearance: {
                        borderRadius: { value: [8, UnitType.PX] }
                      },
                      children: [
                        // 小型按钮
                        {
                          id: 'small-button',
                          type: NodeType.GROUP,
                          name: '小型按钮',
                          box: {
                            width: { value: [100, UnitType.PX] },
                            height: { value: [32, UnitType.PX] }
                          },
                          layout: {
                            type: { value: LayoutType.ROW },
                            justifyContent: { value: AlignType.CENTER },
                            alignItems: { value: AlignType.CENTER }
                          },
                          fills: [
                            {
                              type: { value: 'color' },
                              value: { value: '#4285F4' }
                            }
                          ],
                          appearance: {
                            borderRadius: { value: [4, UnitType.PX] }
                          },
                          children: [
                            {
                              id: 'small-button-text',
                              type: NodeType.TEXT,
                              name: '小型按钮文本',
                              content: { value: '小型' },
                              font: {
                                fontSize: { value: [12, UnitType.PX] },
                                fontWeight: { value: 500 },
                                color: { value: '#FFFFFF' }
                              }
                            }
                          ]
                        },
                        // 中型按钮
                        {
                          id: 'medium-button',
                          type: NodeType.GROUP,
                          name: '中型按钮',
                          box: {
                            width: { value: [120, UnitType.PX] },
                            height: { value: [40, UnitType.PX] }
                          },
                          layout: {
                            type: { value: LayoutType.ROW },
                            justifyContent: { value: AlignType.CENTER },
                            alignItems: { value: AlignType.CENTER }
                          },
                          fills: [
                            {
                              type: { value: 'color' },
                              value: { value: '#4285F4' }
                            }
                          ],
                          appearance: {
                            borderRadius: { value: [4, UnitType.PX] }
                          },
                          children: [
                            {
                              id: 'medium-button-text',
                              type: NodeType.TEXT,
                              name: '中型按钮文本',
                              content: { value: '中型' },
                              font: {
                                fontSize: { value: [14, UnitType.PX] },
                                fontWeight: { value: 500 },
                                color: { value: '#FFFFFF' }
                              }
                            }
                          ]
                        },
                        // 大型按钮
                        {
                          id: 'large-button',
                          type: NodeType.GROUP,
                          name: '大型按钮',
                          box: {
                            width: { value: [140, UnitType.PX] },
                            height: { value: [48, UnitType.PX] }
                          },
                          layout: {
                            type: { value: LayoutType.ROW },
                            justifyContent: { value: AlignType.CENTER },
                            alignItems: { value: AlignType.CENTER }
                          },
                          fills: [
                            {
                              type: { value: 'color' },
                              value: { value: '#4285F4' }
                            }
                          ],
                          appearance: {
                            borderRadius: { value: [4, UnitType.PX] }
                          },
                          children: [
                            {
                              id: 'large-button-text',
                              type: NodeType.TEXT,
                              name: '大型按钮文本',
                              content: { value: '大型' },
                              font: {
                                fontSize: { value: [16, UnitType.PX] },
                                fontWeight: { value: 500 },
                                color: { value: '#FFFFFF' }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}; 