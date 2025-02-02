interface ConfigInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const ConfigInput: React.FC<ConfigInputProps> = ({ label, name, value, onChange, type = "text", ...props }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                {...props}
            />
        </label>
    </div>
);