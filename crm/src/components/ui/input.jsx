import * as React from "react"

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${className}`}
    ref={ref}
    {...props}
  />
))

Input.displayName = "Input"

export { Input }