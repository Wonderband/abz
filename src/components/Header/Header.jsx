import icons from "../../img/sprite.svg";
import { Button } from "../Button/Button";
import css from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={`${css.headerContainer} container`}>
        <svg className={css.logo}>
          <use href={`${icons}#icon-logo`}></use>
        </svg>
        <nav>
          <ul className={css.navList}>
            <li>
              <Button label="Users" />
            </li>
            <li>
              <Button label="Sign up" />
            </li>
          </ul>
        </nav>

        {/* <button className="disabled">Users</button>
        <button className="disabled">Sign up</button> */}
      </div>
    </header>
  );
};
