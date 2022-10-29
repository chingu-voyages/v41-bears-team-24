import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { login } from '../../utils/api';

interface LandingProps { setLoggedIn: Function, setMenuCategories: Function, setMenuItems: Function };

const Landing = ({ setLoggedIn, setMenuCategories, setMenuItems }: LandingProps) => {
  const navigate = useNavigate();

  const click = async (username: string) => {
    const ok = await tryLogin(username);
    if (ok === true) navigate('/menu');
  }

  const tryLogin = async (username: string) => {
    try {
      const data = await login(username, "password");
      setLoggedIn({ ...data, password: "" });
      console.log(data);
      fetchMenuData();
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
    // await fetch('/signin', 
    //       {method: "post",
    //         body: JSON.stringify({
    //         username: username,
    //         password: "password",
    //       }),
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //       }});
    // if (res.ok) {
    //   let data = await res.json();
    //   setLoggedIn({...data, password: ""});
    //   console.log(data);
    //   fetchMenuData();
    //   return true;
    // } else {
    //   return false;
    // }
  }

  const fetchMenuData = async () => {
    const items = await fetch('https://v41-bears-team-24-production.up.railway.app/api/menuitem');
    const categories = await fetch('https://v41-bears-team-24-production.up.railway.app/api/menucategory');
    if (items.ok) {
      const data = await items.json();
      setMenuItems(data.data);
    }
    if (categories.ok) {
      const data = await categories.json();
      setMenuCategories(data.data);
    }
  }

  return (
    <>
      <div className="text-8xl text-blue-900 text-center font-bold m-4">Order Up!</div>
      <p className="text-center">Log in as:</p>
      <div className="flex flex-wrap justify-center">
        <LoginButton click={click} username="employee1" label="Employee" />
        <LoginButton click={click} username="manager1" label="Manager" />
        <LoginButton click={click} username="admin1" label="Admin" />
      </div>
    </>
  )
}

export default Landing;