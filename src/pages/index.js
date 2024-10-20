import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ImgAvatar from "@site/static/img/avatar.png";

import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <main className="container">
        <div className={styles.wrapper}>
          <div className={styles.contentGrid}>
            <section className={clsx(styles.block, styles.basicInfo)}>
              <div>
                <h2>嗨，我是 Shin！</h2>
                <p>
                  💻 前端工程師 | 聯和趨動
                  <br />
                  ✡️ 專題教練 | 六角學院 2024 切版專題班
                  <br />
                </p>
                <p>
                  前端是一條不歸路，不小心就踏進來了。
                  <br />
                  不知道自己可以走多久，但正是因為不知道，
                  <br />
                  所以我會繼續走，看看能走到多遠的地方。
                </p>
              </div>

              <div className={styles.avatar}>
                <img src={ImgAvatar} alt="shin 's avatar" />
              </div>
            </section>
            <div className={clsx("f-grid")}>
              <section className={clsx(styles.block, styles.exp)}>
                <h2>經歷</h2>
                <div className={styles.expItem}>
                  <span className={styles.expJob}>前端工程師</span>
                  <span>聯和趨動股份有限公司</span>
                  <span className={styles.date}>2024 年 8 月 - 現在</span>

                  <p className={styles.expDesc}>
                    以 Vue 開發 HRMS 系統，以 Nuxt 開發產品介紹網站
                  </p>
                </div>
                <div className={styles.expItem}>
                  <span className={styles.expJob}>前端組學員</span>
                  <span>火箭隊培訓營</span>

                  <span className={styles.date}>
                    2023 年 8 月 - 2024 年 3 月
                  </span>
                </div>
              </section>
              <section className={clsx(styles.block, styles.tech)}>
                <h2>主要技術</h2>
                <p>緩慢增加中</p>
                <ul>
                  <li>JavaScript</li>
                  <li>TypeScript</li>
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>Vue.js</li>
                  <li>Node.js</li>
                  <li>MongoDB</li>
                </ul>
              </section>
              <section className={clsx(styles.block, styles.tech)}>
                <h2>專案類型</h2>
                <p>緩慢增加中</p>
                <ul>
                  <li>HRMS 系統</li>
                  <li>GIS 系統</li>
                  <li>影音社群平台</li>
                  <li>形象網站</li>
                  <li>圖表資訊</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
