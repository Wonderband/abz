import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setError,
  setPending,
  setUsers,
} from "../../redux/globalSlice";
import { getUsersFromAPI } from "../../api/operations";
import { selectGlobal } from "../../redux/selectors";
import { Button } from "../Button/Button";
import { UserCard } from "../UserCard/UserCard";

export const CardsList = () => {
  // const [users, setUsers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pending, setPending] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 6;
  const { users, currentPage } = useSelector(selectGlobal);
  const dispatch = useDispatch();

  useEffect(() => {
    setPending(true);
    const params = { page: currentPage, count: PER_PAGE };
    getUsersFromAPI(params)
      .then((res) => {
        if (currentPage === 1) {
          setTotalPages(res.data.total_pages);
          dispatch(setUsers(res.data.users));
        } else dispatch(setUsers([...users, ...res.data.users]));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(setError(err.message));
      })
      .finally(() => setPending(false));
  }, [currentPage, dispatch]);

  const loadMoreUsers = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <>
      {/* {pending && <>Loadind data...</>} */}
      <ul>
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
      {currentPage < totalPages && (
        <Button label="Show more" clickHandler={loadMoreUsers} isWide={true} />
      )}
    </>
  );
};
