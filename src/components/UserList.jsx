const UserList = ({users}) => {
 console.log(users);
  return (
    <ul>
      {users.map((user) => (
          <li key={user.id}>
             <h5>{user.first_name}</h5>
             <ul>
              <li>Email {user.email}</li>
              <li>Birthday {user.birthday}</li>
             </ul>
          </li>
        ))
      }
    </ul>
  )
}
export default UserList;