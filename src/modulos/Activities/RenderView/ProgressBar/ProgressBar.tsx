import React from "react";
import styles from "./ProgressBar.module.css";

type PropsType = {
  level: number;
  maxLevel: number;
};

const ProgressBar = ({ level, maxLevel }: PropsType) => {
  const percent = (level * 100) / maxLevel || 0;
  const formattedPercent = percent % 1 === 0 ? percent : percent.toFixed(2);
  return (
    <div className={styles.ProgressBar}>
      <div>
        <div className={styles.Bar} style={{ width: `${percent}%` }} />
      </div>
      <div>
        {level} de {maxLevel} ({formattedPercent}% hecho)
      </div>
    </div>
  );
};

export default ProgressBar;
