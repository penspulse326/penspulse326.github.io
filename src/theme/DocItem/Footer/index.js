import React from "react";
import Footer from "@theme-original/DocItem/Footer";

//import GiscusWrapper
import GiscusWrapper from "@site/src/components/GiscusComment";

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />

      <GiscusWrapper />
    </>
  );
}
