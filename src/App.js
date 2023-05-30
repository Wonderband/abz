import css from "./App.module.scss";
import { AddUser } from "./components/AddUser/AddUser";
import { GetUsers } from "./components/GetUsers/GetUsers";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <GetUsers />
      <AddUser />
    </div>
  );
}

export default App;
