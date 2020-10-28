import React from "react";
import { useRouter } from "next/router";

export default function ListIndex() {
  const router = useRouter();
  router.query?.id && router.push(router.query.id + "/artists");
  return <div></div>;
}

ListIndex.getInitialProps = (ctx) => {
  // We check for ctx.res to make sure we're on the server.

  if (ctx.res) {
    ctx.res.writeHead(302, { Location: `${ctx.query.id}/artists` });
    ctx.res.end();
  }
  return {};
};
