import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { User } from "../interfaces";
import LoginButton from './LoginButton';

interface LandingProps {setLoggedIn: Function};

const Landing = ({ setLoggedIn }: LandingProps) => {
  const navigate = useNavigate();

  const click = async (username: string) => {
    const ok = await tryLogin(username);
    if (ok === true) navigate('/menu');
  }

  const tryLogin = async (username: string) => {
    const res = await fetch('/signin', 
          {method: "post",
            body: JSON.stringify({
            username: username,
            password: "password",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }});
    if (res.ok) {
      let data = await res.json();
      setLoggedIn({...data, password: ""});
      console.log(data);
      return true;
    } else {
      return false;
    }
   }

  return (
    <>
      <div className="text-8xl text-blue-900 text-center font-bold m-4">Order Up!</div>
      <p className="text-center">Log in as:</p>
      <div className="flex flex-wrap justify-center">
        <LoginButton click={click} username="employee1" label="Employee"/>
        <LoginButton click={click} username="manager1" label="Manager"/>
        <LoginButton click={click} username="admin1" label="Admin"/>
      </div>
    </>
  )
}

export default Landing;