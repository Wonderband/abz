import { useRef } from "react";
import { AddUser } from "./components/AddUser/AddUser";
import { GetUsers } from "./components/GetUsers/GetUsers";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

import { useSelector } from "react-redux";
import { selectGlobal } from "./redux/selectors";
import { Loader } from "./components/Loader/Loader";

function App() {
  const addUserRef = useRef(null);
  const getUsersRef = useRef(null);
  const { pending } = useSelector(selectGlobal);
  const scrollToAddUser = () => {
    addUserRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToGetUsers = () => {
    getUsersRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {pending && <Loader />}
      <Header onResetForm={scrollToAddUser} onResetUsers={scrollToGetUsers} />
      <Hero onResetForm={scrollToAddUser} />
      <GetUsers ref={getUsersRef} />
      <AddUser ref={addUserRef} />
    </div>
  );
}

export default App;
