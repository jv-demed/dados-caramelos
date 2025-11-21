export function TextInput({ 
    title, 
    type, 
    value, 
    setValue,
    placeholder,
    disabled,
    width = '100%'
}){
    return(
        <div className={`
            flex flex-col gap-0.5
            w-full text-text
        `}>
            {title && <span>{title}:</span>}
            <input name={title || 'input-label'}
                type={type || 'text'}
                value={value}
                placeholder={placeholder || '...'}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
                style={{ width }}
                className={`
                    h-12 px-6 text-xl
                    border border-gray-500 rounded-full   
                    hover:border-[#1e95b3]
                    focus:outline-none focus:ring-2
                    focus:ring-[#1e95b3] focus:border-[#1e95b3]
                `}
            />
        </div>
    )
};