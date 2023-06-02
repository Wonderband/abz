import { useDispatch } from "react-redux";
import { setFormSent } from "../../redux/globalSlice";
import { Button } from "../Button/Button";
import css from "./Hero.module.scss";

export const Hero = ({ onResetForm }) => {
  const dispatch = useDispatch();
  const resetUserForm = () => {
    dispatch(setFormSent(false));
    onResetForm();
  };
  return (
    <section className={css.heroSection}>
      <h1 className={css.title}>Test assignment for front-end developer</h1>
      <p className={css.descripton}>
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <Button label="Sign up" clickHandler={resetUserForm} />
    </section>
  );
};
