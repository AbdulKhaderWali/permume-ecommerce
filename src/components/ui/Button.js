import Link from 'next/link';

const Button = ({ children, href, onClick, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const baseStyles = 'py-3 px-8 rounded-lg transition-colors font-semibold inline-flex items-center justify-center gap-2';

  const styles = {
    primary: 'bg-gold-500 text-black hover:bg-gold-600',
    secondary: 'bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black',
    text: 'text-red-500 hover:text-red-700'
  };

  const combinedClassName = `${baseStyles} ${styles[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName} type="button" {...props}>
      {content}
    </button>
  );
};

export default Button;
