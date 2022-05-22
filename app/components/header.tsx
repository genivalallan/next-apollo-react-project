import styles from "./header.module.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1 className={styles.header}>{title}</h1>;
};

export default Header;
