import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(( props: AddItemFormPropsType) => {
    console.log("AddItemForm clicked")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    };

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim() // обрезает пробелы с начала и с конца строки
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }
    return (
        <div>

            <TextField
                variant={"outlined"}
                label={"Title"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}

            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    className={ error ? "error" : ""}*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*/>*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>

            {/*{error && <div className={"error-message"}>Title is required!</div>}*/}
        </div>
    )
})