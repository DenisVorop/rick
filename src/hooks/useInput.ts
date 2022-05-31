import React from "react";

export default function useInput(initialValue: string) {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)

    const reset = () => setValue('')

    const bind = { value, onChange }

    return { value, reset, bind }
}
