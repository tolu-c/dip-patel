import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center">
      <Link to="/quiz">
        <h2 className="text-lg font-bold ">Dip Patel</h2>
      </Link>

      <ul className=" flex gap-3 items-center">
        <NavLinks to="quiz" title="Quizzes" />
        <NavLinks to="quiz/new" title="Create your own quiz" />
      </ul>
    </div>
  );
};

export default Header;

interface NavLinksProps {
  to: string;
  title: string;
}
const NavLinks = ({ to, title }: NavLinksProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-gray-400"
            : isActive
            ? "underline"
            : " text-gray-900 hover:underline"
        }
      >
        {title}
      </NavLink>
    </li>
  );
};
