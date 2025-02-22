import {Atom, atom, autorun, computed, RenderContext, RxList, RxSet} from "axii";
import {Avatar, Button, Checkbox, Dropdown, Input} from 'axii-ui'
import {common} from '../../common.js'
import {Filter} from "./Filter.js";
import AddOne from "axii-icon-park/AddOne.js";
import {data, Task} from "./data.js";
import Left from "axii-icon-park/Left.js";
import DoubleLeft from "axii-icon-park/DoubleLeft.js";
import Right from "axii-icon-park/Right.js";
import DoubleRight from "axii-icon-park/DoubleRight.js";
import Loading from "axii-icon-park/Loading.js";
import ArrowUp from "axii-icon-park/ArrowUp.js";
import ArrowDown from "axii-icon-park/ArrowDown.js";
import PreviewCloseOne from "axii-icon-park/PreviewCloseOne.js";
import Sort from 'axii-icon-park/SortFour.js'

type StatusFilterOptionProps = {
    option: [string, Atom<boolean>]
}

function StatusFilterOption({option}: StatusFilterOptionProps, {createElement}: RenderContext) {
    return <div style={common.layout.rowCenter({gap: common.sizes.space.gap()})}>
        <Checkbox value={option[1]} as='toggle' />
        <span>{option[0]}</span>
    </div>
}


export function App({}, {createElement, Fragment, createRef}: RenderContext) {
    const status = new RxList(['backlog', 'todo','in progress', 'done', 'cancelled'])
    const selectedStatus = new RxSet<string>([])
    const statusWithSelected = status.createSelection(selectedStatus)
    const statusSearch = atom('')
    const displayStatus = statusWithSelected.filter(([s]) => {
        return s.includes(statusSearch())
    })

    const statusLabelNode = (
        <div style={common.layout.rowCenter({gap: common.sizes.space.itemGap()})}>
            <span style={common.layout.rowCenter({gap: common.sizes.space.itemGap()})}>
                <AddOne/>
                <span>Status</span>
            </span>
            {() => selectedStatus.size() ?
                <span>{selectedStatus.size()} selected</span>
                : null
            }
        </div>
    )

    const onStatusToggle = (_: any, [{option}]: [Parameters<typeof StatusFilterOption>[0]]) => {
        if (selectedStatus.data.has(option[0])) {
            selectedStatus.delete(option[0])
        } else {
            selectedStatus.add(option[0])
        }
    }

    const currentPage = atom(1)
    const rowsPerPage = atom(5)
    const titleSearch = atom('')
    const sort = atom<{[key in keyof Task]?: 'asc'|'desc'}>({})

    const tasks = new RxList<Task>(async function() {
        const result = data.filter((item) => {
            // status 检查, FIXME RxList 增加 includes 方法
            if (selectedStatus.size() && !selectedStatus.data.has(item.status)) {
                return false
            }

            // 搜索关键字检查
            if (titleSearch() && !item.title.includes(titleSearch())) {
                return false
            }

            return true
        })

        let sortedResult = result
        Object.entries(sort()).filter(([key, value]) => value).forEach(([key, value]) => {
            const prop = key as keyof Task
            sortedResult = sortedResult.sort((a, b) => {
                if (value === 'asc') {
                    return a[prop] > b[prop] ? 1 : -1
                } else {
                    return a[prop] < b[prop] ? 1 : -1
                }
            })
        })

        const slicedResult = result.slice((currentPage()-1)*rowsPerPage(), currentPage()*rowsPerPage())
        await new Promise(resolve => setTimeout(resolve, 1))
        return slicedResult
    })

    const paginationButtonsStyle ={
        ...common.layout.rowCenter({gap: common.sizes.space.gap()}),
        '&>*': {
            ...common.enclosedContainer,
            ...common.layout.center(),
            ...common.boxPaddingContainer,
            cursor: 'pointer'
        }
    }

    const tableContainerRef = createRef()


    const loadingMaskStyle = {
        ...common.mask,
        ...common.layout.center(),
        opacity: .8,
        backgroundColor: common.colors.background.box.normal(),
    }

    const selectedIds = new RxSet<string>([])
    const taskIds = tasks.map(task => task.id)
    const taskIdsWithSelection = taskIds.createSelection(selectedIds)
    const taskIdToSelection = taskIdsWithSelection.toMap()

    const tasksWithSelection = tasks.map(task => {
        // console.log(task.id, taskIdToSelection.get(task.id), taskIdToSelection.data, taskIdsWithSelection.data)
        return {
            task,
            // selected: taskIdToSelection.get(task.id)
            selected: computed(function(){
                // debugger
                return taskIdToSelection.get(task.id)?.()
            })
        }
    })
    // console.log('tasksWithSelection', tasksWithSelection.id)

    const currentPageSelectedIds = selectedIds.intersection(taskIds.toSet())
    // console.log('tasksWithSelection', tasksWithSelection.id)

    const allSelected = computed(function(){
        return !!(taskIds.length() && currentPageSelectedIds.size() === taskIds.length())
    })

    // console.log('tasksWithSelection', tasksWithSelection.id)


    const toggleSelect = (id: string) => {
        if (selectedIds.data.has(id)) {
            selectedIds.delete(id)
        } else {
            selectedIds.add(id)
        }
    }

    const toggleAllInCurrentPage = () => {
        if (allSelected()) {
            selectedIds.clear()
        } else {
            taskIds.data.forEach(id => selectedIds.add(id))
        }
    }

    autorun(function() {
        console.log(allSelected())
    })


    const columnHeadStyle = {
        ...common.layout.rowCenter({gap: common.sizes.space.itemGap()}),
        cursor: 'pointer'
    }

    const columnHeadListItemStyle = {
        ...common.listItem, gap: common.sizes.space.gap()
    }

    const headTitleRef = createRef()
    const headTitlePos = atom.lazy(() => headTitleRef.current?.getBoundingClientRect())
    const headTitleVisible = atom(false)

    const headStatusRef = createRef()
    const headStatusPos = atom.lazy(() => headStatusRef.current?.getBoundingClientRect())
    const headStatusVisible = atom(false)

    const headPriorityRef = createRef()
    const headPriorityPos = atom.lazy(() => headPriorityRef.current?.getBoundingClientRect())
    const headPriorityVisible = atom(false)



    return <div style={{...common.layout.flexColumn({gap: common.sizes.space.gap(2)})}}>
        <div style={{...common.layout.rowCenter(), ...common.layout.twoSide(), marginBottom:common.sizes.space.gap()}}>
            <div style={{...common.layout.flexColumn({gap: common.sizes.space.gap()})}}>
                <div style={common.heading()}>
                    Left Title
                </div>
                <div style={common.descriptionText}>
                    Here's a list of your tasks for this month!
                </div>
            </div>

            <Avatar alt={"avatar"} src={"https://i.pravatar.cc/100"} />
        </div>
        <div style={{...common.layout.rowCenter(), ...common.layout.twoSide(), }}>
            <div>
                <div style={{...common.layout.rowCenter({gap: common.sizes.space.gap()})}}>
                    <Input placeholder={"Filter tasks"} value={titleSearch}/>
                    <Filter $option:_use={StatusFilterOption} $option={{'$toggle': {'$root:onClick': onStatusToggle}}} search={statusSearch} options={displayStatus} label={statusLabelNode}/>
                    <Button $root:style={common.textBox({colorBox:true})}>Reset</Button>
                </div>
            </div>
            <div>
                view
            </div>
        </div>

        <div style={{position: 'relative'}}>
            <div ref={tableContainerRef} style={{...common.table()}}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <Checkbox value={allSelected} $root:onClick={toggleAllInCurrentPage}/>
                        </th>
                        <th>
                            <div>ID</div>
                        </th>
                        <th>
                            <div style={columnHeadStyle} ref={headTitleRef} onClick={() => headTitleVisible(true)}>
                                <span>Title</span>
                                <Sort/>
                                <Dropdown targetPosition={headTitlePos} visible={headTitleVisible}>
                                    {() => {
                                        return <div onclick={() => headTitleVisible(false)}>
                                            <div style={columnHeadListItemStyle}
                                                 onClick={() => sort({...sort(), title: 'asc'})}>
                                                <ArrowUp/>
                                                <span>ASC</span>
                                            </div>
                                            <div style={columnHeadListItemStyle}
                                                 onClick={() => sort({...sort(), title: 'desc'})}>
                                                <ArrowDown/>
                                                <span>DESC</span>
                                            </div>
                                            <div style={common.separator(false, 0)}></div>
                                            <div style={columnHeadListItemStyle}>
                                                <PreviewCloseOne/>
                                                <span>Hide</span>
                                            </div>
                                        </div>
                                    }}
                                </Dropdown>
                            </div>
                        </th>
                        <th>
                            <div style={columnHeadStyle} ref={headStatusRef} onClick={() => headStatusVisible(true)}>
                                <span>Status</span>
                                <Sort/>
                                <Dropdown targetPosition={headStatusPos} visible={headStatusVisible}>
                                    {() => {
                                        return <div onclick={() => headStatusVisible(false)}>
                                            <div style={columnHeadListItemStyle}
                                                 onClick={() => sort({...sort(), status: 'asc'})}>
                                                <ArrowUp/>
                                                <span>ASC</span>
                                            </div>
                                            <div style={columnHeadListItemStyle}
                                                 onClick={() => sort({...sort(), status: 'desc'})}>
                                                <ArrowDown/>
                                                <span>DESC</span>
                                            </div>
                                            <div style={common.separator(false, 0)}></div>
                                            <div style={columnHeadListItemStyle}>
                                                <PreviewCloseOne/>
                                                <span>Hide</span>
                                            </div>
                                        </div>
                                    }}
                                </Dropdown>
                            </div>
                        </th>
                        <th>
                            <div style={columnHeadStyle} ref={headPriorityRef}
                                 onClick={() => headPriorityVisible(true)}>
                                <span>Priority</span>
                                <Sort/>
                                <Dropdown targetPosition={headPriorityPos} visible={headPriorityVisible}>
                                    {() => {
                                        return <div onclick={() => headPriorityVisible(false)}>
                                            <div style={columnHeadListItemStyle}
                                                 onClick={() => sort({...sort(), priority: 'asc'})}>
                                                <ArrowUp/>
                                                <span>ASC</span>
                                            </div>
                                            <div style={columnHeadListItemStyle}
                                                 onClick={() => sort({...sort(), priority: 'desc'})}>
                                                <ArrowDown/>
                                                <span>DESC</span>
                                            </div>
                                            <div style={common.separator(false, 0)}></div>
                                            <div style={columnHeadListItemStyle}>
                                                <PreviewCloseOne/>
                                                <span>Hide</span>
                                            </div>
                                        </div>
                                    }}
                                </Dropdown>
                            </div>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {tasksWithSelection.map(({task, selected}) => {
                        return <tr>
                            <td><Checkbox value={selected} $root:onClick={() => toggleSelect(task.id)}/></td>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                        </tr>
                    })}
                    </tbody>

                </table>
            </div>
            {() => tasks.asyncStatus!() ? <div style={loadingMaskStyle}><span style={common.spin(1)}><Loading/></span></div> : null}
            {/*<div style={loadingMaskStyle}><span style={common.spin(1)}><Loading/></span></div>*/}
        </div>

        <div style={{...common.layout.rowCenter(), ...common.layout.twoSide(),}}>
            <div style={{...common.layout.rowCenter({gap: common.sizes.space.itemGap()}), color: common.colors.text.normal(false,'supportive')}}>
                <span>
                    {selectedIds.size}
                </span>
                <span>
                    selected
                </span>
            </div>
            <div style={{...common.layout.rowCenter({gap: common.sizes.space.gap()})}}>
                <div style={common.layout.rowCenter({gap: common.sizes.space.itemGap()})}>
                    <span>{rowsPerPage}</span>
                    <span>rows</span>
                    <span>per</span>
                    <span>page</span>
                </div>
                <div style={common.layout.rowCenter({gap: common.sizes.space.itemGap()})}>
                    <span>page</span>
                    <span>{currentPage}</span>
                    <span>of</span>
                    <span>10</span>
                </div>
                <div style={paginationButtonsStyle}>
                    <span onClick={() => currentPage(1)}>
                        <DoubleLeft/>
                    </span>
                    <span onClick={() => currentPage(Math.max(currentPage() - 1, 1))}>
                        <Left/>
                    </span>
                    <span onClick={() => currentPage(currentPage() + 1)}>
                        <Right/>
                    </span>
                    <span>
                        <DoubleRight/>
                    </span>
                </div>
            </div>
        </div>
    </div>
}
