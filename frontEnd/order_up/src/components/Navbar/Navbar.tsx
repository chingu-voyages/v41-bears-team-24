import { useMatch, useResolvedPath } from 'react-router-dom';
import { User } from "../interfaces";
import NavLink from "./NavLink"
import Logo from '../../assets/logo192.png'
import { useEffect, useState } from 'react';

interface NavBarProps {loggedIn: User};


const Navbar = ({ loggedIn }: NavBarProps) => {
  const resolvedPath = useResolvedPath("/");
  const onLandingPage = useMatch({path: resolvedPath.pathname, end: true});



  return (
    onLandingPage ?  //on landing return empty jsx
      <></>
    :  //else 
      <header className="flex flex-wrap justify-between items-center  bg-black ">
        <div className='flex'>
          <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mx-4 text-4xl">Order Up</div>
          <img className='w-12' src={Logo} alt='Order Up Logo'></img>
        </div>
        <ul className="flex flex-wrap my-1">
          <NavLink label="Menu" to="/Menu"/>
          <NavLink label="Kitchen" to="/Kitchen"/>
          {loggedIn.role === 'ADMIN' && <NavLink label="Admin" to="/Admin"/>}
          <NavLink label="Logout" to="/"/>
        </ul>
        <div className="text-gray-400 text-lg mx-4"><span className='font-extrabold text-slate-100'>{loggedIn.firstName} {loggedIn.lastName}</span> logged in as <span className={`capitalize border-slate-100 border-2 rounded-lg p-1 text-orange-400`}>{loggedIn.role.toLocaleLowerCase()}</span></div>
      </header>
  )
}

export default Navbar;