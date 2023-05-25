import icons from "../../img/sprite.svg";
import { Button } from "../Button/Button";
import css from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={`${css.headerContainer} container`}>
        <svg
          className={css.logo}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
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
      </div>
    </header>
  );
};
