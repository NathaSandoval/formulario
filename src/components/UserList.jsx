import UserCard from "./UserCard";

const UserList = ({users, deleteUser, handleClickEdit,  }) => {
 console.log(users);
  return (
    <ul>
      {users.map((user) => (
          <UserCard
           key={user.id} 
           user={user} 
           deleteUser={deleteUser} 
           handleClickEdit={handleClickEdit}/>
        ))
      }
    </ul>
  )
}
export default UserList;