import { useEffect, useRef, useState } from "react";
import css from "./UserCard.module.scss";

export const UserCard = ({ user }) => {
  const refName = useRef(null);
  const refEmail = useRef(null);
  const [isEmailOverflown, setIsEmailOverflown] = useState(false);
  const [isNameOverflown, setIsNameOverflown] = useState(false);

  const isOverflown = (ref) => {
    const element = ref.current;
    return element.scrollWidth > element.clientWidth;
  };

  useEffect(() => {
    setIsEmailOverflown(isOverflown(refEmail));
    setIsNameOverflown(isOverflown(refName));
  }, []);
  return (
    <div className={css.userCard}>
      <img
        src={user.photo}
        alt="portrait of a user"
        className={css.userPhoto}
      />
      <div className={css.toolTipContainer}>
        <p
          className={`${css.userName} ${isNameOverflown ? css.pointer : ""}`}
          ref={refName}
        >
          {user.name}
        </p>
        <div className={css.toolTip}>{user.name}</div>
      </div>

      <div className={css.userInfo}>
        <div className={css.toolTipContainer}>
          <p
            className={`${css.userEmail} ${
              isEmailOverflown ? css.pointer : ""
            }`}
            ref={refEmail}
          >
            {user.email}
          </p>
          <div className={css.toolTip}>{user.email}</div>
        </div>

        <p>{user.phone}</p>
        <p>{user.registration_timestamp}</p>
      </div>
    </div>
  );
};
