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
            {title && <span className='text-darktext'>
                {title}:
            </span>}
            <input name={title || 'input-label'}
                type={type || 'text'}
                value={value}
                placeholder={placeholder || '...'}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
                style={{ width }}
                className={`
                    h-12 px-6 text-xl
                    border border-border rounded-full   
                    hover:border-primary
                    focus:outline-none focus:ring-2
                    focus:ring-primary focus:border-primary
                `}
            />
        </div>
    )
};