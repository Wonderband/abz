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
import css from "./CardList.module.scss";

export const CardsList = () => {
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 6;
  const { users, currentPage, formSent } = useSelector(selectGlobal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPending(true));
    dispatch(setError(false));
    const params = { page: currentPage, count: PER_PAGE };
    getUsersFromAPI(params)
      .then((res) => {
        if (currentPage === 1) {
          setTotalPages(res.data.total_pages);
          dispatch(setUsers(res.data.users));
        } else dispatch(setUsers([...users, ...res.data.users]));
      })
      .catch((err) => {
        const response = err.response.data.message;
        if (response === "Validation failed")
          dispatch(
            setError(
              `Validation failed: ${Object.values(err.response.data.fails)}`
            )
          );
        else dispatch(setError(err.message));
      })
      .finally(() => dispatch(setPending(false)));
  }, [currentPage, dispatch, formSent]);

  const loadMoreUsers = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <>
      <ul className={css.usersList}>
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id} className={css.listItem}>
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
