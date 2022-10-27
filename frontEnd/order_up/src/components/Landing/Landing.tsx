import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginButton from './LoginButton';

interface LandingProps {setLogin: Function};

const Landing = ({ setLogin }: LandingProps) => {
  const navigate = useNavigate();

  const click = (userRole: string) => {
    tryLogin();

    setLogin(userRole);
    navigate('/menu');
  }

  const tryLogin = () => {
    fetch('/signin', 
      {method: "post",
        body: JSON.stringify({
        username: "employee1",
        password: "password",
    }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }})
    .then((res) => console.log(res))
  }

  useEffect(() => {
    //tryLogin();
  }, [])

  return (
    <>
      <div className="text-8xl text-blue-900 text-center font-bold m-4">Order Up!</div>
      <p className="text-center">Log in as:</p>
      <div className="flex flex-wrap justify-center">
        <LoginButton click={click} userRole="employee" label="Employee"/>
        <LoginButton click={click} userRole="manager" label="Manager"/>
        <LoginButton click={click} userRole="admin" label="Admin"/>
      </div>
    </>
  )
}

export default Landing;