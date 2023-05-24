export const Button = ({ label, clickHandler }) => {
  return (
    <a href={`#${label}`} onClick={clickHandler}>
      {label}
    </a>
  );
};
