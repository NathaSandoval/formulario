import { IconPencilCode, IconTrash } from "@tabler/icons-react"


const UserCard = ({user, deleteUser, handleClickEdit, }) => {
 
  return (
    <li>
      <li>
             <h5>{user.first_name} {user.last_name}</h5>
             <ul>
              <li>Email: {user.email}</li>
              <li>Birthday: {user.birthday_date}</li>
              <li>Password: {user.password}</li>
             </ul>
          </li>
          <div>
            <button onClick={() => handleClickEdit(user)}>
              <IconPencilCode size={18}/>
            </button>
            <button onClick={() => deleteUser(user.id)}>
              <IconTrash size={18}/>
            </button>
            
          </div>
    </li>

  );
};
export default UserCard