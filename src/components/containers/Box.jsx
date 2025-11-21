export function Box({ 
    children, 
    width = '100%'
}){
    return (
        <div 
            style={{ width }}
            className={`
                flex flex-col items-center justify-center
                bg-white text-gray-800 px-4 py-6 rounded-4xl
            `}
        >
            {children}
        </div>
    )
}