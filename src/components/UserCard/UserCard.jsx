export const UserCard = ({ user }) => {
  return (
    <div>
      <img src={user.photo} alt="portrait of a user" />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.registration_timestamp}</p>
    </div>
  );
};
