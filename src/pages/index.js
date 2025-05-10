import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <div className={styles.buttonsContainer}>
          <Link
            className={clsx("button button--lg", styles.heroButton)}
            to="/docs"
          >
            筆記 📝
          </Link>
          <Link
            className={clsx("button button--lg", styles.heroButton)}
            to="/projects"
          >
            實作 💻
          </Link>
          <Link
            className={clsx("button button--lg", styles.heroButton)}
            to="/blog"
          >
            文章 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`} description="前端技術筆記與文章">
      <HomepageHeader />
      <main>
        <div className={styles.homeContent}>
          <div className={styles.customContainer}>
            <div className={styles.contentSection}>
              <h2>關於我</h2>
              <p>
                我是
                Shin，現職為前端工程師，喜歡寫作和教學，這個網站大多紀錄我的學習或開發心得。
              </p>
              <p>
                寫作雖然不難，但也是呈現人類內在的一種媒介，因此我想告訴你，AI
                僅供我寫作上的潤飾、內容增減、邏輯或資料來源的校驗，我還有點人性，所以我不會讓你看一篇從頭到尾都是
                AI 寫的東西。
              </p>
              <p>
                如果對其他職涯、心理調適等寫作內容有興趣，近期我也開始經營
                <Link
                  to="https://substack.com/@penspulse326"
                  target="_blank"
                  className={styles.inlineLink}
                >
                  Substack 專欄
                </Link>
                ，歡迎訂閱以接收文章發佈通知。
              </p>
            </div>

            <div className={styles.contentSection}>
              <h2>經歷</h2>
              <ul className={styles.experienceList}>
                <li>💻 HRM 系統介面開發與維護</li>
                <li>🔯 六角學院 - 專題教練</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
