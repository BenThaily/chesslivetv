import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { LinksCollection, Link } from "../api/messages";

export const Info = () => {
  const isLoading = useSubscribe("links");
  const links = useFind(() => LinksCollection.find());

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  const makeLink = (link: Link) => {
    return (
      <li key={ link._id }>
        <a href={ link.url } target="_blank">{ link.title }</a>
      </li>
    );
  }

  return (
    <div>
      <h2>Chess Live TV</h2>
    </div>
  );
};
