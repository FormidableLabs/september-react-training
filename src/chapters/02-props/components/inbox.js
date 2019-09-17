import React from "react";
import Empty from "./empty";
import { emails } from "../../../utils/email";
// import Preview from "./preview";

export default function Inbox() {
  if (!emails.length) {
    return <Empty />;
  }

  return (
    <ul>
      {emails.map(({ id, name, title, body }) => {
        return (
          <li>
            <h3>{name}</h3>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
