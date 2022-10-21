import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface NavLinkProps {label: string, to: string}

const liStyle = "my-4";
const LinkStyle = "m-2 border-solid border-2 border-indigo-700 rounded px-10 pb-2 text-white";
const NavLink = ({label, to}: NavLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end: true});
  const bgColor = isActive ? " bg-blue-900" : " bg-blue-500 hover:text-gray-300";
  return (
    <li className={liStyle}><Link className={LinkStyle + bgColor} to={to}>{label}</Link></li>
  )
}

export default NavLink;