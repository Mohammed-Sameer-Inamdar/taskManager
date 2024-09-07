export const LockIcon = ({ width, height, tintColor }) => (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke={tintColor || "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
export const Spinner = ({ width, height, tintColor }) => (
    <svg width={width || "24"} height={height || "24"} fill={tintColor || "#038cfc"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
            <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
        </path>
    </svg>
)

export const SignUpIcon = ({ width, height, tintColor }) => (
    <svg fill={tintColor || "#333"} width={width || "24"} height={height || "24"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9H4V8h14zm-5 3H4v1h9zm8-8v9h-1V5H2v13h9v1H1V4zm2.07 11.637l-.707-.707-5.863 5.863-2.863-2.863-.707.707 3.57 3.57z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
)

export const TrashIcon = ({ width, height, tintColor }) => (
    <svg width={width || '24'} height={height || '24'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke={tintColor || "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const DragIcon = ({ width, height, tintColor }) => (
    <svg fill={tintColor || "#000000"} width={width || "24"} height={height || "24"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.375 3.67c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .646.56 1.17 1.25 1.17s1.25-.524 1.25-1.17zm0 8.66c0-.646-.56-1.17-1.25-1.17s-1.25.524-1.25 1.17c0 .645.56 1.17 1.25 1.17s1.25-.525 1.25-1.17zm-1.25-5.5c.69 0 1.25.525 1.25 1.17 0 .645-.56 1.17-1.25 1.17S4.875 8.645 4.875 8c0-.645.56-1.17 1.25-1.17zm5-3.16c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .646.56 1.17 1.25 1.17s1.25-.524 1.25-1.17zm-1.25 7.49c.69 0 1.25.524 1.25 1.17 0 .645-.56 1.17-1.25 1.17s-1.25-.525-1.25-1.17c0-.646.56-1.17 1.25-1.17zM11.125 8c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .645.56 1.17 1.25 1.17s1.25-.525 1.25-1.17z" />
    </svg>
)

export const ErrorIcon = ({ width, height, tintColor }) => {

    return (
        <svg fill={tintColor || "var(--color-danger)"} height={height || "24"} width={width || "24"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <g>
                <g>
                    <path d="M256,34.297L0,477.703h512L256,34.297z M256,422.05c-9.22,0-16.696-7.475-16.696-16.696s7.475-16.696,16.696-16.696
			c9.22,0,16.696,7.475,16.696,16.696S265.22,422.05,256,422.05z M239.304,344.137V177.181h33.391v166.956H239.304z"/>
                </g>
            </g>
        </svg>
    );
}

export const CheckIcon = ({ width, height, tintColor }) => (
    <svg fill={tintColor || "var(--color-success)"} width={width || "24"} height={height || "24"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="21 5 12 14 8 10" fill="none" stroke={tintColor || "var(--color-success)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" >
        </polyline>
        <path d="M21,11v9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H16" fill="none" stroke={tintColor || "var(--color-success)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" ></path>
    </svg>
)

export const DropdownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
)

export const UserIcon = ({ width, height, tintColor }) => (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 19 3.29 20.93 5.56 21.66C6.22 21.89 6.98 22 7.81 22H16.19C17.02 22 17.78 21.89 18.44 21.66C20.71 20.93 22 19 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.5 16.19C20.5 18.33 19.66 19.68 17.97 20.24C17 18.33 14.7 16.97 12 16.97C9.3 16.97 7.01 18.32 6.03 20.24H6.02C4.35 19.7 3.5 18.34 3.5 16.2V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V16.19Z" fill={tintColor || "#292D32"} />
        <path d="M12.0019 8C10.0219 8 8.42188 9.6 8.42188 11.58C8.42188 13.56 10.0219 15.17 12.0019 15.17C13.9819 15.17 15.5819 13.56 15.5819 11.58C15.5819 9.6 13.9819 8 12.0019 8Z" fill={tintColor || "#292D32"} />
    </svg>
)