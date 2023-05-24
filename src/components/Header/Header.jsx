import icons from "../../img/sprite.svg";
import { Button } from "../Button/Button";
import css from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <svg className={css.testIcons}>
          <use href={`${icons}#icon-logo`}></use>
        </svg>
        <Button label="Users" />
        <Button label="Sign up" />
        {/* <button className="disabled">Users</button>
        <button className="disabled">Sign up</button> */}
      </div>
    </header>
  );
};
