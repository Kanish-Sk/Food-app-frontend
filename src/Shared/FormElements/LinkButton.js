const LinkButton = ({ onClick, className, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-blue-400 text-sm ${className}`}
    >
      {children}
    </button>
  );
};

export default LinkButton;
