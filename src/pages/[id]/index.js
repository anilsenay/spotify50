import React from "react";
import fire from "../../firebase/config";

export default function List({ data, error }) {
  console.log(data, error);
  return <div></div>;
}

List.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};
  await fire
    .firestore()
    .collection("Lists")
    .doc(query.id)
    .get()
    .then(function (doc) {
      data = doc.data();
    })
    .catch((e) => (error = e));

  return {
    data,
    error,
  };
};
