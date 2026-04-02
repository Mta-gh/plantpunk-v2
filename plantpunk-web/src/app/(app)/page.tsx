import styles from "./page.module.scss";
import { getPlants } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  const plants = await getPlants();

  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              <Link href={`/plants/${plant.slug}`}>{plant.common_name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
