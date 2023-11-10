import Image from "next/image";
import styles from "./page.module.css";

export default function Home({
  searchParams,
}: {
  searchParams: { from: string };
}) {
  const redirectedFrom = searchParams.from;

  return (
    <main className={styles.main}>
      <h1>Homepage</h1>
      {redirectedFrom ? `Redirected from: /${redirectedFrom}` : ""}
    </main>
  );
}
