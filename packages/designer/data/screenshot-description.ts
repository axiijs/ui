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
  IconNode
} from './types';

// 截图页面数据描述
export const screenshotDescription: PageNode = {
  id: 'screenshot-page',
  type: NodeType.PAGE,
  name: '截图页面',
  box: {
    width: '100%',
    height: '100%',
    padding: [
      [16, UnitType.PX], // top
      [16, UnitType.PX], // right
      [16, UnitType.PX], // bottom
      [16, UnitType.PX]  // left
    ],
    overflow: 'auto'
  },
  font: {
    fontFamily: 'Inter, sans-serif',
    fontSize: [14, UnitType.PX],
    color: '#333333',
    lineHeight: [1.5, UnitType.EM]
  },
  children: [
    // 顶部导航栏
    {
      id: 'top-navbar',
      type: NodeType.GROUP,
      name: '顶部导航栏',
      box: {
        width: '100%',
        height: [64, UnitType.PX],
        padding: [
          [0, UnitType.PX],
          [16, UnitType.PX],
          [0, UnitType.PX],
          [16, UnitType.PX]
        ]
      },
      layout: {
        type: LayoutType.ROW,
        justifyContent: AlignType.SPACE_BETWEEN,
        alignItems: AlignType.CENTER
      },
      fills: [
        {
          type: 'color',
          value: '#FFFFFF'
        }
      ],
      strokes: [
        {
          width: [1, UnitType.PX],
          style: 'solid',
          color: '#EEEEEE'
        }
      ],
      children: [
        // 左侧Logo和标题
        {
          id: 'logo-title-group',
          type: NodeType.GROUP,
          name: 'Logo和标题',
          layout: {
            type: LayoutType.ROW,
            rowGap: [12, UnitType.PX],
            columnGap: [12, UnitType.PX],
            alignItems: AlignType.CENTER
          },
          children: [
            {
              id: 'app-logo',
              type: NodeType.ICON,
              name: '应用Logo',
              iconName: 'logo',
              size: [32, UnitType.PX],
              color: '#4285F4'
            },
            {
              id: 'app-title',
              type: NodeType.TEXT,
              name: '应用标题',
              content: 'Design System',
              font: {
                fontSize: [18, UnitType.PX],
                fontWeight: 600,
                color: '#333333'
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
            type: LayoutType.ROW,
            rowGap: [16, UnitType.PX],
            columnGap: [16, UnitType.PX],
            alignItems: AlignType.CENTER
          },
          children: [
            {
              id: 'notification-icon',
              type: NodeType.ICON,
              name: '通知图标',
              iconName: 'notification',
              size: [20, UnitType.PX],
              color: '#666666'
            },
            {
              id: 'user-avatar',
              type: NodeType.ICON,
              name: '用户头像',
              iconName: 'user-avatar',
              size: [32, UnitType.PX],
              color: '#4285F4'
            }
          ]
        }
      ]
    },
    
    // 主要内容区域
    {
      id: 'main-content-area',
      type: NodeType.GROUP,
      name: '主要内容区域',
      box: {
        width: '100%',
        height: 'calc(100% - 64px)'
      },
      layout: {
        type: LayoutType.ROW,
        rowGap: [0, UnitType.PX],
        columnGap: [0, UnitType.PX]
      },
      children: [
        // 左侧边栏
        {
          id: 'left-sidebar',
          type: NodeType.GROUP,
          name: '左侧边栏',
          box: {
            width: [240, UnitType.PX],
            height: '100%',
            padding: [
              [16, UnitType.PX],
              [16, UnitType.PX],
              [16, UnitType.PX],
              [16, UnitType.PX]
            ]
          },
          layout: {
            type: LayoutType.COLUMN,
            rowGap: [24, UnitType.PX],
            columnGap: [24, UnitType.PX]
          },
          fills: [
            {
              type: 'color',
              value: '#F8F9FA'
            }
          ],
          children: [
            // 导航菜单
            {
              id: 'nav-menu',
              type: NodeType.GROUP,
              name: '导航菜单',
              layout: {
                type: LayoutType.COLUMN,
                rowGap: [4, UnitType.PX],
                columnGap: [4, UnitType.PX]
              },
              children: [
                {
                  id: 'nav-title',
                  type: NodeType.TEXT,
                  name: '导航标题',
                  content: '导航',
                  font: {
                    fontSize: [12, UnitType.PX],
                    fontWeight: 600,
                    color: '#666666',
                    textTransform: 'uppercase'
                  },
                  box: {
                    margin: [
                      [0, UnitType.PX],
                      [0, UnitType.PX],
                      [8, UnitType.PX],
                      [0, UnitType.PX]
                    ]
                  }
                },
                // 导航项目1 - 选中状态
                {
                  id: 'nav-item-1',
                  type: NodeType.GROUP,
                  name: '导航项目1',
                  box: {
                    width: '100%',
                    height: [40, UnitType.PX],
                    padding: [
                      [0, UnitType.PX],
                      [12, UnitType.PX],
                      [0, UnitType.PX],
                      [12, UnitType.PX]
                    ]
                  },
                  layout: {
                    type: LayoutType.ROW,
                    rowGap: [8, UnitType.PX],
                    columnGap: [8, UnitType.PX],
                    alignItems: AlignType.CENTER
                  },
                  fills: [
                    {
                      type: 'color',
                      value: '#E8F0FE'
                    }
                  ],
                  appearance: {
                    borderRadius: [4, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'nav-item-1-icon',
                      type: NodeType.ICON,
                      name: '导航项目1图标',
                      iconName: 'dashboard',
                      size: [20, UnitType.PX],
                      color: '#4285F4'
                    },
                    {
                      id: 'nav-item-1-text',
                      type: NodeType.TEXT,
                      name: '导航项目1文本',
                      content: '组件',
                      font: {
                        fontSize: [14, UnitType.PX],
                        fontWeight: 500,
                        color: '#4285F4'
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
                    width: '100%',
                    height: [40, UnitType.PX],
                    padding: [
                      [0, UnitType.PX],
                      [12, UnitType.PX],
                      [0, UnitType.PX],
                      [12, UnitType.PX]
                    ]
                  },
                  layout: {
                    type: LayoutType.ROW,
                    rowGap: [8, UnitType.PX],
                    columnGap: [8, UnitType.PX],
                    alignItems: AlignType.CENTER
                  },
                  children: [
                    {
                      id: 'nav-item-2-icon',
                      type: NodeType.ICON,
                      name: '导航项目2图标',
                      iconName: 'palette',
                      size: [20, UnitType.PX],
                      color: '#666666'
                    },
                    {
                      id: 'nav-item-2-text',
                      type: NodeType.TEXT,
                      name: '导航项目2文本',
                      content: '样式',
                      font: {
                        fontSize: [14, UnitType.PX],
                        fontWeight: 400,
                        color: '#666666'
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
                    width: '100%',
                    height: [40, UnitType.PX],
                    padding: [
                      [0, UnitType.PX],
                      [12, UnitType.PX],
                      [0, UnitType.PX],
                      [12, UnitType.PX]
                    ]
                  },
                  layout: {
                    type: LayoutType.ROW,
                    rowGap: [8, UnitType.PX],
                    columnGap: [8, UnitType.PX],
                    alignItems: AlignType.CENTER
                  },
                  children: [
                    {
                      id: 'nav-item-3-icon',
                      type: NodeType.ICON,
                      name: '导航项目3图标',
                      iconName: 'code',
                      size: [20, UnitType.PX],
                      color: '#666666'
                    },
                    {
                      id: 'nav-item-3-text',
                      type: NodeType.TEXT,
                      name: '导航项目3文本',
                      content: '代码',
                      font: {
                        fontSize: [14, UnitType.PX],
                        fontWeight: 400,
                        color: '#666666'
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
            width: 'calc(100% - 240px)',
            height: '100%',
            padding: [
              [24, UnitType.PX],
              [24, UnitType.PX],
              [24, UnitType.PX],
              [24, UnitType.PX]
            ]
          },
          layout: {
            type: LayoutType.COLUMN,
            rowGap: [24, UnitType.PX],
            columnGap: [24, UnitType.PX]
          },
          fills: [
            {
              type: 'color',
              value: '#FFFFFF'
            }
          ],
          children: [
            // 页面标题区域
            {
              id: 'page-header',
              type: NodeType.GROUP,
              name: '页面标题区域',
              box: {
                width: '100%',
                margin: [
                  [0, UnitType.PX],
                  [0, UnitType.PX],
                  [16, UnitType.PX],
                  [0, UnitType.PX]
                ]
              },
              layout: {
                type: LayoutType.COLUMN,
                rowGap: [8, UnitType.PX],
                columnGap: [8, UnitType.PX]
              },
              children: [
                {
                  id: 'page-title',
                  type: NodeType.TEXT,
                  name: '页面标题',
                  content: '按钮组件',
                  font: {
                    fontSize: [24, UnitType.PX],
                    fontWeight: 700,
                    color: '#202124'
                  }
                },
                {
                  id: 'page-description',
                  type: NodeType.TEXT,
                  name: '页面描述',
                  content: '按钮用于触发一个操作或事件，如提交表单、打开对话框、取消操作或执行删除操作。',
                  font: {
                    fontSize: [14, UnitType.PX],
                    color: '#5F6368',
                    lineHeight: [1.5, UnitType.EM]
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
                width: '100%'
              },
              layout: {
                type: LayoutType.COLUMN,
                rowGap: [32, UnitType.PX],
                columnGap: [32, UnitType.PX]
              },
              children: [
                // 按钮类型部分
                {
                  id: 'button-types-section',
                  type: NodeType.GROUP,
                  name: '按钮类型部分',
                  layout: {
                    type: LayoutType.COLUMN,
                    rowGap: [16, UnitType.PX],
                    columnGap: [16, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'button-types-title',
                      type: NodeType.TEXT,
                      name: '按钮类型标题',
                      content: '按钮类型',
                      font: {
                        fontSize: [18, UnitType.PX],
                        fontWeight: 600,
                        color: '#202124'
                      }
                    },
                    // 按钮类型展示
                    {
                      id: 'button-types-showcase',
                      type: NodeType.GROUP,
                      name: '按钮类型展示',
                      box: {
                        width: '100%',
                        padding: [
                          [24, UnitType.PX],
                          [24, UnitType.PX],
                          [24, UnitType.PX],
                          [24, UnitType.PX]
                        ]
                      },
                      layout: {
                        type: LayoutType.ROW,
                        rowGap: [16, UnitType.PX],
                        columnGap: [16, UnitType.PX],
                        alignItems: AlignType.CENTER
                      },
                      fills: [
                        {
                          type: 'color',
                          value: '#F8F9FA'
                        }
                      ],
                      appearance: {
                        borderRadius: [8, UnitType.PX]
                      },
                      children: [
                        // 主要按钮
                        {
                          id: 'primary-button',
                          type: NodeType.GROUP,
                          name: '主要按钮',
                          box: {
                            width: [120, UnitType.PX],
                            height: [40, UnitType.PX]
                          },
                          layout: {
                            type: LayoutType.ROW,
                            justifyContent: AlignType.CENTER,
                            alignItems: AlignType.CENTER
                          },
                          fills: [
                            {
                              type: 'color',
                              value: '#4285F4'
                            }
                          ],
                          appearance: {
                            borderRadius: [4, UnitType.PX]
                          },
                          children: [
                            {
                              id: 'primary-button-text',
                              type: NodeType.TEXT,
                              name: '主要按钮文本',
                              content: '主要按钮',
                              font: {
                                fontSize: [14, UnitType.PX],
                                fontWeight: 500,
                                color: '#FFFFFF'
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
                            width: [120, UnitType.PX],
                            height: [40, UnitType.PX]
                          },
                          layout: {
                            type: LayoutType.ROW,
                            justifyContent: AlignType.CENTER,
                            alignItems: AlignType.CENTER
                          },
                          fills: [
                            {
                              type: 'color',
                              value: '#FFFFFF'
                            }
                          ],
                          strokes: [
                            {
                              width: [1, UnitType.PX],
                              style: 'solid',
                              color: '#DADCE0'
                            }
                          ],
                          appearance: {
                            borderRadius: [4, UnitType.PX]
                          },
                          children: [
                            {
                              id: 'secondary-button-text',
                              type: NodeType.TEXT,
                              name: '次要按钮文本',
                              content: '次要按钮',
                              font: {
                                fontSize: [14, UnitType.PX],
                                fontWeight: 500,
                                color: '#5F6368'
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
                            width: [120, UnitType.PX],
                            height: [40, UnitType.PX]
                          },
                          layout: {
                            type: LayoutType.ROW,
                            justifyContent: AlignType.CENTER,
                            alignItems: AlignType.CENTER
                          },
                          children: [
                            {
                              id: 'text-button-text',
                              type: NodeType.TEXT,
                              name: '文本按钮文本',
                              content: '文本按钮',
                              font: {
                                fontSize: [14, UnitType.PX],
                                fontWeight: 500,
                                color: '#4285F4'
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
                    type: LayoutType.COLUMN,
                    rowGap: [16, UnitType.PX],
                    columnGap: [16, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'button-sizes-title',
                      type: NodeType.TEXT,
                      name: '按钮尺寸标题',
                      content: '按钮尺寸',
                      font: {
                        fontSize: [18, UnitType.PX],
                        fontWeight: 600,
                        color: '#202124'
                      }
                    },
                    // 按钮尺寸展示
                    {
                      id: 'button-sizes-showcase',
                      type: NodeType.GROUP,
                      name: '按钮尺寸展示',
                      box: {
                        width: '100%',
                        padding: [
                          [24, UnitType.PX],
                          [24, UnitType.PX],
                          [24, UnitType.PX],
                          [24, UnitType.PX]
                        ]
                      },
                      layout: {
                        type: LayoutType.ROW,
                        rowGap: [16, UnitType.PX],
                        columnGap: [16, UnitType.PX],
                        alignItems: AlignType.CENTER
                      },
                      fills: [
                        {
                          type: 'color',
                          value: '#F8F9FA'
                        }
                      ],
                      appearance: {
                        borderRadius: [8, UnitType.PX]
                      },
                      children: [
                        // 小型按钮
                        {
                          id: 'small-button',
                          type: NodeType.GROUP,
                          name: '小型按钮',
                          box: {
                            width: [100, UnitType.PX],
                            height: [32, UnitType.PX]
                          },
                          layout: {
                            type: LayoutType.ROW,
                            justifyContent: AlignType.CENTER,
                            alignItems: AlignType.CENTER
                          },
                          fills: [
                            {
                              type: 'color',
                              value: '#4285F4'
                            }
                          ],
                          appearance: {
                            borderRadius: [4, UnitType.PX]
                          },
                          children: [
                            {
                              id: 'small-button-text',
                              type: NodeType.TEXT,
                              name: '小型按钮文本',
                              content: '小型',
                              font: {
                                fontSize: [12, UnitType.PX],
                                fontWeight: 500,
                                color: '#FFFFFF'
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
                            width: [120, UnitType.PX],
                            height: [40, UnitType.PX]
                          },
                          layout: {
                            type: LayoutType.ROW,
                            justifyContent: AlignType.CENTER,
                            alignItems: AlignType.CENTER
                          },
                          fills: [
                            {
                              type: 'color',
                              value: '#4285F4'
                            }
                          ],
                          appearance: {
                            borderRadius: [4, UnitType.PX]
                          },
                          children: [
                            {
                              id: 'medium-button-text',
                              type: NodeType.TEXT,
                              name: '中型按钮文本',
                              content: '中型',
                              font: {
                                fontSize: [14, UnitType.PX],
                                fontWeight: 500,
                                color: '#FFFFFF'
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
                            width: [140, UnitType.PX],
                            height: [48, UnitType.PX]
                          },
                          layout: {
                            type: LayoutType.ROW,
                            justifyContent: AlignType.CENTER,
                            alignItems: AlignType.CENTER
                          },
                          fills: [
                            {
                              type: 'color',
                              value: '#4285F4'
                            }
                          ],
                          appearance: {
                            borderRadius: [4, UnitType.PX]
                          },
                          children: [
                            {
                              id: 'large-button-text',
                              type: NodeType.TEXT,
                              name: '大型按钮文本',
                              content: '大型',
                              font: {
                                fontSize: [16, UnitType.PX],
                                fontWeight: 500,
                                color: '#FFFFFF'
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