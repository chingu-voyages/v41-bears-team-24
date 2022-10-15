const liTW = "m-2 bg-blue-500 px-10 pb-2 border-solid border-2 border-indigo-700 rounded";
const aTW = "text-white hover:text-gray-300";

const Navbar = () => {
  return (
    <header className="flex flex-wrap justify-between items-center text-4xl  bg-gray-200">
      <div className="text-blue-500 font-bold">Order Up!</div>
      <ul className="flex flex-wrap">
        <li className={liTW}><a className={aTW} href="/Menu">Menu</a></li>
        <li className={liTW}><a className={aTW} href="/Kitchen">Kitchen</a></li>
        <li className={liTW}><a className={aTW} href="/Admin">Admin</a></li>
        <li className={liTW}><a className={aTW} href="/">Logout</a></li>
      </ul>
    </header>
  )
}

export default Navbar;