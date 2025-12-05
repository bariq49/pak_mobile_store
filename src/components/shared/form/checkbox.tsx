"use client"

import * as React from "react"
import { Check } from "lucide-react"
import cn from "classnames";
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, checked, onCheckedChange, label, ...props }, ref) => {
        const [isChecked, setIsChecked] = React.useState(checked || false)
        
        React.useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked)
            }
        }, [checked])
        
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = event.target.checked
            setIsChecked(newChecked)
            onCheckedChange?.(newChecked)
            props.onChange?.(event)
        }
        const { selectedColor } = usePanel();
        return (
            <div className="flex items-center space-x-2">
                <div className="relative">
                    <input type="checkbox" ref={ref} checked={isChecked} onChange={handleChange} className="sr-only" {...props} />
                    <div
                        className={cn(
                            "h-4 w-4 rounded-sm border border-gray-300 flex items-center justify-center",
                            isChecked ? `${colorMap[selectedColor].bg} ${colorMap[selectedColor].border}` : "bg-white",
                            "transition-colors duration-200",
                            className,
                        )}
                        onClick={() => {
                            const newChecked = !isChecked
                            setIsChecked(newChecked)
                            onCheckedChange?.(newChecked)
                        }}
                    >
                        {isChecked && <Check className="h-3 w-3 text-white" />}
                    </div>
                </div>
                {label && <label className="text-sm leading-none cursor-pointer">{label}</label>}
            </div>
        )
    },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }

