import css from "./App.module.scss";

import icons from "./img/sprite.svg";

function App() {
  return (
    <div>
      <header>yuoo-hoo</header>
      <button className="disabled">Normal</button>
      <svg className={css.testIcons}>
        <use href={`${icons}#icon-photo-cover`}></use>
      </svg>
      <svg className={css.testIcons}>
        <use href={`${icons}#icon-success-image`}></use>
      </svg>
      <svg className={css.testIcons}>
        <use href={`${icons}#icon-logo`}></use>
      </svg>
    </div>
  );
}

export default App;
