import {Atom, atom, RectObject, RenderContext, RxDOMRect} from "axii";
import {common} from '../../common.js'
import {Popover} from 'axii-ui'
import JunkOne from 'axii-icon-park/DeleteOne.js'
import TrashOne from 'axii-icon-park/Delete.js'
import Folder from 'axii-icon-park/FolderOne.js'
import CornerUpLeft from 'axii-icon-park/CornerUpLeft.js'
import CornerUpRight from 'axii-icon-park/CornerUpRight.js'
import MoreIcon from 'axii-icon-park/MoreOne.js'
import {ContentPanel} from "./ContentPanel.js";
import {MailData} from "./Mail.js";

type DetailProps = {
    mail: Atom<null|MailData>
}

export function DetailPanel({ mail }: DetailProps, {createElement}: RenderContext) {
    const containerStyle = {
        height: '100%',
        width: '100%',
        ...common.layout.middleGrow(true),
        '&>*': {
            borderBottom: `1px solid ${common.colors.line.border.normal()}`,
            '&:last-child': {
                borderRight: 'none'
            }
        }
    }

    const headerStyle = {
        ...common.boxPaddingContainer,
        ...common.layout.twoSide(),
        ...common.layout.row(),
        flexGrow: 0,
    }

    const operationContainerStyle = {
        ...common.layout.row(),
        '& > *' : {
            ...common.iconBox,
            ...common.interactableItem
        }
    }

    const rxMoreIconPosition = new RxDOMRect(atom<RectObject>(null), {type: 'interval', duration: 100})
    const popoverVisible = atom(false)
    const popoverAlign = atom({
        right: 'right',
        top: 'bottom',
    })

    const popoverContainerStyle = {
        ...common.boxPaddingContainer,
        ...common.layout.flexColumnStretched({gap: common.sizes.space.itemGap()}),
        flexBasis: 200,
        '& > *': {
            ...common.textPaddingContainer,
            ...common.layout.twoSide(),
            ...common.interactableItem
        }
    }


    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div style={operationContainerStyle}>
                    <Folder size={14}/>
                    <JunkOne size={14}/>
                    <TrashOne size={14}/>
                </div>
                <div style={{...common.layout.row()}}>
                    <div style={operationContainerStyle}>
                        <CornerUpLeft size={14}/>
                        <CornerUpRight size={14}/>
                    </div>
                    <div>
                        <span style={{...common.separator(true)}}/>
                    </div>
                    <div style={operationContainerStyle}>
                        <span onClick={() => popoverVisible(true)} ref={rxMoreIconPosition.ref}>
                            <MoreIcon size={14}/>
                        </span>
                        <Popover targetPosition={rxMoreIconPosition.value} visible={popoverVisible} align={popoverAlign}>
                            {() => (<div style={popoverContainerStyle}>
                                <div>Mark as unread</div>
                                <div>Star thread</div>
                                <div>Add label</div>
                            </div>)}
                        </Popover>
                    </div>
                </div>
            </div>
            <ContentPanel mail={mail}/>
        </div>
    )
}
