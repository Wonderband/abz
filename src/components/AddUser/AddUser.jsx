import { useSelector } from "react-redux";
import { selectGlobal } from "../../redux/selectors";
import { UserForm } from "../UserForm/UserForm";
import icons from "../../img/sprite.svg";
import css from "./AddUser.module.scss";

export const AddUser = () => {
  const { formSent } = useSelector(selectGlobal);
  return (
    <section id="Sign up">
      <div className="container">
        {!formSent && (
          <>
            <h2>Working with POST request</h2>
            <UserForm />
          </>
        )}
        {formSent && (
          <div>
            <svg className={css.testIcons}>
              <use href={`${icons}#icon-success-image`}></use>
            </svg>
            <svg className={css.testIcons}>
              <use href={`${icons}#icon-photo-cover`}></use>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};
