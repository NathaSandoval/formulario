import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { BASE_URL } from "./constants/users"
import UserList from "./components/UserList"

function App() {
  const [users, setUsers] = useState([]);
 
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    createUser(data, e.target);
  };
    
  useEffect(() => {
   getAllUsers();
  }, []);


  return (
    <main>

      <form onSubmit={handleSubmit}>

        <h2>New user</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input id='email' name="email" type="text" />
        </div>
        <div>
          <label htmlFor="first_name">First_name</label>
          <input id='first_name'  name="first_name" type="text" />
        </div>
        <div>
          <label htmlFor="last_name">Last_name</label>
          <input id='last_name' name="last_name" type="text" />
        </div>
        <div>
          <label htmlFor="birthday">Birthday</label>
          <input id='birthday' name="birthday" type="date" />
        </div>
        <button type="submit">Create new user</button>

      </form>
      <UserList users={users}/>
    </main>
  );
}

export default App
