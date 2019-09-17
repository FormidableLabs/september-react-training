import React from "react";
import { useAuth } from "../context/auth-context";
import { useEmail } from "../context/email-context";
import Denied from "./denied";
import Empty from "./empty";
import Preview from "./preview";
import Undo from "./undo";

export default function Inbox() {
  const { isAuthenticated } = useAuth();
  const { emails, removedEmailInfo } = useEmail();

  if (!isAuthenticated) {
    return <Denied />;
  }

  if (!emails.length) {
    return <Empty />;
  }

  const inboxElements = emails.map(email => (
    <Preview key={email.id} {...email} />
  ));

  if (removedEmailInfo) {
    inboxElements.splice(
      removedEmailInfo.index,
      0,
      <Undo key={`undo-${removedEmailInfo.email.id}`} />
    );
  }

  return <ul className="inbox">{inboxElements}</ul>;
}
