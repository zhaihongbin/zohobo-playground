import { FC } from "react";
import styles from "./index.module.scss";
import logo from "@/assets/icons/logo.svg";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logo} />
        <span>React Playground</span>
      </div>
    </header>
  );
};

export default Header;
