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
            <label className="mb-2 block text-sm font-medium text-slate-200">
                {label}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-pink-400/40 focus:bg-white/8"
            />

            {helperText ? (
                <p className="mt-2 text-xs text-slate-400">{helperText}</p>
            ) : null}
        </div>
    );
}