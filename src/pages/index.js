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
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs">
            瀏覽筆記 📝
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog"
            style={{ marginLeft: "10px" }}
          >
            閱讀文章 📚
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
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <div className={styles.section}>
                  <h2>關於我的筆記</h2>
                  <p>
                    這是我記錄前端學習旅程的地方。從基礎的 HTML、CSS 到進階的
                    JavaScript 框架， 我會在這裡分享我的學習心得與實用技巧。
                  </p>
                  <Link to="/docs" className={styles.learnMoreLink}>
                    瀏覽筆記 →
                  </Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.section}>
                  <h2>我的部落格</h2>
                  <p>
                    在部落格中，我會分享更多關於前端開發的想法、專案經驗與技術探討。
                    定期更新，歡迎訂閱。
                  </p>
                  <Link to="/blog" className={styles.learnMoreLink}>
                    閱讀文章 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
