import React from "react";
import Giscus from "@giscus/react";
import { useLocation } from "@docusaurus/router";

import styles from "./styles.module.css";

function GiscusComment() {
  const location = useLocation();

  // Exclude homepage and any other pages where comments are not needed
  // Currently only excluding the homepage, add other paths here if needed
  if (typeof window === "undefined" || location.pathname === "/") {
    return null;
  }

  // Get the color mode from document rather than the hook
  const prefersDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme =
    document.documentElement.dataset.theme ||
    (prefersDarkTheme ? "dark" : "light");

  return (
    <div className={styles.comment}>
      <Giscus
        repo="penspulse326/penspulse326.github.io"
        repoId="R_kgDOH7IBDw"
        category="Announcements"
        categoryId="DIC_kwDOH7IBD84CesRY"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="zh-Hant"
        crossOrigin="anonymous"
        async
      />
    </div>
  );
}

export default function GiscusWrapper() {
  return <>{typeof window !== "undefined" && <GiscusComment />}</>;
}
