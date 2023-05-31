import { CardsList } from "../CardsList/CardsList";
import css from "./GetUsers.module.scss";

export const GetUsers = () => {
  return (
    <section id="Users" className={css.getUsers}>
      <div className="container">
        <h2 className={css.title}>Working with GET request</h2>
        <CardsList />
      </div>
    </section>
  );
};
