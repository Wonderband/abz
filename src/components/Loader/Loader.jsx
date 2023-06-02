import { ColorRing } from "react-loader-spinner";
import css from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={css.loader}>
      <ColorRing
        width="48"
        colors={["#00BDD3", "#00BDD3", "#00BDD3", "#00BDD3", "#00BDD3"]}
      />
    </div>
  );
};
