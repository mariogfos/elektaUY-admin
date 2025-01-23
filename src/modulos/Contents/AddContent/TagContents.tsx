import React from "react";
import style from "./AddContent.module.css";
type PropsType = {
  icon: any;
  text: string;
  onClick: any;
  isActive: boolean;
};
const TagContents = ({ icon, text, onClick, isActive }: PropsType) => {
  return (
    <div
      className={style.TagContents}
      style={{ backgroundColor: isActive ? "var(--cBlackV3)" : undefined }}
      onClick={onClick}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default TagContents;
