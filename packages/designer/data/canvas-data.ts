/**
 * 画布图层数据结构
 * 支持三种节点类型：group、text、icon
 */

import {
  NodeType,
  LayoutType,
  AlignType,
  UnitType,
  BoxInfo,
  LayoutInfo,
  AppearanceInfo,
  StrokeInfo,
  FillInfo,
  EffectInfo,
  FontInfo,
  TextLayoutInfo,
  BaseNode,
  TextNode,
  IconNode,
  GroupNode,
  PageNode,
  Node,
  VariableValue
} from './types';

// 示例画布数据
const rootNode: GroupNode = {
  id: 'root',
  type: NodeType.GROUP,
  name: '画布根节点',
  box: {
    padding: {
      value: [
        [16, UnitType.PX], // top
        [16, UnitType.PX], // right
        [16, UnitType.PX], // bottom
        [16, UnitType.PX]  // left
      ]
    },
    margin: {
      value: [
        [0, UnitType.PX], // top
        [0, UnitType.PX], // right
        [0, UnitType.PX], // bottom
        [0, UnitType.PX]  // left
      ]
    },
    overflow: { value: 'hidden' }
  },
  children: [
    // 导航栏
    {
      id: 'navbar',
      type: NodeType.GROUP,
      name: '导航栏',
      position: { x: [0, UnitType.PX], y: [0, UnitType.PX] },
      box: {
        width: { value: [100, UnitType.PERCENT] },
        height: { value: [64, UnitType.PX] },
        padding: {
          value: [
            [0, UnitType.PX],  // top
            [24, UnitType.PX], // right
            [0, UnitType.PX],  // bottom
            [24, UnitType.PX]  // left
          ]
        },
        margin: {
          value: [
            [0, UnitType.PX],   // top
            [0, UnitType.PX],   // right
            [16, UnitType.PX],  // bottom
            [0, UnitType.PX]    // left
          ]
        },
        overflow: { value: 'visible' }
      },
      layout: {
        type: { value: LayoutType.ROW },
        justifyContent: { value: AlignType.SPACE_BETWEEN },
        alignItems: { value: AlignType.CENTER },
        rowGap: { value: [16, UnitType.PX] },
        columnGap: { value: [16, UnitType.PX] }
      },
      appearance: {
        opacity: { value: [1, ''] },
        borderRadius: { value: [0, UnitType.PX] }
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
        {
          id: 'logo',
          type: NodeType.GROUP,
          name: 'Logo区域',
          layout: {
            type: { value: LayoutType.ROW },
            alignItems: { value: AlignType.CENTER },
            rowGap: { value: [8, UnitType.PX] },
            columnGap: { value: [8, UnitType.PX] }
          },
          children: [
            {
              id: 'logo-icon',
              type: NodeType.ICON,
              name: 'Logo图标',
              iconName: 'logo',
              size: { value: [32, UnitType.PX] },
              color: { value: '#4285f4' },
              box: {
                flexShrink: { value: 0 }
              }
            },
            {
              id: 'logo-text',
              type: NodeType.TEXT,
              name: 'Logo文字',
              content: { value: 'Designer' },
              font: {
                fontSize: { value: [20, UnitType.PX] },
                fontWeight: { value: 700 },
                color: { value: '#333333' },
                fontFamily: { value: 'Arial, sans-serif' },
                lineHeight: { value: [1.2, UnitType.EM] }
              },
              box: {
                padding: {
                  value: [
                    [2, UnitType.PX],  // top
                    [4, UnitType.PX],  // right
                    [2, UnitType.PX],  // bottom
                    [4, UnitType.PX]   // left
                  ]
                },
                overflow: { value: 'hidden' },
                flexGrow: { value: 1 }
              },
              textLayout: {
                textOverflow: { value: 'ellipsis' },
                whiteSpace: { value: 'nowrap' }
              }
            }
          ]
        },
        {
          id: 'nav-links',
          type: NodeType.GROUP,
          name: '导航链接',
          layout: {
            type: { value: LayoutType.ROW },
            rowGap: { value: [24, UnitType.PX] },
            columnGap: { value: [24, UnitType.PX] },
            alignItems: { value: AlignType.CENTER }
          },
          children: [
            {
              id: 'nav-link-1',
              type: NodeType.TEXT,
              name: '导航链接1',
              content: { value: '首页' },
              font: {
                fontSize: { value: [16, UnitType.PX] },
                color: { value: '#333333' },
                fontFamily: { value: 'Arial, sans-serif' },
                lineHeight: { value: [1.5, UnitType.EM] }
              },
              box: {
                padding: {
                  value: [
                    [4, UnitType.PX],  // top
                    [8, UnitType.PX],  // right
                    [4, UnitType.PX],  // bottom
                    [8, UnitType.PX]   // left
                  ]
                },
                flexShrink: { value: 0 }
              },
              textLayout: {
                textOverflow: { value: 'ellipsis' },
                whiteSpace: { value: 'nowrap' },
                wordBreak: { value: 'normal' }
              }
            },
            {
              id: 'nav-link-2',
              type: NodeType.TEXT,
              name: '导航链接2',
              content: { value: '画布' },
              font: {
                fontSize: { value: [16, UnitType.PX] },
                color: { value: '#333333' },
                fontFamily: { value: 'Arial, sans-serif' },
                lineHeight: { value: [1.5, UnitType.EM] }
              },
              box: {
                padding: {
                  value: [
                    [4, UnitType.PX],  // top
                    [8, UnitType.PX],  // right
                    [4, UnitType.PX],  // bottom
                    [8, UnitType.PX]   // left
                  ]
                }
              }
            },
            {
              id: 'nav-link-3',
              type: NodeType.TEXT,
              name: '导航链接3',
              content: { value: '组件' },
              font: {
                fontSize: { value: [16, UnitType.PX] },
                color: { value: '#333333' },
                fontFamily: { value: 'Arial, sans-serif' },
                lineHeight: { value: [1.5, UnitType.EM] }
              },
              box: {
                padding: {
                  value: [
                    [4, UnitType.PX],  // top
                    [8, UnitType.PX],  // right
                    [4, UnitType.PX],  // bottom
                    [8, UnitType.PX]   // left
                  ]
                }
              }
            }
          ]
        },
        {
          id: 'user-profile',
          type: NodeType.GROUP,
          name: '用户信息',
          layout: {
            type: { value: LayoutType.ROW },
            alignItems: { value: AlignType.CENTER },
            rowGap: { value: [8, UnitType.PX] },
            columnGap: { value: [8, UnitType.PX] }
          },
          children: [
            {
              id: 'user-icon',
              type: NodeType.ICON,
              name: '用户图标',
              iconName: 'user-circle',
              size: { value: [24, UnitType.PX] },
              color: { value: '#666666' }
            },
            {
              id: 'user-name',
              type: NodeType.TEXT,
              name: '用户名',
              content: { value: '张三' },
              font: {
                fontSize: { value: [14, UnitType.PX] },
                color: { value: '#333333' },
                fontFamily: { value: 'Arial, sans-serif' },
                lineHeight: { value: [1.5, UnitType.EM] }
              },
              box: {
                padding: {
                  value: [
                    [2, UnitType.PX],  // top
                    [4, UnitType.PX],  // right
                    [2, UnitType.PX],  // bottom
                    [4, UnitType.PX]   // left
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    
    // 主内容区
    {
      id: 'main-content',
      type: NodeType.GROUP,
      name: '主内容区',
      position: { x: [0, UnitType.PX], y: [80, UnitType.PX] },
      box: {
        width: { value: [100, UnitType.PERCENT] },
        height: { value: [800, UnitType.PX] },
        padding: {
          value: [
            [24, UnitType.PX], // top
            [24, UnitType.PX], // right
            [24, UnitType.PX], // bottom
            [24, UnitType.PX]  // left
          ]
        },
        margin: {
          value: [
            [0, UnitType.PX], // top
            [0, UnitType.PX], // right
            [0, UnitType.PX], // bottom
            [0, UnitType.PX]  // left
          ]
        },
        overflow: { value: 'visible' }
      },
      layout: {
        type: { value: LayoutType.ROW },
        rowGap: { value: [24, UnitType.PX] },
        columnGap: { value: [24, UnitType.PX] }
      },
      children: [
        // 侧边栏
        {
          id: 'sidebar',
          type: NodeType.GROUP,
          name: '侧边栏',
          box: {
            width: { value: [240, UnitType.PX] },
            height: { value: [100, UnitType.PERCENT] },
            padding: {
              value: [
                [16, UnitType.PX], // top
                [16, UnitType.PX], // right
                [16, UnitType.PX], // bottom
                [16, UnitType.PX]  // left
              ]
            },
            margin: {
              value: [
                [0, UnitType.PX],  // top
                [16, UnitType.PX], // right
                [0, UnitType.PX],  // bottom
                [0, UnitType.PX]   // left
              ]
            },
            overflow: { value: 'auto' },
            flexShrink: { value: 0 }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [8, UnitType.PX] },
            columnGap: { value: [8, UnitType.PX] }
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
          children: [
            {
              id: 'sidebar-title',
              type: NodeType.TEXT,
              name: '侧边栏标题',
              content: { value: '组件库' },
              font: {
                fontSize: { value: [18, UnitType.PX] },
                fontWeight: { value: 700 },
                color: { value: '#333333' },
                fontFamily: { value: 'Arial, sans-serif' },
                lineHeight: { value: [1.2, UnitType.EM] }
              },
              box: {
                padding: {
                  value: [
                    [4, UnitType.PX],  // top
                    [8, UnitType.PX],  // right
                    [4, UnitType.PX],  // bottom
                    [8, UnitType.PX]   // left
                  ]
                },
                margin: {
                  value: [
                    [0, UnitType.PX],   // top
                    [0, UnitType.PX],   // right
                    [12, UnitType.PX],  // bottom
                    [0, UnitType.PX]    // left
                  ]
                },
                overflow: { value: 'hidden' }
              },
              textLayout: {
                textOverflow: { value: 'ellipsis' },
                whiteSpace: { value: 'nowrap' }
              }
            },
            // 组件分类1
            {
              id: 'component-category-1',
              type: NodeType.GROUP,
              name: '基础组件',
              layout: {
                type: { value: LayoutType.COLUMN },
                rowGap: { value: [4, UnitType.PX] },
                columnGap: { value: [4, UnitType.PX] }
              },
              appearance: {
                borderRadius: { value: [4, UnitType.PX] }
              },
              box: {
                padding: {
                  value: [
                    [8, UnitType.PX],  // top
                    [8, UnitType.PX],  // right
                    [8, UnitType.PX],  // bottom
                    [8, UnitType.PX]   // left
                  ]
                },
                margin: {
                  value: [
                    [0, UnitType.PX],  // top
                    [0, UnitType.PX],  // right
                    [12, UnitType.PX],  // bottom
                    [0, UnitType.PX]    // left
                  ]
                },
                overflow: { value: 'visible' }
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
              children: [
                {
                  id: 'category-header-1',
                  type: NodeType.GROUP,
                  name: '分类标题1',
                  layout: {
                    type: { value: LayoutType.ROW },
                    alignItems: { value: AlignType.CENTER },
                    rowGap: { value: [8, UnitType.PX] },
                    columnGap: { value: [8, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'category-icon-1',
                      type: NodeType.ICON,
                      name: '分类图标1',
                      iconName: 'cube',
                      size: { value: [16, UnitType.PX] },
                      color: { value: '#666666' }
                    },
                    {
                      id: 'category-title-1',
                      type: NodeType.TEXT,
                      name: '分类标题文本1',
                      content: { value: '基础组件' },
                      font: {
                        fontSize: { value: [16, UnitType.PX] },
                        fontWeight: { value: 700 },
                        color: { value: '#333333' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.2, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      },
                      textLayout: {
                        textOverflow: { value: 'ellipsis' },
                        whiteSpace: { value: 'nowrap' },
                        direction: { value: 'ltr' },
                        textIndent: { value: [0, UnitType.PX] }
                      }
                    }
                  ]
                },
                {
                  id: 'component-list-1',
                  type: NodeType.GROUP,
                  name: '组件列表1',
                  layout: {
                    type: { value: LayoutType.COLUMN },
                    rowGap: { value: [2, UnitType.PX] },
                    columnGap: { value: [2, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'component-item-1-1',
                      type: NodeType.TEXT,
                      name: '组件项1-1',
                      content: { value: '按钮' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#666666' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    },
                    {
                      id: 'component-item-1-2',
                      type: NodeType.TEXT,
                      name: '组件项1-2',
                      content: { value: '输入框' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#666666' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    },
                    {
                      id: 'component-item-1-3',
                      type: NodeType.TEXT,
                      name: '组件项1-3',
                      content: { value: '选择器' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#666666' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    }
                  ]
                }
              ]
            },
            // 组件分类2
            {
              id: 'component-category-2',
              type: NodeType.GROUP,
              name: '布局组件',
              layout: {
                type: { value: LayoutType.COLUMN },
                rowGap: { value: [4, UnitType.PX] },
                columnGap: { value: [4, UnitType.PX] }
              },
              appearance: {
                borderRadius: { value: [4, UnitType.PX] }
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
              children: [
                {
                  id: 'category-header-2',
                  type: NodeType.GROUP,
                  name: '分类标题2',
                  layout: {
                    type: { value: LayoutType.ROW },
                    alignItems: { value: AlignType.CENTER },
                    rowGap: { value: [8, UnitType.PX] },
                    columnGap: { value: [8, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'category-icon-2',
                      type: NodeType.ICON,
                      name: '分类图标2',
                      iconName: 'layout',
                      size: { value: [16, UnitType.PX] },
                      color: { value: '#666666' }
                    },
                    {
                      id: 'category-title-2',
                      type: NodeType.TEXT,
                      name: '分类标题文本2',
                      content: { value: '布局组件' },
                      font: {
                        fontSize: { value: [16, UnitType.PX] },
                        fontWeight: { value: 700 },
                        color: { value: '#333333' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.2, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    }
                  ]
                },
                {
                  id: 'component-list-2',
                  type: NodeType.GROUP,
                  name: '组件列表2',
                  layout: {
                    type: { value: LayoutType.COLUMN },
                    rowGap: { value: [2, UnitType.PX] },
                    columnGap: { value: [2, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'component-item-2-1',
                      type: NodeType.TEXT,
                      name: '组件项2-1',
                      content: { value: '容器' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#666666' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    },
                    {
                      id: 'component-item-2-2',
                      type: NodeType.TEXT,
                      name: '组件项2-2',
                      content: { value: '栅格' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#666666' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    },
                    {
                      id: 'component-item-2-3',
                      type: NodeType.TEXT,
                      name: '组件项2-3',
                      content: { value: '卡片' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#666666' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        
        // 画布区域
        {
          id: 'canvas-area',
          type: NodeType.GROUP,
          name: '画布区域',
          box: {
            width: { value: [600, UnitType.PX] },
            height: { value: [600, UnitType.PX] },
            padding: {
              value: [
                [0, UnitType.PX], // top
                [0, UnitType.PX], // right
                [0, UnitType.PX], // bottom
                [0, UnitType.PX]  // left
              ]
            },
            margin: {
              value: [
                [0, UnitType.PX], // top
                [0, UnitType.PX], // right
                [0, UnitType.PX], // bottom
                [0, UnitType.PX]  // left
              ]
            },
            overflow: { value: 'auto' },
            flexGrow: { value: 1 },
            flexBasis: { value: [0, UnitType.PX] }
          },
          layout: {
            type: { value: LayoutType.COLUMN },
            rowGap: { value: [16, UnitType.PX] },
            columnGap: { value: [16, UnitType.PX] }
          },
          appearance: {
            borderRadius: { value: [8, UnitType.PX] }
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
          children: [
            // 工具栏
            {
              id: 'toolbar',
              type: NodeType.GROUP,
              name: '工具栏',
              layout: {
                type: { value: LayoutType.ROW },
                rowGap: { value: [16, UnitType.PX] },
                columnGap: { value: [16, UnitType.PX] },
                alignItems: { value: AlignType.CENTER }
              },
              box: {
                width: { value: [100, UnitType.PERCENT] },
                height: { value: [48, UnitType.PX] },
                padding: {
                  value: [
                    [8, UnitType.PX],   // top
                    [16, UnitType.PX],  // right
                    [8, UnitType.PX],   // bottom
                    [16, UnitType.PX]   // left
                  ]
                },
                margin: {
                  value: [
                    [0, UnitType.PX],  // top
                    [0, UnitType.PX],  // right
                    [0, UnitType.PX],  // bottom
                    [0, UnitType.PX]   // left
                  ]
                },
                overflow: { value: 'visible' },
                flexShrink: { value: 0 }
              },
              fills: [
                {
                  type: { value: 'color' },
                  value: { value: '#f9f9f9' }
                }
              ],
              appearance: {
                borderRadius: { value: [8, UnitType.PX] }
              },
              children: [
                {
                  id: 'tool-select',
                  type: NodeType.GROUP,
                  name: '选择工具',
                  layout: {
                    type: { value: LayoutType.ROW },
                    alignItems: { value: AlignType.CENTER },
                    rowGap: { value: [4, UnitType.PX] },
                    columnGap: { value: [4, UnitType.PX] }
                  },
                  box: {
                    flexShrink: { value: 0 }
                  },
                  children: [
                    {
                      id: 'tool-select-icon',
                      type: NodeType.ICON,
                      name: '选择工具图标',
                      iconName: 'cursor',
                      size: { value: [16, UnitType.PX] },
                      color: { value: '#333333' }
                    },
                    {
                      id: 'tool-select-text',
                      type: NodeType.TEXT,
                      name: '选择工具文本',
                      content: { value: '选择' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#333333' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    }
                  ]
                },
                {
                  id: 'tool-rectangle',
                  type: NodeType.GROUP,
                  name: '矩形工具',
                  layout: {
                    type: { value: LayoutType.ROW },
                    alignItems: { value: AlignType.CENTER },
                    rowGap: { value: [4, UnitType.PX] },
                    columnGap: { value: [4, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'tool-rectangle-icon',
                      type: NodeType.ICON,
                      name: '矩形工具图标',
                      iconName: 'square',
                      size: { value: [16, UnitType.PX] },
                      color: { value: '#333333' }
                    },
                    {
                      id: 'tool-rectangle-text',
                      type: NodeType.TEXT,
                      name: '矩形工具文本',
                      content: { value: '矩形' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#333333' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    }
                  ]
                },
                {
                  id: 'tool-text',
                  type: NodeType.GROUP,
                  name: '文本工具',
                  layout: {
                    type: { value: LayoutType.ROW },
                    alignItems: { value: AlignType.CENTER },
                    rowGap: { value: [4, UnitType.PX] },
                    columnGap: { value: [4, UnitType.PX] }
                  },
                  children: [
                    {
                      id: 'tool-text-icon',
                      type: NodeType.ICON,
                      name: '文本工具图标',
                      iconName: 'type',
                      size: { value: [16, UnitType.PX] },
                      color: { value: '#333333' }
                    },
                    {
                      id: 'tool-text-text',
                      type: NodeType.TEXT,
                      name: '文本工具文本',
                      content: { value: '文本' },
                      font: {
                        fontSize: { value: [14, UnitType.PX] },
                        color: { value: '#333333' },
                        fontFamily: { value: 'Arial, sans-serif' },
                        lineHeight: { value: [1.5, UnitType.EM] }
                      },
                      box: {
                        padding: {
                          value: [
                            [2, UnitType.PX],  // top
                            [4, UnitType.PX],  // right
                            [2, UnitType.PX],  // bottom
                            [4, UnitType.PX]   // left
                          ]
                        }
                      }
                    }
                  ]
                }
              ]
            },
            
            // 实际画布
            {
              id: 'canvas',
              type: NodeType.GROUP,
              name: '画布',
              box: {
                width: { value: [500, UnitType.PX] },
                height: { value: [500, UnitType.PX] },
                padding: {
                  value: [
                    [20, UnitType.PX],  // top
                    [20, UnitType.PX],  // right
                    [20, UnitType.PX],  // bottom
                    [20, UnitType.PX]   // left
                  ]
                },
                margin: {
                  value: [
                    [8, UnitType.PX],  // top
                    [0, UnitType.PX],  // right
                    [0, UnitType.PX],  // bottom
                    [0, UnitType.PX]   // left
                  ]
                },
                overflow: { value: 'scroll' }
              },
              appearance: {
                borderRadius: { value: [0, UnitType.PX] }
              },
              fills: [
                {
                  type: { value: 'color' },
                  value: { value: '#f0f0f0' }
                }
              ],
              strokes: [
                {
                  width: { value: [1, UnitType.PX] },
                  style: { value: 'dashed' },
                  color: { value: '#cccccc' }
                }
              ],
              children: [
                // 示例卡片1
                {
                  id: 'example-card-1',
                  type: NodeType.GROUP,
                  name: '示例卡片1',
                  position: { x: [50, UnitType.PX], y: [50, UnitType.PX] },
                  box: {
                    width: { value: [240, UnitType.PX] },
                    height: { value: [200, UnitType.PX] },
                    padding: {
                      value: [
                        [16, UnitType.PX],  // top
                        [16, UnitType.PX],  // right
                        [16, UnitType.PX],  // bottom
                        [16, UnitType.PX]    // left
                      ]
                    },
                    margin: {
                      value: [
                        [0, UnitType.PX],  // top
                        [0, UnitType.PX],  // right
                        [0, UnitType.PX],  // bottom
                        [0, UnitType.PX]    // left
                      ]
                    },
                    overflow: { value: 'hidden' }
                  },
                  layout: {
                    type: { value: LayoutType.COLUMN },
                    rowGap: { value: [12, UnitType.PX] },
                    columnGap: { value: [12, UnitType.PX] }
                  },
                  appearance: {
                    borderRadius: { value: [8, UnitType.PX] }
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
                      blur: { value: [8, UnitType.PX] },
                      spread: { value: [0, UnitType.PX] },
                      color: { value: 'rgba(0, 0, 0, 0.1)' }
                    }
                  ],
                  children: [
                    {
                      id: 'card-header-1',
                      type: NodeType.GROUP,
                      name: '卡片标题1',
                      layout: {
                        type: { value: LayoutType.ROW },
                        alignItems: { value: AlignType.CENTER },
                        justifyContent: { value: AlignType.SPACE_BETWEEN }
                      },
                      box: {
                        padding: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [0, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        margin: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [8, UnitType.PX],   // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        overflow: { value: 'visible' }
                      },
                      children: [
                        {
                          id: 'card-title-1',
                          type: NodeType.TEXT,
                          name: '卡片标题文本1',
                          content: { value: '产品信息' },
                          font: {
                            fontSize: { value: [18, UnitType.PX] },
                            fontWeight: { value: 700 },
                            color: { value: '#333333' },
                            fontFamily: { value: 'Arial, sans-serif' },
                            lineHeight: { value: [1.2, UnitType.EM] }
                          },
                          box: {
                            padding: {
                              value: [
                                [2, UnitType.PX],  // top
                                [4, UnitType.PX],  // right
                                [2, UnitType.PX],  // bottom
                                [4, UnitType.PX]   // left
                              ]
                            },
                            flexGrow: { value: 1 }
                          },
                          textLayout: {
                            textOverflow: { value: 'ellipsis' },
                            whiteSpace: { value: 'nowrap' },
                            direction: { value: 'ltr' },
                            textIndent: { value: [0, UnitType.PX] }
                          }
                        },
                        {
                          id: 'card-icon-1',
                          type: NodeType.ICON,
                          name: '卡片图标1',
                          iconName: 'info-circle',
                          size: { value: [16, UnitType.PX] },
                          color: { value: '#666666' },
                          box: {
                            flexShrink: { value: 0 }
                          }
                        }
                      ]
                    },
                    {
                      id: 'card-content-1',
                      type: NodeType.GROUP,
                      name: '卡片内容1',
                      layout: {
                        type: { value: LayoutType.COLUMN },
                        rowGap: { value: [8, UnitType.PX] },
                        columnGap: { value: [8, UnitType.PX] }
                      },
                      box: {
                        padding: {
                          value: [
                            [8, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [8, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        margin: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [12, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        overflow: { value: 'visible' }
                      },
                      children: [
                        {
                          id: 'card-text-1',
                          type: NodeType.TEXT,
                          name: '卡片文本1',
                          content: { value: '这是一个示例卡片，展示了基本的布局和样式。您可以拖拽调整位置和大小。' },
                          font: {
                            fontSize: { value: [14, UnitType.PX] },
                            color: { value: '#666666' },
                            fontFamily: { value: 'Arial, sans-serif' },
                            lineHeight: { value: [1.5, UnitType.EM] }
                          },
                          box: {
                            padding: {
                              value: [
                                [4, UnitType.PX],  // top
                                [8, UnitType.PX],  // right
                                [4, UnitType.PX],  // bottom
                                [8, UnitType.PX]    // left
                              ]
                            },
                            overflow: { value: 'hidden' }
                          },
                          textLayout: {
                            whiteSpace: { value: 'normal' },
                            textOverflow: { value: 'ellipsis' },
                            wordBreak: { value: 'break-word' },
                            overflowWrap: { value: 'break-word' },
                            hyphens: { value: 'auto' }
                          }
                        }
                      ]
                    },
                    {
                      id: 'card-footer-1',
                      type: NodeType.GROUP,
                      name: '卡片底部1',
                      layout: {
                        type: { value: LayoutType.ROW },
                        justifyContent: { value: AlignType.END },
                        rowGap: { value: [8, UnitType.PX] },
                        columnGap: { value: [8, UnitType.PX] }
                      },
                      box: {
                        padding: {
                          value: [
                            [8, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [0, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        margin: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [0, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        overflow: { value: 'visible' }
                      },
                      children: [
                        {
                          id: 'card-button-1',
                          type: NodeType.GROUP,
                          name: '卡片按钮1',
                          layout: {
                            type: { value: LayoutType.ROW },
                            alignItems: { value: AlignType.CENTER },
                            justifyContent: { value: AlignType.CENTER },
                            rowGap: { value: [4, UnitType.PX] },
                            columnGap: { value: [4, UnitType.PX] }
                          },
                          box: {
                            width: { value: [80, UnitType.PX] },
                            height: { value: [32, UnitType.PX] },
                            flexShrink: { value: 0 }
                          },
                          appearance: {
                            borderRadius: { value: [4, UnitType.PX] }
                          },
                          fills: [
                            {
                              type: { value: 'color' },
                              value: { value: '#4285f4' }
                            }
                          ],
                          children: [
                            {
                              id: 'button-text-1',
                              type: NodeType.TEXT,
                              name: '按钮文本1',
                              content: { value: '确定' },
                              font: {
                                fontSize: { value: [14, UnitType.PX] },
                                color: { value: '#ffffff' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.5, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]   // left
                                  ]
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                
                // 示例卡片2
                {
                  id: 'example-card-2',
                  type: NodeType.GROUP,
                  name: '示例卡片2',
                  position: { x: [350, UnitType.PX], y: [150, UnitType.PX] },
                  box: {
                    width: { value: [280, UnitType.PX] },
                    height: { value: [300, UnitType.PX] },
                    padding: {
                      value: [
                        [20, UnitType.PX],  // top
                        [20, UnitType.PX],  // right
                        [20, UnitType.PX],  // bottom
                        [20, UnitType.PX]    // left
                      ]
                    },
                    margin: {
                      value: [
                        [0, UnitType.PX],  // top
                        [0, UnitType.PX],  // right
                        [0, UnitType.PX],  // bottom
                        [0, UnitType.PX]    // left
                      ]
                    },
                    overflow: { value: 'auto' }
                  },
                  layout: {
                    type: { value: LayoutType.COLUMN },
                    rowGap: { value: [16, UnitType.PX] },
                    columnGap: { value: [16, UnitType.PX] }
                  },
                  appearance: {
                    borderRadius: { value: [12, UnitType.PX] }
                  },
                  fills: [
                    {
                      type: { value: 'gradient' },
                      value: { value: 'linear-gradient(135deg, #6e8efb, #a777e3)' }
                    }
                  ],
                  effects: [
                    {
                      type: { value: 'shadow' },
                      offsetX: { value: [0, UnitType.PX] },
                      offsetY: { value: [4, UnitType.PX] },
                      blur: { value: [12, UnitType.PX] },
                      spread: { value: [0, UnitType.PX] },
                      color: { value: 'rgba(0, 0, 0, 0.2)' }
                    }
                  ],
                  children: [
                    {
                      id: 'card-header-2',
                      type: NodeType.GROUP,
                      name: '卡片标题2',
                      layout: {
                        type: { value: LayoutType.COLUMN },
                        rowGap: { value: [8, UnitType.PX] },
                        columnGap: { value: [8, UnitType.PX] }
                      },
                      box: {
                        padding: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [0, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        margin: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [12, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        overflow: { value: 'visible' }
                      },
                      children: [
                        {
                          id: 'card-title-2',
                          type: NodeType.TEXT,
                          name: '卡片标题文本2',
                          content: { value: '统计数据' },
                          font: {
                            fontSize: { value: [20, UnitType.PX] },
                            fontWeight: { value: 700 },
                            color: { value: '#ffffff' },
                            fontFamily: { value: 'Arial, sans-serif' },
                            lineHeight: { value: [1.2, UnitType.EM] }
                          },
                          box: {
                            padding: {
                              value: [
                                [2, UnitType.PX],  // top
                                [4, UnitType.PX],  // right
                                [2, UnitType.PX],  // bottom
                                [4, UnitType.PX]    // left
                              ]
                            }
                          }
                        },
                        {
                          id: 'card-subtitle-2',
                          type: NodeType.TEXT,
                          name: '卡片副标题2',
                          content: { value: '最近30天的数据概览' },
                          font: {
                            fontSize: { value: [14, UnitType.PX] },
                            color: { value: 'rgba(255, 255, 255, 0.8)' },
                            fontFamily: { value: 'Arial, sans-serif' },
                            lineHeight: { value: [1.5, UnitType.EM] }
                          },
                          box: {
                            padding: {
                              value: [
                                [2, UnitType.PX],  // top
                                [4, UnitType.PX],  // right
                                [2, UnitType.PX],  // bottom
                                [4, UnitType.PX]    // left
                              ]
                            }
                          }
                        }
                      ]
                    },
                    {
                      id: 'card-content-2',
                      type: NodeType.GROUP,
                      name: '卡片内容2',
                      layout: {
                        type: { value: LayoutType.GRID },
                        gridTemplateColumns: { value: '1fr 1fr' },
                        rowGap: { value: [16, UnitType.PX] },
                        columnGap: { value: [16, UnitType.PX] }
                      },
                      box: {
                        padding: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [0, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        margin: {
                          value: [
                            [0, UnitType.PX],  // top
                            [0, UnitType.PX],  // right
                            [0, UnitType.PX],  // bottom
                            [0, UnitType.PX]    // left
                          ]
                        },
                        overflow: { value: 'visible' },
                        flexGrow: { value: 1 }
                      },
                      children: [
                        {
                          id: 'stat-item-1',
                          type: NodeType.GROUP,
                          name: '统计项1',
                          layout: {
                            type: { value: LayoutType.COLUMN },
                            rowGap: { value: [4, UnitType.PX] },
                            columnGap: { value: [4, UnitType.PX] }
                          },
                          box: {
                            padding: {
                              value: [
                                [8, UnitType.PX],  // top
                                [8, UnitType.PX],  // right
                                [8, UnitType.PX],  // bottom
                                [8, UnitType.PX]    // left
                              ]
                            },
                            margin: {
                              value: [
                                [0, UnitType.PX],  // top
                                [0, UnitType.PX],  // right
                                [0, UnitType.PX],  // bottom
                                [0, UnitType.PX]    // left
                              ]
                            },
                            overflow: { value: 'hidden' }
                          },
                          children: [
                            {
                              id: 'stat-label-1',
                              type: NodeType.TEXT,
                              name: '统计标签1',
                              content: { value: '访问量' },
                              font: {
                                fontSize: { value: [12, UnitType.PX] },
                                color: { value: 'rgba(255, 255, 255, 0.7)' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.5, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              },
                              textLayout: {
                                textOverflow: { value: 'ellipsis' },
                                whiteSpace: { value: 'nowrap' }
                              }
                            },
                            {
                              id: 'stat-value-1',
                              type: NodeType.TEXT,
                              name: '统计值1',
                              content: { value: '12,846' },
                              font: {
                                fontSize: { value: [24, UnitType.PX] },
                                fontWeight: { value: 700 },
                                color: { value: '#ffffff' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.2, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              },
                              textLayout: {
                                textOverflow: { value: 'ellipsis' },
                                whiteSpace: { value: 'nowrap' },
                                direction: { value: 'ltr' }
                              }
                            }
                          ]
                        },
                        {
                          id: 'stat-item-2',
                          type: NodeType.GROUP,
                          name: '统计项2',
                          layout: {
                            type: { value: LayoutType.COLUMN },
                            rowGap: { value: [4, UnitType.PX] },
                            columnGap: { value: [4, UnitType.PX] }
                          },
                          box: {
                            padding: {
                              value: [
                                [8, UnitType.PX],  // top
                                [8, UnitType.PX],  // right
                                [8, UnitType.PX],  // bottom
                                [8, UnitType.PX]    // left
                              ]
                            },
                            margin: {
                              value: [
                                [0, UnitType.PX],  // top
                                [0, UnitType.PX],  // right
                                [0, UnitType.PX],  // bottom
                                [0, UnitType.PX]    // left
                              ]
                            },
                            overflow: { value: 'hidden' }
                          },
                          children: [
                            {
                              id: 'stat-label-2',
                              type: NodeType.TEXT,
                              name: '统计标签2',
                              content: { value: '转化率' },
                              font: {
                                fontSize: { value: [12, UnitType.PX] },
                                color: { value: 'rgba(255, 255, 255, 0.7)' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.5, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              }
                            },
                            {
                              id: 'stat-value-2',
                              type: NodeType.TEXT,
                              name: '统计值2',
                              content: { value: '24.3%' },
                              font: {
                                fontSize: { value: [24, UnitType.PX] },
                                fontWeight: { value: 700 },
                                color: { value: '#ffffff' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.2, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              }
                            }
                          ]
                        },
                        {
                          id: 'stat-item-3',
                          type: NodeType.GROUP,
                          name: '统计项3',
                          layout: {
                            type: { value: LayoutType.COLUMN },
                            rowGap: { value: [4, UnitType.PX] },
                            columnGap: { value: [4, UnitType.PX] }
                          },
                          box: {
                            padding: {
                              value: [
                                [8, UnitType.PX],  // top
                                [8, UnitType.PX],  // right
                                [8, UnitType.PX],  // bottom
                                [8, UnitType.PX]    // left
                              ]
                            },
                            margin: {
                              value: [
                                [0, UnitType.PX],  // top
                                [0, UnitType.PX],  // right
                                [0, UnitType.PX],  // bottom
                                [0, UnitType.PX]    // left
                              ]
                            },
                            overflow: { value: 'hidden' }
                          },
                          children: [
                            {
                              id: 'stat-label-3',
                              type: NodeType.TEXT,
                              name: '统计标签3',
                              content: { value: '用户数' },
                              font: {
                                fontSize: { value: [12, UnitType.PX] },
                                color: { value: 'rgba(255, 255, 255, 0.7)' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.5, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              }
                            },
                            {
                              id: 'stat-value-3',
                              type: NodeType.TEXT,
                              name: '统计值3',
                              content: { value: '3,254' },
                              font: {
                                fontSize: { value: [24, UnitType.PX] },
                                fontWeight: { value: 700 },
                                color: { value: '#ffffff' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.2, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              }
                            }
                          ]
                        },
                        {
                          id: 'stat-item-4',
                          type: NodeType.GROUP,
                          name: '统计项4',
                          layout: {
                            type: { value: LayoutType.COLUMN },
                            rowGap: { value: [4, UnitType.PX] },
                            columnGap: { value: [4, UnitType.PX] }
                          },
                          box: {
                            padding: {
                              value: [
                                [8, UnitType.PX],  // top
                                [8, UnitType.PX],  // right
                                [8, UnitType.PX],  // bottom
                                [8, UnitType.PX]    // left
                              ]
                            },
                            margin: {
                              value: [
                                [0, UnitType.PX],  // top
                                [0, UnitType.PX],  // right
                                [0, UnitType.PX],  // bottom
                                [0, UnitType.PX]    // left
                              ]
                            },
                            overflow: { value: 'hidden' }
                          },
                          children: [
                            {
                              id: 'stat-label-4',
                              type: NodeType.TEXT,
                              name: '统计标签4',
                              content: { value: '平均停留' },
                              font: {
                                fontSize: { value: [12, UnitType.PX] },
                                color: { value: 'rgba(255, 255, 255, 0.7)' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.5, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
                              }
                            },
                            {
                              id: 'stat-value-4',
                              type: NodeType.TEXT,
                              name: '统计值4',
                              content: { value: '4:32' },
                              font: {
                                fontSize: { value: [24, UnitType.PX] },
                                fontWeight: { value: 700 },
                                color: { value: '#ffffff' },
                                fontFamily: { value: 'Arial, sans-serif' },
                                lineHeight: { value: [1.2, UnitType.EM] }
                              },
                              box: {
                                padding: {
                                  value: [
                                    [2, UnitType.PX],  // top
                                    [4, UnitType.PX],  // right
                                    [2, UnitType.PX],  // bottom
                                    [4, UnitType.PX]    // left
                                  ]
                                }
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

// 新的页面根节点
export const canvasData: PageNode = {
  id: 'page',
  type: NodeType.PAGE,
  name: '设计页面',
  box: {
    width: { value: [1920, UnitType.PX] },
    height: { value: [1080, UnitType.PX] },
    overflow: { value: 'auto' }
  },
  font: {
    fontFamily: { value: 'Arial, sans-serif' },
    fontSize: { value: [14, UnitType.PX] },
    color: { value: '#333333' }
  },
  children: [rootNode]
};

export default canvasData; 