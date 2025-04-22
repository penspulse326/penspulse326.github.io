import React from "react";
import Footer from "@theme-original/BlogPostItem/Footer";
import { useLocation } from "@docusaurus/router";

import GiscusWrapper from "@site/src/components/GiscusComment";

export default function FooterWrapper(props) {
  const location = useLocation();

  const isBlogPostPage =
    location.pathname.startsWith("/blog/") &&
    !location.pathname.match(/^\/blog\/(page\/\d+|tags|archive)/) &&
    location.pathname !== "/blog/";

  return (
    <>
      <Footer {...props} />
      {isBlogPostPage && <GiscusWrapper />}
    </>
  );
}
