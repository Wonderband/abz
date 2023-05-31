import css from "./UserCard.module.scss";
export const UserCard = ({ user }) => {
  return (
    <div className={css.userCard}>
      <img
        src={user.photo}
        alt="portrait of a user"
        className={css.userPhoto}
      />
      <p className={css.userName}>{user.name}</p>
      <div className={css.userInfo}>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.registration_timestamp}</p>
      </div>
    </div>
  );
};
