
const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 text-[20px] font-poppins rounded-[40px] py-4 px-8 font-bold bg-(--pet-accent) text-(--pet-secondary) outline outline-2 outline-(--pet-secondary) transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-(--pet-secondary) hover:text-(--pet-primary) disabled:cursor-not-allowed disabled:opacity-60";

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
