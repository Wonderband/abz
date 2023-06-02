import { useDispatch } from "react-redux";
import icons from "../../img/sprite.svg";
import { setCurrentPage, setFormSent } from "../../redux/globalSlice";
import { Button } from "../Button/Button";
import css from "./Header.module.scss";

export const Header = ({ onResetForm, onResetUsers }) => {
  const dispatch = useDispatch();

  const resetUsers = () => {
    onResetUsers();
    // dispatch(setCurrentPage(1)); we can reset users here if needed
  };

  const resetUserForm = () => {
    dispatch(setFormSent(false));
    onResetForm();
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
              <Button label="Users" clickHandler={resetUsers} />
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
