import React from 'react'

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "btn text-[20px] font-poppins rounded-[40px] py-5 px-8 font-bold outline-2 outline-(--pet-secondary)";

  const buttonClasses = `${baseStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button