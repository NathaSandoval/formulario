import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from "axios"
import { BASE_URL } from "./constants/users"
import UserList from "./components/UserList"

function App() {
  const [users, setUsers] = useState([]);
  const [idUserToEdit, setIdUserToEdit] = useState(null)

  const formRef = useRef(null)
 
  const createUser = (data, form) => {
    axios
    .post(BASE_URL + "/users/", data)
    .then(() => {
      getAllUsers()
    form.reset()
  })
    .catch((err) => console.log(err));
};
  
  const getAllUsers = () => {
    axios
    .get(BASE_URL + "/users/")
    .then(({ data }) => setUsers(data))
    .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    axios
    .delete(BASE_URL + `/users/${id}/`)
    .then(() => getAllUsers())
    .catch((err) => console.log(err));
  }

  const updateUser = (data) => {
    axios
    .put(BASE_URL + `/users/${idUserToEdit}/`, data)
    .then(() => {
      getAllUsers();
      setIdUserToEdit(null);
      formRef.current.reset();
    })
    .catch((err) => console.log(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  

    if(idUserToEdit){
      updateUser(data);
    }else{
      createUser(data, e.target);
    }

    
  };

  const handleClickEdit = (userToEdit) => {
    formRef.current.email.value = userToEdit.email
    formRef.current.first_name.value = userToEdit.first_name
    formRef.current.last_name.value = userToEdit.last_name
    formRef.current.birthday.value = userToEdit.birthday   
    formRef.current.password.value = userToEdit.password;
    setIdUserToEdit(userToEdit.id);
  }
    
  useEffect(() => {  
   getAllUsers();
  }, []);


  return (
    <main>

      <form ref={formRef} onSubmit={handleSubmit}>

        <h2>{idUserToEdit ? "Edit an existing user" : "Create new user" }</h2>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="first_name">First_name: </label>
          <input id="first_name"  name="first_name" type="text" />
        </div>
        <div>
          <label htmlFor="last_name">Last_name: </label>
          <input id="last_name" name="last_name" type="text" />
        </div>
        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input id="birthday" name="birthday" type="date" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" name="password" type="text" />
        </div>
        <button type="submit">
          {idUserToEdit ? "Save changes" : "Create new user"}</button>

      </form>
      <UserList 
      users={users} 
      deleteUser={deleteUser} 
      handleClickEdit={handleClickEdit} 
      />
    </main>
  );
}

export default App
