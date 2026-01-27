import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "gradient-bg text-white shadow-[0_4px_14px_0_rgba(219,39,119,0.39)] hover:shadow-[0_6px_20px_rgba(219,39,119,0.23)] hover:-translate-y-1",
    outline: "border-2 border-white/20 text-white hover:border-orange-500 hover:text-orange-500",
    ghost: "text-white/70 hover:text-white hover:bg-white/10"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;