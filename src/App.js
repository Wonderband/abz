import { useRef } from "react";
import { AddUser } from "./components/AddUser/AddUser";
import { GetUsers } from "./components/GetUsers/GetUsers";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

function App() {
  const addUserRef = useRef(null);
  const scrollToAddUser = () => {
    addUserRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Header onReset={scrollToAddUser} />
      <Hero />
      <GetUsers />
      <AddUser ref={addUserRef} />
    </div>
  );
}

export default App;
