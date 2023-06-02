import React from "react";
import { CardsList } from "../CardsList/CardsList";
import css from "./GetUsers.module.scss";

export const GetUsers = React.forwardRef((_, ref) => {
  return (
    <section id="Users" className={css.getUsers} ref={ref}>
      <div className="container">
        <h2 className={css.title}>Working with GET request</h2>
        <CardsList />
      </div>
    </section>
  );
});
