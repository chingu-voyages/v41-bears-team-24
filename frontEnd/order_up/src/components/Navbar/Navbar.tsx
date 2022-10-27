import { useMatch, useResolvedPath } from 'react-router-dom';
import { User } from "../interfaces";
import NavLink from "./NavLink"

interface NavBarProps {loggedIn: User};

const Navbar = ({ loggedIn }: NavBarProps) => {
  const resolvedPath = useResolvedPath("/");
  const onLandingPage = useMatch({path: resolvedPath.pathname, end: true});
  return (
    onLandingPage ?  //on landing return empty jsx
      <></>
    :  //else 
      <header className="flex flex-wrap justify-between items-center text-4xl  bg-gray-200">
        <div className="text-blue-500 font-bold mx-4">Order Up!</div>
        <ul className="flex flex-wrap">
          <NavLink label="Menu" to="/Menu"/>
          <NavLink label="Kitchen" to="/Kitchen"/>
          {loggedIn.role === 'ADMINISTRATOR' && <NavLink label="Admin" to="/Admin"/>}
          <NavLink label="Logout" to="/"/>
        </ul>
        <div className="text-gray-500 text-lg mx-4">{loggedIn.firstName} {loggedIn.lastName} logged in as {loggedIn.role.toLowerCase()}</div>
      </header>
  )
}

export default Navbar;