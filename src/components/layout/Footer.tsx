import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-sm flex gap-2 p-2 text-white bg-slate-800 items-center fixed bottom-0 left-0 w-full">
      <span>&copy; {currentYear}</span>
      <Link
        to="https://github.com/tolu-c"
        className="font-bold hover:font-extrabold cursor-pointer"
        target="_blank"
      >
        webDevTolu.
      </Link>
      <span>Al rights reserved.</span>
    </div>
  );
};

export default Footer;
