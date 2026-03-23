type InputProps = {
    label: string;
    type?: string;
    name?: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
};

export function Input({
    label,
    type = 'text',
    name,
    placeholder,
    helperText,
    required = false,
}: InputProps) {
    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-2xl border border-[#ddd3e8] bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
            />

            {helperText ? (
                <p className="mt-2 text-xs text-slate-500">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
}