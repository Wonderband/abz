import { useRef } from "react";
import { AddUser } from "./components/AddUser/AddUser";
import { GetUsers } from "./components/GetUsers/GetUsers";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import css from "./App.module.scss";
import { useSelector } from "react-redux";
import { selectGlobal } from "./redux/selectors";

function App() {
  const addUserRef = useRef(null);
  const { pending } = useSelector(selectGlobal);
  const scrollToAddUser = () => {
    addUserRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Header onReset={scrollToAddUser} />
      <Hero />
      <GetUsers />
      {pending && <div className={css.loader}>Loading data...</div>}
      <AddUser ref={addUserRef} />
    </div>
  );
}

export default App;
