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
        'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/20',
    secondary:
        'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    ghost: 'bg-transparent text-white hover:bg-white/10',
};

export function Button({
    children,
    href,
    type = 'button',
    variant = 'primary',
    className = '',
    onClick,
}: ButtonProps) {
    const classes = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${variantClasses[variant]} ${className}`;

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