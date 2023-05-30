import css from "./Button.module.scss";

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log("submitted form!");
// };

export const Button = ({ label, clickHandler, type, isWide, disabled }) => {
  const buttonClasses = isWide
    ? `${css.allButtons} ${css.wideButton}`
    : css.allButtons;

  if (clickHandler === undefined)
    return (
      <a href={`#${label}`} className={buttonClasses}>
        {label}
      </a>
    );
  else
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
