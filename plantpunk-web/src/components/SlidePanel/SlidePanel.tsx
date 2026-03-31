'use client';
import { useRouter } from 'next/navigation';
import styles from './SlidePanel.module.scss';

export default function SlidePanel({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className={styles.overlay} onClick={() => router.back()}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={() => router.back()}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}