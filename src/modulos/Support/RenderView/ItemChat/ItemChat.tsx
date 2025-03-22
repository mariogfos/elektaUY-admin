import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import React from "react";
type PropsType = {
  src?: string;
  message: string;
  date: string;
  name: string;
  user_id: number;
};
const ItemChat = ({ src, message, date, name, user_id }: PropsType) => {
  const user = { id: 2 };
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexDirection: user_id == user.id ? "row-reverse" : "row",
        marginBottom: 8,
      }}
    >
      <Avatar src={src} name={name} />
      <div
        style={{
          backgroundColor:
            user_id == user.id ? "var(--cInfo)" : "var(--cHover)",
          padding: "8px 16px",
          maxWidth: 443,
          borderRadius: 16,
        }}
      >
        <p style={{ color: "var(--cWhite)" }}>{message}</p>
      </div>
      <p
        style={{
          color: "var(--cGray)",
          fontSize: 12,
          display: "flex",
          alignItems: "end",
        }}
      >
        {date}
      </p>
    </div>
  );
};

export default ItemChat;
