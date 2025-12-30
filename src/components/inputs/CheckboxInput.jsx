export function CheckboxInput({
    title,
    value,
    setValue,
    disabled,
}) {
    return (
        <label
            className={`
                flex items-center gap-3
                text-darktext cursor-pointer
                select-none
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            `}
        >
            <span className='text-lg'>
                {title}
            </span>
            <input type='checkbox'
                checked={!!value}
                onChange={e => setValue(e.target.checked)}
                disabled={disabled}
                className={`
                    w-5 h-5
                    accent-[#1e95b3]
                    border border-gray-400
                    rounded-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-[#1e95b3]
                `}
            />
        </label>
    );
}