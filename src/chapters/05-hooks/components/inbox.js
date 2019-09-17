import React, { Component } from "react";
import { AppContext } from "../context";
import Denied from "./denied";
import Empty from "./empty";
import Preview from "./preview";

export default class Inbox extends Component {
  static contextType = AppContext;

  render() {
    const { isAuthenticated, emails } = this.context;
    if (!isAuthenticated) {
      return <Denied />;
    }

    if (!emails.length) {
      return <Empty />;
    }

    return (
      <ul className="inbox">
        {emails.map(email => {
          return <Preview key={email.id} {...email} />;
        })}
      </ul>
    );
  }
}
