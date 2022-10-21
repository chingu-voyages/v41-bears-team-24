import { Link } from 'react-router-dom';
const liStyle = "m-2 bg-blue-500 px-10 pb-2 border-solid border-2 border-indigo-700 rounded";
const aStyle = "text-white hover:text-gray-300";

const Navbar = () => {
  return (
    <header className="flex flex-wrap justify-between items-center text-4xl  bg-gray-200">
      <div className="text-blue-500 font-bold">Order Up!</div>
      <ul className="flex flex-wrap">
        <li className={liStyle}><Link className={aStyle} to="/Menu">Menu</Link></li>
        <li className={liStyle}><Link className={aStyle} to="/Kitchen">Kitchen</Link></li>
        <li className={liStyle}><Link className={aStyle} to="/Admin">Admin</Link></li>
        <li className={liStyle}><Link className={aStyle} to="/">Logout</Link></li>
      </ul>
    </header>
  )
}

export default Navbar;