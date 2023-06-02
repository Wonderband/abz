import css from "./Button.module.scss";

export const Button = ({ label, clickHandler, type, isWide, disabled }) => {
  const buttonClasses = isWide
    ? `${css.allButtons} ${css.wideButton}`
    : css.allButtons;
  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled}
      onClick={clickHandler}
    >
      {label}
    </button>
  );
};
