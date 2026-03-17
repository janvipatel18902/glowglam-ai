import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
    children: React.ReactNode;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    className?: string;
    onClick?: () => void;
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 text-white shadow-[0_10px_30px_rgba(168,85,247,0.22)] hover:opacity-95',
    secondary:
        'bg-white text-slate-700 border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-white/60',
};

export function Button({
    children,
    href,
    type = 'button',
    variant = 'primary',
    className = '',
    onClick,
}: ButtonProps) {
    const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick}>
            {children}
        </button>
    );
}