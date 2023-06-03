import { useEffect, useRef } from "react";
import { AddUser } from "./components/AddUser/AddUser";
import { GetUsers } from "./components/GetUsers/GetUsers";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

import { useSelector } from "react-redux";
import { selectGlobal } from "./redux/selectors";
import { Loader } from "./components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const addUserRef = useRef(null);
  const getUsersRef = useRef(null);
  const { pending, error } = useSelector(selectGlobal);
  const scrollToAddUser = () => {
    addUserRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToGetUsers = () => {
    getUsersRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div>
      {pending && <Loader />}
      <Header onResetForm={scrollToAddUser} onResetUsers={scrollToGetUsers} />
      <Hero onResetForm={scrollToAddUser} />
      <GetUsers ref={getUsersRef} />
      <AddUser ref={addUserRef} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
