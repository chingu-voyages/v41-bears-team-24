import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface NavLinkProps {label: string, to: string}

const NavLink = ({label, to}: NavLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end: true});
  const underlined = isActive ? "underline underline-offset-8 decoration-blue-400" : "";

  return (
    <li className={`my-4 text-white text-lg ${underlined}`}>
      <Link className="m-2 px-10 text-white hover:text-slate-400" to={to}>{label}</Link>
    </li>
  )
}

export default NavLink;