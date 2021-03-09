import React, {useState, KeyboardEvent, ChangeEvent} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm( props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    };

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
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
            <input
                value={title}
                className={ error ? "error" : ""}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            <button
                onClick={addItem}
            >ADD
            </button>
            {error && <div className={"error-message"}>Title is required!</div>}
        </div>
    )
}