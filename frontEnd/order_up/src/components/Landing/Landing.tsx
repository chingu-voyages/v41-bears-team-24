import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginButton from './LoginButton';
import { login } from '../../utils/api';
import { EmptyUser } from '../interfaces';

interface LandingProps { setLoggedIn: Function, setMenuCategories: Function, setMenuItems: Function };

const Landing = ({ setLoggedIn, setMenuCategories, setMenuItems }: LandingProps) => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.loggedIn = JSON.stringify(EmptyUser);
    setLoggedIn(EmptyUser);
    fetchMenuData();
  },[])

  const click = async (username: string) => {
    setLoggingIn(true);
    const ok = await tryLogin(username);
    console.log(ok);
    if (ok === true) navigate('/menu');
    else setLoggingIn(false);
  }

  const fetchMenuData = async () => {
    const items = await fetch('https://v41-bears-team-24-production.up.railway.app/api/menuitem');
    const categories = await fetch('https://v41-bears-team-24-production.up.railway.app/api/menucategory');
    if (items.ok) {
      const data = await items.json();
      setMenuItems(data.data);
      //preload images
      const urls = data.data.map((item: any) => item.imageUrl)
      setImageUrls(urls.slice(0,10));
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
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
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
      {loggingIn && <div className="text-center text-lg">Logging In...</div>}

      {/* preload images */}
      {imageUrls.map( (url) => {
          return <img key={url} className="opacity-0" width="1px" height="1px" src={url} alt="thumb"/>
        }
      )}
    </>
  )
}

export default Landing;