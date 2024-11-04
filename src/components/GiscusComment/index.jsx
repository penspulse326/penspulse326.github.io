import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";

import styles from "./styles.module.css";

function GiscusComment() {
  // 检查是否在客户端
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const { colorMode } = useColorMode();
    const location = useLocation();

    if (location.pathname === "/docs/") {
      return null;
    }

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
          theme={colorMode}
          lang="zh-Hant"
          crossOrigin="anonymous"
          async
        />
      </div>
    );
  } catch (error) {
    console.warn("GiscusComment rendering error:", error);
    return null;
  }
}

export default function GiscusWrapper() {
  return <>{typeof window !== "undefined" && <GiscusComment />}</>;
}
