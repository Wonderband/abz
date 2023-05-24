export const Button = ({ label, clickHandler }) => {
  return <button onClick={clickHandler}>{label}</button>;
};
