import { useNavigate } from 'react-router-dom';
import LoginButton from "./LoginButton";

interface LandingProps {setLogin: Function};

const Landing = ({ setLogin }: LandingProps) => {
  const navigate = useNavigate();

  const click = (userRole: string) => {
    setLogin(userRole);
    navigate('/menu');
  }

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