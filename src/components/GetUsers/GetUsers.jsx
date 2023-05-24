import { CardsList } from "../CardsList/CardsList";

export const GetUsers = () => {
  return (
    <section id="Users">
      <div className="container">
        <h2>Working with GET request</h2>
        <CardsList />
      </div>
    </section>
  );
};
