export function Box({ children }) {
    return (
        <div className={`
            flex flex-col items-center justify-center
            bg-white text-gray-800 w-full px-4 py-6 rounded-4xl
        `}>
            {children}
        </div>
    )
}