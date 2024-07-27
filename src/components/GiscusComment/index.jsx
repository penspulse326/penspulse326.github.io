import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

function GiscusComment() {
  const { colorMode } = useColorMode();
  return (
    <div className={styles.comment}>
      <Giscus
        repo="penspulse326/penspulse326.github.io"
        repo-id="R_kgDOH7IBDw"
        category="Announcements"
        categoryId="DIC_kwDOH7IBD84CesRY"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode}
        lang="zh-TW"
        crossorigin="anonymous"
        async
      />
    </div>
  );
}

export default GiscusComment;
