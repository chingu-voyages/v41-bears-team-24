import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { login } from '../../utils/api';
import Logo from '../../assets/logo192.png'

interface LandingProps { setLoggedIn: Function, setMenuCategories: Function, setMenuItems: Function };

const Landing = ({ setLoggedIn, setMenuCategories, setMenuItems }: LandingProps) => {
  const navigate = useNavigate();

  const click = async (username: string) => {
    const ok = await tryLogin(username);
    console.log(ok)
    if (ok === true) navigate('/menu');
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

  const tryLogin = async (username: string) => {
    try {
      const data = await login(username, "password");
      setLoggedIn({ ...data, password: "" });
      console.log("data:" + data);
      fetchMenuData();
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black'>
      <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 text-center">Order Up! <img className='inline-block w-20' src={Logo} alt='Order Up Logo'/> </div> 
      <p className="text-center text-xl my-2 text-slate-100">Log in as:</p>
      <div className="flex flex-wrap justify-center">
        <LoginButton click={click} username="employee1" label="Employee" />
        <LoginButton click={click} username="manager1" label="Manager" />
        <LoginButton click={click} username="admin1" label="Admin" />
      </div>
    </div>
  )
}

export default Landing;