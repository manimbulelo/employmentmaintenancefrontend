import { FaUsersLine } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const NavBarItem = ({ path, name }) => {
  return (
    <p className="cursor-pointer hover:text-gray-500 transition-all ease-in-out">
      <NavLink to={path}>{name}</NavLink>
    </p>
  );
};

function NavBar() {
  return (
    <div className="p-4 bg-gray-200 sticky flex flex-row gap-3 justify-center items-center shadow-md">
      <FaUsersLine />
      <NavBarItem path="employees" name="Employees" />
    </div>
  );
}

export default NavBar;
