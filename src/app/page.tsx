import { PrismaClient } from '@prisma/client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import styles from './page.module.css';

const prisma = new PrismaClient();

export default async function Home() {
  const data = await prisma.dtc.findMany({});

  return (
    <>
      <Header />
      <main className={styles.main}>{JSON.stringify(data)}</main>
      <Footer />
    </>
  );
}
