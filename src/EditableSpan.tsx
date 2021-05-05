import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo ((props: EditableSpanPropsType) => {
    console.log("EditableSpan called")
    const [editMode, setEditMode] = useState(false)// флаг
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.changeTitle(title)
        }
    }
    return (
        editMode
            ? <TextField
                value={title}
                autoFocus
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnter}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

})