import { observer } from 'mobx-react-lite';
import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserServices from './services/UserServices';

const App: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserServices.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if(store.isLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
        <h1>{store.isAuth ? `User is authorized ${store.user.email}` : "User is not authorized"}</h1>
        <h1>{store.user.isActivated ? "Email is activated" : "Email is not activated"}</h1>
        {!store.isAuth && <LoginForm/>}
        {store.isAuth &&<button onClick={()=>{store.logout()}}>Logout</button>}
    <div>
      <button onClick={getUsers}>Get users</button>
    </div>
    {users.map((user, index)=>
    <div key={[user, index].join("_")}>
      {user.email}
    </div>
    )}
    </div>
  )
}

export default observer(App);
