import { useSelector } from "react-redux";
import { selectGlobal } from "../../redux/selectors";
import { UserForm } from "../UserForm/UserForm";
import icons from "../../img/sprite.svg";
import css from "./AddUser.module.scss";
import React from "react";

export const AddUser = React.forwardRef((_, ref) => {
  const { formSent } = useSelector(selectGlobal);
  return (
    <section id="Sign up" ref={ref}>
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
});
