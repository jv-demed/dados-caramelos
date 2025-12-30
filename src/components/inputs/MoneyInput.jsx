const formatBRL = (value) => {
    if(value === null || value === undefined) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
};

const parseBRL = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    return Number(onlyNumbers) / 100;
};

export function MoneyInput({
    title,
    value,
    setValue,
    placeholder = 'R$ 0,00',
    disabled,
    width = '100%',
}) {
    return (
        <div className={`
            flex flex-col gap-0.5
            w-full text-text
        `}>
            {title && <span className='text-darktext'>
                {title}:
            </span>}
            <input
                type="text"
                inputMode="numeric"
                value={formatBRL(value)}
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => setValue(parseBRL(e.target.value))}
                style={{ width }}
                className={`
                    h-12 px-6 text-xl text-darktext text-right
                    border border-gray-400 rounded-full
                    hover:border-[#1e95b3]
                    focus:outline-none focus:ring-2
                    focus:ring-[#1e95b3] focus:border-[#1e95b3]
                `}
            />
        </div>
    );
}
