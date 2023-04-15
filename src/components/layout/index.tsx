import { Fragment, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();

  const handleGoBack: () => void = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <Header />
      <main className="p-2 grid grid-cols-1 gap-6">
        <span className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 bg-slate-100 cursor-pointer hover:bg-slate-300">
          <ChevronLeftIcon className="w-6 h-6" onClick={handleGoBack} />
        </span>
        {children}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
