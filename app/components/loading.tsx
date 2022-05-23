import styles from "./loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingBox}>
      <p className={styles.loadingText}>&#10227; Carregando...</p>
    </div>
  );
};

export default Loading;
