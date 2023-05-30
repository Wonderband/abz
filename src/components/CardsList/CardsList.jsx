import { useEffect, useState } from "react";
import { getUsersFromAPI } from "../../api/operations";
import { Button } from "../Button/Button";
import { UserCard } from "../UserCard/UserCard";

export const CardsList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pending, setPending] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    setPending(true);
    const params = { page: currentPage, count: PER_PAGE };
    getUsersFromAPI(params)
      .then((res) => {
        setUsers((users) => {
          return [...users, ...res.data.users];
        });
        if (currentPage === 1) setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setPending(false));
  }, [currentPage]);

  const loadMoreUsers = () => {
    console.log(currentPage);
    setCurrentPage((page) => page + 1);
  };

  return (
    <>
      {pending && <>Loadind data...</>}
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
