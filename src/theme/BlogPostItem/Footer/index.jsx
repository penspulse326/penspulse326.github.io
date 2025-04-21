import React from "react";
import Footer from "@theme-original/BlogPostItem/Footer";
import { useLocation } from "@docusaurus/router";

// Import GiscusWrapper
import GiscusWrapper from "@site/src/components/GiscusComment";

export default function FooterWrapper(props) {
  const location = useLocation();
  // Check if current page is a blog post page (URL is /blog/xxx, but not /blog or /blog/tags etc.)
  const isBlogPostPage =
    location.pathname.startsWith("/blog/") &&
    !location.pathname.match(/^\/blog\/(page\/\d+|tags|archive)/) &&
    location.pathname !== "/blog/";

  return (
    <>
      <Footer {...props} />
      {/* Only show comments on blog post pages, not on the blog list page */}
      {isBlogPostPage && <GiscusWrapper />}
    </>
  );
}
