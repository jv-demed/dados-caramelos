export function SelectInput({
    title,
    value,
    setValue,
    options = [],
    placeholder = 'Selecione...',
    disabled,
    width = '100%',
    isVisible = true
}) {
    return (
        <div style={{ display: !isVisible && 'none' }}  
            className={`
                flex flex-col gap-0.5
                w-full text-text
            `}
        >
            {title && <span className='text-darktext'>
                {title}:
            </span>}
            <select
                name={title || 'select-label'}
                value={value ?? ''}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
                style={{ width }}
                className={`
                    appearance-none
                    h-12 px-6 text-xl text-darktext
                    border border-gray-400 rounded-full
                    bg-white hover:border-primary
                    focus:outline-none focus:ring-2
                    focus:ring-primary focus:border-primary
                `}
            >
                <option value='' disabled>
                    {placeholder}
                </option>
                {options.map(option => {
                    const value =
                        typeof option === 'string'
                            ? option
                            : option.value;
                    const label =
                        typeof option === 'string'
                            ? option
                            : option.label;
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}