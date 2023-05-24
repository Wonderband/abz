import css from "./App.module.scss";
import { AddUser } from "./components/AddUser/AddUser";
import { GetUsers } from "./components/GetUsers/GetUsers";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

import icons from "./img/sprite.svg";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <GetUsers />
      <AddUser />

      <svg className={css.testIcons}>
        <use href={`${icons}#icon-photo-cover`}></use>
      </svg>
      <svg className={css.testIcons}>
        <use href={`${icons}#icon-success-image`}></use>
      </svg>
    </div>
  );
}

export default App;
