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
  Node
} from './types';

// 示例画布数据
const rootNode: GroupNode = {
  id: 'root',
  type: NodeType.GROUP,
  name: '画布根节点',
  box: {
    padding: [
      [16, UnitType.PX], // top
      [16, UnitType.PX], // right
      [16, UnitType.PX], // bottom
      [16, UnitType.PX]  // left
    ],
    margin: [
      [0, UnitType.PX], // top
      [0, UnitType.PX], // right
      [0, UnitType.PX], // bottom
      [0, UnitType.PX]  // left
    ],
    overflow: 'hidden'
  },
  children: [
    // 导航栏
    {
      id: 'navbar',
      type: NodeType.GROUP,
      name: '导航栏',
      position: { x: [0, UnitType.PX], y: [0, UnitType.PX] },
      box: {
        width: '100%',
        height: [64, UnitType.PX],
        padding: [
          [0, UnitType.PX],  // top
          [24, UnitType.PX], // right
          [0, UnitType.PX],  // bottom
          [24, UnitType.PX]  // left
        ],
        margin: [
          [0, UnitType.PX],   // top
          [0, UnitType.PX],   // right
          [16, UnitType.PX],  // bottom
          [0, UnitType.PX]    // left
        ],
        overflow: 'visible'
      },
      layout: {
        type: LayoutType.ROW,
        justifyContent: AlignType.SPACE_BETWEEN,
        alignItems: AlignType.CENTER,
        gap: [16, UnitType.PX]
      },
      appearance: {
        opacity: [1, ''],
        borderRadius: [0, UnitType.PX]
      },
      fills: [
        {
          type: 'color',
          value: '#ffffff'
        }
      ],
      strokes: [
        {
          width: [1, UnitType.PX],
          style: 'solid',
          color: '#e0e0e0'
        }
      ],
      effects: [
        {
          type: 'shadow',
          offsetX: [0, UnitType.PX],
          offsetY: [2, UnitType.PX],
          blur: [4, UnitType.PX],
          spread: [0, UnitType.PX],
          color: 'rgba(0, 0, 0, 0.1)'
        }
      ],
      children: [
        {
          id: 'logo',
          type: NodeType.GROUP,
          name: 'Logo区域',
          layout: {
            type: LayoutType.ROW,
            alignItems: AlignType.CENTER,
            gap: [8, UnitType.PX]
          },
          children: [
            {
              id: 'logo-icon',
              type: NodeType.ICON,
              name: 'Logo图标',
              iconName: 'logo',
              size: [32, UnitType.PX],
              color: '#4285f4',
              box: {
                flexShrink: 0
              }
            },
            {
              id: 'logo-text',
              type: NodeType.TEXT,
              name: 'Logo文字',
              content: 'Designer',
              font: {
                fontSize: [20, UnitType.PX],
                fontWeight: 'bold',
                color: '#333333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: [1.2, UnitType.EM]
              },
              box: {
                padding: [
                  [2, UnitType.PX],  // top
                  [4, UnitType.PX],  // right
                  [2, UnitType.PX],  // bottom
                  [4, UnitType.PX]   // left
                ],
                overflow: 'hidden',
                flexGrow: 1
              },
              textLayout: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            }
          ]
        },
        {
          id: 'nav-links',
          type: NodeType.GROUP,
          name: '导航链接',
          layout: {
            type: LayoutType.ROW,
            gap: [24, UnitType.PX],
            alignItems: AlignType.CENTER
          },
          children: [
            {
              id: 'nav-link-1',
              type: NodeType.TEXT,
              name: '导航链接1',
              content: '首页',
              font: {
                fontSize: [16, UnitType.PX],
                color: '#333333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: [1.5, UnitType.EM]
              },
              box: {
                padding: [
                  [4, UnitType.PX],  // top
                  [8, UnitType.PX],  // right
                  [4, UnitType.PX],  // bottom
                  [8, UnitType.PX]   // left
                ],
                flexShrink: 0
              },
              textLayout: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                wordBreak: 'normal'
              }
            },
            {
              id: 'nav-link-2',
              type: NodeType.TEXT,
              name: '导航链接2',
              content: '画布',
              font: {
                fontSize: [16, UnitType.PX],
                color: '#333333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: [1.5, UnitType.EM]
              },
              box: {
                padding: [
                  [4, UnitType.PX],  // top
                  [8, UnitType.PX],  // right
                  [4, UnitType.PX],  // bottom
                  [8, UnitType.PX]   // left
                ]
              }
            },
            {
              id: 'nav-link-3',
              type: NodeType.TEXT,
              name: '导航链接3',
              content: '组件',
              font: {
                fontSize: [16, UnitType.PX],
                color: '#333333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: [1.5, UnitType.EM]
              },
              box: {
                padding: [
                  [4, UnitType.PX],  // top
                  [8, UnitType.PX],  // right
                  [4, UnitType.PX],  // bottom
                  [8, UnitType.PX]   // left
                ]
              }
            }
          ]
        },
        {
          id: 'user-profile',
          type: NodeType.GROUP,
          name: '用户信息',
          layout: {
            type: LayoutType.ROW,
            alignItems: AlignType.CENTER,
            gap: [8, UnitType.PX]
          },
          children: [
            {
              id: 'user-icon',
              type: NodeType.ICON,
              name: '用户图标',
              iconName: 'user-circle',
              size: [24, UnitType.PX],
              color: '#666666'
            },
            {
              id: 'user-name',
              type: NodeType.TEXT,
              name: '用户名',
              content: '张三',
              font: {
                fontSize: [14, UnitType.PX],
                color: '#333333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: [1.5, UnitType.EM]
              },
              box: {
                padding: [
                  [2, UnitType.PX],  // top
                  [4, UnitType.PX],  // right
                  [2, UnitType.PX],  // bottom
                  [4, UnitType.PX]   // left
                ]
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
        width: '100%',
        height: 'auto',
        padding: [
          [24, UnitType.PX], // top
          [24, UnitType.PX], // right
          [24, UnitType.PX], // bottom
          [24, UnitType.PX]  // left
        ],
        margin: [
          [0, UnitType.PX], // top
          [0, UnitType.PX], // right
          [0, UnitType.PX], // bottom
          [0, UnitType.PX]  // left
        ],
        overflow: 'visible'
      },
      layout: {
        type: LayoutType.ROW,
        gap: [24, UnitType.PX]
      },
      children: [
        // 侧边栏
        {
          id: 'sidebar',
          type: NodeType.GROUP,
          name: '侧边栏',
          box: {
            width: [240, UnitType.PX],
            height: '100%',
            padding: [
              [16, UnitType.PX], // top
              [16, UnitType.PX], // right
              [16, UnitType.PX], // bottom
              [16, UnitType.PX]  // left
            ],
            margin: [
              [0, UnitType.PX],  // top
              [16, UnitType.PX], // right
              [0, UnitType.PX],  // bottom
              [0, UnitType.PX]   // left
            ],
            overflow: 'auto',
            flexShrink: 0
          },
          layout: {
            type: LayoutType.COLUMN,
            gap: [8, UnitType.PX]
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
          children: [
            {
              id: 'sidebar-title',
              type: NodeType.TEXT,
              name: '侧边栏标题',
              content: '组件库',
              font: {
                fontSize: [18, UnitType.PX],
                fontWeight: 'bold',
                color: '#333333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: [1.2, UnitType.EM]
              },
              box: {
                padding: [
                  [4, UnitType.PX],  // top
                  [8, UnitType.PX],  // right
                  [4, UnitType.PX],  // bottom
                  [8, UnitType.PX]   // left
                ],
                margin: [
                  [0, UnitType.PX],   // top
                  [0, UnitType.PX],   // right
                  [12, UnitType.PX],  // bottom
                  [0, UnitType.PX]    // left
                ],
                overflow: 'hidden'
              },
              textLayout: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            },
            // 组件分类1
            {
              id: 'component-category-1',
              type: NodeType.GROUP,
              name: '基础组件',
              layout: {
                type: LayoutType.COLUMN,
                gap: [4, UnitType.PX]
              },
              appearance: {
                borderRadius: [4, UnitType.PX]
              },
              box: {
                padding: [
                  [8, UnitType.PX],  // top
                  [8, UnitType.PX],  // right
                  [8, UnitType.PX],  // bottom
                  [8, UnitType.PX]   // left
                ],
                margin: [
                  [0, UnitType.PX],  // top
                  [0, UnitType.PX],  // right
                  [12, UnitType.PX],  // bottom
                  [0, UnitType.PX]    // left
                ],
                overflow: 'visible'
              },
              fills: [
                {
                  type: 'color',
                  value: '#ffffff'
                }
              ],
              strokes: [
                {
                  width: [1, UnitType.PX],
                  style: 'solid',
                  color: '#e0e0e0'
                }
              ],
              children: [
                {
                  id: 'category-header-1',
                  type: NodeType.GROUP,
                  name: '分类标题1',
                  layout: {
                    type: LayoutType.ROW,
                    alignItems: AlignType.CENTER,
                    gap: [8, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'category-icon-1',
                      type: NodeType.ICON,
                      name: '分类图标1',
                      iconName: 'cube',
                      size: [16, UnitType.PX],
                      color: '#666666'
                    },
                    {
                      id: 'category-title-1',
                      type: NodeType.TEXT,
                      name: '分类标题文本1',
                      content: '基础组件',
                      font: {
                        fontSize: [16, UnitType.PX],
                        fontWeight: 'bold',
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.2, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      },
                      textLayout: {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        direction: 'ltr',
                        textIndent: [0, UnitType.PX]
                      }
                    }
                  ]
                },
                {
                  id: 'component-list-1',
                  type: NodeType.GROUP,
                  name: '组件列表1',
                  layout: {
                    type: LayoutType.COLUMN,
                    gap: [2, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'component-item-1-1',
                      type: NodeType.TEXT,
                      name: '组件项1-1',
                      content: '按钮',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    },
                    {
                      id: 'component-item-1-2',
                      type: NodeType.TEXT,
                      name: '组件项1-2',
                      content: '输入框',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    },
                    {
                      id: 'component-item-1-3',
                      type: NodeType.TEXT,
                      name: '组件项1-3',
                      content: '选择器',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
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
                type: LayoutType.COLUMN,
                gap: [4, UnitType.PX]
              },
              appearance: {
                borderRadius: [4, UnitType.PX]
              },
              fills: [
                {
                  type: 'color',
                  value: '#ffffff'
                }
              ],
              strokes: [
                {
                  width: [1, UnitType.PX],
                  style: 'solid',
                  color: '#e0e0e0'
                }
              ],
              children: [
                {
                  id: 'category-header-2',
                  type: NodeType.GROUP,
                  name: '分类标题2',
                  layout: {
                    type: LayoutType.ROW,
                    alignItems: AlignType.CENTER,
                    gap: [8, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'category-icon-2',
                      type: NodeType.ICON,
                      name: '分类图标2',
                      iconName: 'layout',
                      size: [16, UnitType.PX],
                      color: '#666666'
                    },
                    {
                      id: 'category-title-2',
                      type: NodeType.TEXT,
                      name: '分类标题文本2',
                      content: '布局组件',
                      font: {
                        fontSize: [16, UnitType.PX],
                        fontWeight: 'bold',
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.2, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    }
                  ]
                },
                {
                  id: 'component-list-2',
                  type: NodeType.GROUP,
                  name: '组件列表2',
                  layout: {
                    type: LayoutType.COLUMN,
                    gap: [2, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'component-item-2-1',
                      type: NodeType.TEXT,
                      name: '组件项2-1',
                      content: '容器',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    },
                    {
                      id: 'component-item-2-2',
                      type: NodeType.TEXT,
                      name: '组件项2-2',
                      content: '栅格',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    },
                    {
                      id: 'component-item-2-3',
                      type: NodeType.TEXT,
                      name: '组件项2-3',
                      content: '卡片',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#666666',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
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
            width: 'auto',
            height: [600, UnitType.PX],
            padding: [
              [0, UnitType.PX], // top
              [0, UnitType.PX], // right
              [0, UnitType.PX], // bottom
              [0, UnitType.PX]  // left
            ],
            margin: [
              [0, UnitType.PX], // top
              [0, UnitType.PX], // right
              [0, UnitType.PX], // bottom
              [0, UnitType.PX]  // left
            ],
            overflow: 'auto',
            flexGrow: 1,
            flexBasis: [0, UnitType.PX]
          },
          layout: {
            type: LayoutType.COLUMN,
            gap: [16, UnitType.PX]
          },
          appearance: {
            borderRadius: [8, UnitType.PX]
          },
          fills: [
            {
              type: 'color',
              value: '#ffffff'
            }
          ],
          strokes: [
            {
              width: [1, UnitType.PX],
              style: 'solid',
              color: '#e0e0e0'
            }
          ],
          children: [
            // 工具栏
            {
              id: 'toolbar',
              type: NodeType.GROUP,
              name: '工具栏',
              layout: {
                type: LayoutType.ROW,
                gap: [16, UnitType.PX],
                alignItems: AlignType.CENTER
              },
              box: {
                width: '100%',
                height: [48, UnitType.PX],
                padding: [
                  [8, UnitType.PX],   // top
                  [16, UnitType.PX],  // right
                  [8, UnitType.PX],   // bottom
                  [16, UnitType.PX]   // left
                ],
                margin: [
                  [0, UnitType.PX],  // top
                  [0, UnitType.PX],  // right
                  [0, UnitType.PX],  // bottom
                  [0, UnitType.PX]   // left
                ],
                overflow: 'visible',
                flexShrink: 0
              },
              fills: [
                {
                  type: 'color',
                  value: '#f9f9f9'
                }
              ],
              appearance: {
                borderRadius: [8, UnitType.PX]
              },
              children: [
                {
                  id: 'tool-select',
                  type: NodeType.GROUP,
                  name: '选择工具',
                  layout: {
                    type: LayoutType.ROW,
                    alignItems: AlignType.CENTER,
                    gap: [4, UnitType.PX]
                  },
                  box: {
                    flexShrink: 0
                  },
                  children: [
                    {
                      id: 'tool-select-icon',
                      type: NodeType.ICON,
                      name: '选择工具图标',
                      iconName: 'cursor',
                      size: [16, UnitType.PX],
                      color: '#333333'
                    },
                    {
                      id: 'tool-select-text',
                      type: NodeType.TEXT,
                      name: '选择工具文本',
                      content: '选择',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    }
                  ]
                },
                {
                  id: 'tool-rectangle',
                  type: NodeType.GROUP,
                  name: '矩形工具',
                  layout: {
                    type: LayoutType.ROW,
                    alignItems: AlignType.CENTER,
                    gap: [4, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'tool-rectangle-icon',
                      type: NodeType.ICON,
                      name: '矩形工具图标',
                      iconName: 'square',
                      size: [16, UnitType.PX],
                      color: '#333333'
                    },
                    {
                      id: 'tool-rectangle-text',
                      type: NodeType.TEXT,
                      name: '矩形工具文本',
                      content: '矩形',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
                      }
                    }
                  ]
                },
                {
                  id: 'tool-text',
                  type: NodeType.GROUP,
                  name: '文本工具',
                  layout: {
                    type: LayoutType.ROW,
                    alignItems: AlignType.CENTER,
                    gap: [4, UnitType.PX]
                  },
                  children: [
                    {
                      id: 'tool-text-icon',
                      type: NodeType.ICON,
                      name: '文本工具图标',
                      iconName: 'type',
                      size: [16, UnitType.PX],
                      color: '#333333'
                    },
                    {
                      id: 'tool-text-text',
                      type: NodeType.TEXT,
                      name: '文本工具文本',
                      content: '文本',
                      font: {
                        fontSize: [14, UnitType.PX],
                        color: '#333333',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: [1.5, UnitType.EM]
                      },
                      box: {
                        padding: [
                          [2, UnitType.PX],  // top
                          [4, UnitType.PX],  // right
                          [2, UnitType.PX],  // bottom
                          [4, UnitType.PX]   // left
                        ]
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
                width: 'auto',
                height: [500, UnitType.PX],
                padding: [
                  [20, UnitType.PX],  // top
                  [20, UnitType.PX],  // right
                  [20, UnitType.PX],  // bottom
                  [20, UnitType.PX]   // left
                ],
                margin: [
                  [8, UnitType.PX],  // top
                  [0, UnitType.PX],  // right
                  [0, UnitType.PX],  // bottom
                  [0, UnitType.PX]   // left
                ],
                overflow: 'scroll'
              },
              appearance: {
                borderRadius: [0, UnitType.PX]
              },
              fills: [
                {
                  type: 'color',
                  value: '#f0f0f0'
                }
              ],
              strokes: [
                {
                  width: [1, UnitType.PX],
                  style: 'dashed',
                  color: '#cccccc'
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
                    width: [240, UnitType.PX],
                    height: 'auto',
                    padding: [
                      [16, UnitType.PX],  // top
                      [16, UnitType.PX],  // right
                      [16, UnitType.PX],  // bottom
                      [16, UnitType.PX]    // left
                    ],
                    margin: [
                      [0, UnitType.PX],  // top
                      [0, UnitType.PX],  // right
                      [0, UnitType.PX],  // bottom
                      [0, UnitType.PX]    // left
                    ],
                    overflow: 'hidden'
                  },
                  layout: {
                    type: LayoutType.COLUMN,
                    gap: [12, UnitType.PX]
                  },
                  appearance: {
                    borderRadius: [8, UnitType.PX]
                  },
                  fills: [
                    {
                      type: 'color',
                      value: '#ffffff'
                    }
                  ],
                  strokes: [
                    {
                      width: [1, UnitType.PX],
                      style: 'solid',
                      color: '#e0e0e0'
                    }
                  ],
                  effects: [
                    {
                      type: 'shadow',
                      offsetX: [0, UnitType.PX],
                      offsetY: [2, UnitType.PX],
                      blur: [8, UnitType.PX],
                      spread: [0, UnitType.PX],
                      color: 'rgba(0, 0, 0, 0.1)'
                    }
                  ],
                  children: [
                    {
                      id: 'card-header-1',
                      type: NodeType.GROUP,
                      name: '卡片标题1',
                      layout: {
                        type: LayoutType.ROW,
                        alignItems: AlignType.CENTER,
                        justifyContent: AlignType.SPACE_BETWEEN
                      },
                      box: {
                        padding: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [0, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        margin: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [8, UnitType.PX],   // bottom
                          [0, UnitType.PX]    // left
                        ],
                        overflow: 'visible'
                      },
                      children: [
                        {
                          id: 'card-title-1',
                          type: NodeType.TEXT,
                          name: '卡片标题文本1',
                          content: '产品信息',
                          font: {
                            fontSize: [18, UnitType.PX],
                            fontWeight: 'bold',
                            color: '#333333',
                            fontFamily: 'Arial, sans-serif',
                            lineHeight: [1.2, UnitType.EM]
                          },
                          box: {
                            padding: [
                              [2, UnitType.PX],  // top
                              [4, UnitType.PX],  // right
                              [2, UnitType.PX],  // bottom
                              [4, UnitType.PX]   // left
                            ],
                            flexGrow: 1
                          },
                          textLayout: {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            direction: 'ltr',
                            textIndent: [0, UnitType.PX]
                          }
                        },
                        {
                          id: 'card-icon-1',
                          type: NodeType.ICON,
                          name: '卡片图标1',
                          iconName: 'info-circle',
                          size: [16, UnitType.PX],
                          color: '#666666',
                          box: {
                            flexShrink: 0
                          }
                        }
                      ]
                    },
                    {
                      id: 'card-content-1',
                      type: NodeType.GROUP,
                      name: '卡片内容1',
                      layout: {
                        type: LayoutType.COLUMN,
                        gap: [8, UnitType.PX]
                      },
                      box: {
                        padding: [
                          [8, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [8, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        margin: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [12, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        overflow: 'visible'
                      },
                      children: [
                        {
                          id: 'card-text-1',
                          type: NodeType.TEXT,
                          name: '卡片文本1',
                          content: '这是一个示例卡片，展示了基本的布局和样式。您可以拖拽调整位置和大小。',
                          font: {
                            fontSize: [14, UnitType.PX],
                            color: '#666666',
                            fontFamily: 'Arial, sans-serif',
                            lineHeight: [1.5, UnitType.EM]
                          },
                          box: {
                            padding: [
                              [4, UnitType.PX],  // top
                              [8, UnitType.PX],  // right
                              [4, UnitType.PX],  // bottom
                              [8, UnitType.PX]    // left
                            ],
                            overflow: 'hidden'
                          },
                          textLayout: {
                            whiteSpace: 'normal',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            hyphens: 'auto'
                          }
                        }
                      ]
                    },
                    {
                      id: 'card-footer-1',
                      type: NodeType.GROUP,
                      name: '卡片底部1',
                      layout: {
                        type: LayoutType.ROW,
                        justifyContent: AlignType.END,
                        gap: [8, UnitType.PX]
                      },
                      box: {
                        padding: [
                          [8, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [0, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        margin: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [0, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        overflow: 'visible'
                      },
                      children: [
                        {
                          id: 'card-button-1',
                          type: NodeType.GROUP,
                          name: '卡片按钮1',
                          layout: {
                            type: LayoutType.ROW,
                            alignItems: AlignType.CENTER,
                            justifyContent: AlignType.CENTER,
                            gap: [4, UnitType.PX]
                          },
                          box: {
                            width: [80, UnitType.PX],
                            height: [32, UnitType.PX],
                            flexShrink: 0
                          },
                          appearance: {
                            borderRadius: [4, UnitType.PX]
                          },
                          fills: [
                            {
                              type: 'color',
                              value: '#4285f4'
                            }
                          ],
                          children: [
                            {
                              id: 'button-text-1',
                              type: NodeType.TEXT,
                              name: '按钮文本1',
                              content: '确定',
                              font: {
                                fontSize: [14, UnitType.PX],
                                color: '#ffffff',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.5, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]   // left
                                ]
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
                    width: [280, UnitType.PX],
                    height: 'auto',
                    padding: [
                      [20, UnitType.PX],  // top
                      [20, UnitType.PX],  // right
                      [20, UnitType.PX],  // bottom
                      [20, UnitType.PX]    // left
                    ],
                    margin: [
                      [0, UnitType.PX],  // top
                      [0, UnitType.PX],  // right
                      [0, UnitType.PX],  // bottom
                      [0, UnitType.PX]    // left
                    ],
                    overflow: 'hidden'
                  },
                  layout: {
                    type: LayoutType.COLUMN,
                    gap: [16, UnitType.PX]
                  },
                  appearance: {
                    borderRadius: [12, UnitType.PX]
                  },
                  fills: [
                    {
                      type: 'gradient',
                      value: 'linear-gradient(135deg, #6e8efb, #a777e3)'
                    }
                  ],
                  effects: [
                    {
                      type: 'shadow',
                      offsetX: [0, UnitType.PX],
                      offsetY: [4, UnitType.PX],
                      blur: [12, UnitType.PX],
                      spread: [0, UnitType.PX],
                      color: 'rgba(0, 0, 0, 0.2)'
                    }
                  ],
                  children: [
                    {
                      id: 'card-header-2',
                      type: NodeType.GROUP,
                      name: '卡片标题2',
                      layout: {
                        type: LayoutType.COLUMN,
                        gap: [8, UnitType.PX]
                      },
                      box: {
                        padding: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [0, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        margin: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [12, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        overflow: 'visible'
                      },
                      children: [
                        {
                          id: 'card-title-2',
                          type: NodeType.TEXT,
                          name: '卡片标题文本2',
                          content: '统计数据',
                          font: {
                            fontSize: [20, UnitType.PX],
                            fontWeight: 'bold',
                            color: '#ffffff',
                            fontFamily: 'Arial, sans-serif',
                            lineHeight: [1.2, UnitType.EM]
                          },
                          box: {
                            padding: [
                              [2, UnitType.PX],  // top
                              [4, UnitType.PX],  // right
                              [2, UnitType.PX],  // bottom
                              [4, UnitType.PX]    // left
                            ]
                          }
                        },
                        {
                          id: 'card-subtitle-2',
                          type: NodeType.TEXT,
                          name: '卡片副标题2',
                          content: '最近30天的数据概览',
                          font: {
                            fontSize: [14, UnitType.PX],
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontFamily: 'Arial, sans-serif',
                            lineHeight: [1.5, UnitType.EM]
                          },
                          box: {
                            padding: [
                              [2, UnitType.PX],  // top
                              [4, UnitType.PX],  // right
                              [2, UnitType.PX],  // bottom
                              [4, UnitType.PX]    // left
                            ]
                          }
                        }
                      ]
                    },
                    {
                      id: 'card-content-2',
                      type: NodeType.GROUP,
                      name: '卡片内容2',
                      layout: {
                        type: LayoutType.GRID,
                        gridTemplateColumns: '1fr 1fr',
                        gap: [16, UnitType.PX]
                      },
                      box: {
                        padding: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [0, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        margin: [
                          [0, UnitType.PX],  // top
                          [0, UnitType.PX],  // right
                          [0, UnitType.PX],  // bottom
                          [0, UnitType.PX]    // left
                        ],
                        overflow: 'visible',
                        flexGrow: 1
                      },
                      children: [
                        {
                          id: 'stat-item-1',
                          type: NodeType.GROUP,
                          name: '统计项1',
                          layout: {
                            type: LayoutType.COLUMN,
                            gap: [4, UnitType.PX]
                          },
                          box: {
                            padding: [
                              [8, UnitType.PX],  // top
                              [8, UnitType.PX],  // right
                              [8, UnitType.PX],  // bottom
                              [8, UnitType.PX]    // left
                            ],
                            margin: [
                              [0, UnitType.PX],  // top
                              [0, UnitType.PX],  // right
                              [0, UnitType.PX],  // bottom
                              [0, UnitType.PX]    // left
                            ],
                            overflow: 'hidden'
                          },
                          children: [
                            {
                              id: 'stat-label-1',
                              type: NodeType.TEXT,
                              name: '统计标签1',
                              content: '访问量',
                              font: {
                                fontSize: [12, UnitType.PX],
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.5, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              },
                              textLayout: {
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }
                            },
                            {
                              id: 'stat-value-1',
                              type: NodeType.TEXT,
                              name: '统计值1',
                              content: '12,846',
                              font: {
                                fontSize: [24, UnitType.PX],
                                fontWeight: 'bold',
                                color: '#ffffff',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.2, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              },
                              textLayout: {
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                direction: 'ltr'
                              }
                            }
                          ]
                        },
                        {
                          id: 'stat-item-2',
                          type: NodeType.GROUP,
                          name: '统计项2',
                          layout: {
                            type: LayoutType.COLUMN,
                            gap: [4, UnitType.PX]
                          },
                          box: {
                            padding: [
                              [8, UnitType.PX],  // top
                              [8, UnitType.PX],  // right
                              [8, UnitType.PX],  // bottom
                              [8, UnitType.PX]    // left
                            ],
                            margin: [
                              [0, UnitType.PX],  // top
                              [0, UnitType.PX],  // right
                              [0, UnitType.PX],  // bottom
                              [0, UnitType.PX]    // left
                            ],
                            overflow: 'hidden'
                          },
                          children: [
                            {
                              id: 'stat-label-2',
                              type: NodeType.TEXT,
                              name: '统计标签2',
                              content: '转化率',
                              font: {
                                fontSize: [12, UnitType.PX],
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.5, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              }
                            },
                            {
                              id: 'stat-value-2',
                              type: NodeType.TEXT,
                              name: '统计值2',
                              content: '24.3%',
                              font: {
                                fontSize: [24, UnitType.PX],
                                fontWeight: 'bold',
                                color: '#ffffff',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.2, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              }
                            }
                          ]
                        },
                        {
                          id: 'stat-item-3',
                          type: NodeType.GROUP,
                          name: '统计项3',
                          layout: {
                            type: LayoutType.COLUMN,
                            gap: [4, UnitType.PX]
                          },
                          box: {
                            padding: [
                              [8, UnitType.PX],  // top
                              [8, UnitType.PX],  // right
                              [8, UnitType.PX],  // bottom
                              [8, UnitType.PX]    // left
                            ],
                            margin: [
                              [0, UnitType.PX],  // top
                              [0, UnitType.PX],  // right
                              [0, UnitType.PX],  // bottom
                              [0, UnitType.PX]    // left
                            ],
                            overflow: 'hidden'
                          },
                          children: [
                            {
                              id: 'stat-label-3',
                              type: NodeType.TEXT,
                              name: '统计标签3',
                              content: '用户数',
                              font: {
                                fontSize: [12, UnitType.PX],
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.5, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              }
                            },
                            {
                              id: 'stat-value-3',
                              type: NodeType.TEXT,
                              name: '统计值3',
                              content: '3,254',
                              font: {
                                fontSize: [24, UnitType.PX],
                                fontWeight: 'bold',
                                color: '#ffffff',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.2, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              }
                            }
                          ]
                        },
                        {
                          id: 'stat-item-4',
                          type: NodeType.GROUP,
                          name: '统计项4',
                          layout: {
                            type: LayoutType.COLUMN,
                            gap: [4, UnitType.PX]
                          },
                          box: {
                            padding: [
                              [8, UnitType.PX],  // top
                              [8, UnitType.PX],  // right
                              [8, UnitType.PX],  // bottom
                              [8, UnitType.PX]    // left
                            ],
                            margin: [
                              [0, UnitType.PX],  // top
                              [0, UnitType.PX],  // right
                              [0, UnitType.PX],  // bottom
                              [0, UnitType.PX]    // left
                            ],
                            overflow: 'hidden'
                          },
                          children: [
                            {
                              id: 'stat-label-4',
                              type: NodeType.TEXT,
                              name: '统计标签4',
                              content: '平均停留',
                              font: {
                                fontSize: [12, UnitType.PX],
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.5, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
                              }
                            },
                            {
                              id: 'stat-value-4',
                              type: NodeType.TEXT,
                              name: '统计值4',
                              content: '4:32',
                              font: {
                                fontSize: [24, UnitType.PX],
                                fontWeight: 'bold',
                                color: '#ffffff',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: [1.2, UnitType.EM]
                              },
                              box: {
                                padding: [
                                  [2, UnitType.PX],  // top
                                  [4, UnitType.PX],  // right
                                  [2, UnitType.PX],  // bottom
                                  [4, UnitType.PX]    // left
                                ]
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
    width: [1920, UnitType.PX],
    height: [1080, UnitType.PX],
    overflow: 'auto'
  },
  font: {
    fontFamily: 'Arial, sans-serif',
    fontSize: [14, UnitType.PX],
    color: '#333333'
  },
  children: [rootNode]
};

export default canvasData; 