import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import GiscusComment from "@site/src/components/GiscusComment";
import { useDoc } from "@docusaurus/theme-common/internal";

export default function FooterWrapper(props) {
  const { metadata, frontMatter, assets } = useDoc();
  const { no_comments } = frontMatter;
  const { title, slug } = metadata;

  return (
    <>
      <Footer {...props} />
      {!no_comments && <GiscusComment />}
    </>
  );
}
