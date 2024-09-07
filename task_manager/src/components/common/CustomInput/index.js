import React from "react";
import './customInput.css'

const LabelInput = ({ label,labelClass, type, ...inputProps }) => {
    switch (type) {
        case 'textarea':
            return (
                <div>
                    <label htmlFor={inputProps?.id} className={labelClass} >{label}</label>
                    <textarea {...inputProps}></textarea>
                </div>
            )
        case 'checkbox':
            return (
                <div className="flex flex-row items-center">
                    <input  type="checkbox"  {...inputProps} className="w-5 h-5 border-0 hover:text-primary" />
                    <label htmlFor={inputProps?.id} className={labelClass} >{label}</label>
                </div>
            )

        default:
            return (
                <div>
                    <label htmlFor={inputProps?.id} className={labelClass} >{label}</label>
                    <input type={type}   {...inputProps} />
                </div>
            )
    }
}
const CustomInput = ({ label = "Title", labelClass, errorMessage, type, ...inputProps }) => {

    return (
        <div className="custom-input">
            <LabelInput label={label} labelClass={labelClass} type={type} {...inputProps} />
            <div className="error-message" >{errorMessage}</div>
        </div>

    )
}

export default CustomInput;