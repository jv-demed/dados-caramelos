export function Box({ 
    children, 
    width = '100%'
}){
    return (
        <div 
            style={{ width }}
            className={`
                flex flex-col items-center justify-center
                bg-white text-gray-800 p-4 rounded-4xl
            `}
        >
            {children}
        </div>
    )
}