import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
    children: React.ReactNode;
}

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children: React.ReactNode;
    className?: string;
    selected?: boolean;
}

interface SelectValueProps {
    placeholder?: string;
    children?: React.ReactNode;
}

type SelectComponent = React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>> & {
    Trigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
    Value: React.ForwardRefExoticComponent<SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
};

const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
    ({ children, className = "", ...props }, ref) => (
        <div
            ref={ref}
            className={`flex items-center justify-between p-2 border rounded-md bg-white cursor-pointer hover:bg-gray-50 ${className}`}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
    )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
    ({ children, className = "", value, onValueChange, ...props }, ref) => (
        <div
            ref={ref}
            className={`absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 ${className}`}
            {...props}
        >
            {React.Children.map(children, child => {
                if (!React.isValidElement(child)) return null;

                return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
                    selected: child.props.value === value,
                    onClick: () => onValueChange?.(child.props.value),
                });
            })}
        </div>
    )
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value, children, className = "", selected, ...props }, ref) => (
        <div
            ref={ref}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${selected ? 'bg-gray-50' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
);
SelectItem.displayName = "SelectItem";

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
    ({ placeholder, children }, ref) => (
        <span ref={ref} className="block truncate">
            {children || placeholder}
        </span>
    )
);
SelectValue.displayName = "SelectValue";

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    ({ value, onValueChange, className = "", children }, _) => {
        const [open, setOpen] = React.useState(false);
        const selectRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                    setOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div ref={selectRef} className={`relative ${className}`}>
                {React.Children.map(children, child => {
                    if (!React.isValidElement(child)) return null;

                    if (child.type === SelectTrigger) {
                        return React.cloneElement(child as React.ReactElement<SelectTriggerProps>, {
                            onClick: () => setOpen(!open),
                        });
                    }

                    if (child.type === SelectContent) {
                        return open && React.cloneElement(child, {
                            value,
                            onValueChange: (newValue: string) => {
                                onValueChange(newValue);
                                setOpen(false);
                            },
                        } as SelectContentProps);
                    }

                    return child;
                })}
            </div>
        );
    }
) as SelectComponent;

Select.displayName = "Select";
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Value = SelectValue;

export { Select };