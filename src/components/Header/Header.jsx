import { useDispatch } from "react-redux";
import icons from "../../img/sprite.svg";
import { setFormSent } from "../../redux/globalSlice";
import { Button } from "../Button/Button";
import css from "./Header.module.scss";

export const Header = ({ onReset }) => {
  const dispatch = useDispatch();
  const resetUserForm = () => {
    dispatch(setFormSent(false));
    onReset();
  };

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
              <Button label="Sign up" clickHandler={resetUserForm} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
