import classNames from 'classnames'
import React from 'react'

const EditoNavHeader = ({ side, setSide }: { side: string, setSide: React.Dispatch<React.SetStateAction<string>> }) => {

    const options = [{
        label: "الثيم",
        value: "theme"
    },
    {
        label: "المحتوى",
        value: "content"
    }]


    return (
        <div className='grid grid-cols-2 p-1 w-full bg-slate-50 rounded-xl relative'>
            {options.map((option) => (
                <button onClick={() => setSide(option.value)} className={classNames('w-full text-sm transition-all py-2.5 rounded-lg text-center font-medium', {
                    "bg-white text-blue-500": option.value === side,
                    "bg-slate-50 text-slate-500": option.value !== side
                })}>
                    {option.label}
                </button>
            ))}

        </div>
    )
}

export default EditoNavHeader