import { Fragment, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      <main className="p-2 grid grid-cols-1 gap-6">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
