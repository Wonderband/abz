import { useSelector } from "react-redux";
import { selectGlobal } from "../../redux/selectors";
import { UserForm } from "../UserForm/UserForm";
import icons from "../../img/sprite.svg";
import css from "./AddUser.module.scss";
import React from "react";

export const AddUser = React.forwardRef((_, ref) => {
  const { formSent } = useSelector(selectGlobal);
  return (
    <section id="Sign up" ref={ref} className={css.addUserSection}>
      <div className="container">
        {!formSent && (
          <>
            <h2 className={css.title}>Working with POST request</h2>
            <UserForm />
          </>
        )}
        {formSent && (
          <div>
            <h2 className={css.title}>User successfully registered</h2>

            <svg className={css.successIcon}>
              <use
                href={`${icons}#icon-success-image`}
                className={css.icon}
              ></use>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
});
