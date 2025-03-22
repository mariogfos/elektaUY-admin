import React, { CSSProperties } from "react";
import styles from "./CardForm.module.css";

type PropsType = {
  children: any;
  title?: string;
  subtitle?: string;
  style?: CSSProperties;
  styleSubtitle?: CSSProperties;
};

const CardForm = ({
  children,
  title,
  subtitle,
  style,
  styleSubtitle,
}: PropsType) => {
  return (
    <div className={styles.CardForm} style={style}>
      <div>
        <p>{title}</p>
        {subtitle && <p style={styleSubtitle}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default CardForm;
