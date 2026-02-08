import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label className="block text-xs font-medium text-slate-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pl-10 text-sm text-slate-900",
              "hover:border-slate-300 hover:bg-slate-50",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              "transition-all duration-200",
              "shadow-sm",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
