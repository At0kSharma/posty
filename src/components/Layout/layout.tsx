import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

type layoutProps = {
  children: ReactNode;
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default layout;
