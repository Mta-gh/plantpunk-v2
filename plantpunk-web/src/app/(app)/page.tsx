import styles from "./page.module.scss";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <h2>PlantPunk</h2>
        <p>Houseplant care encyclopedia</p>
      </main>
    </div>
  );
}
