import { useState, useRef, useEffect, CSSProperties } from "react";
import styles from "./ExpandableText.module.css";

type PropsType = {
  children: string;
  lines: number;
  styleText?: CSSProperties;
};

export default function ExpandableText({
  children,
  lines,
  styleText,
}: PropsType) {
  const [expanded, setExpanded] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const textRef: any = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight,
        lines
      );
      const maxHeight = lineHeight * lines;
      if (textRef.current.scrollHeight > maxHeight) {
        setShowExpand(true);
      }
    }
  }, [lines]);

  return (
    <div className={styles.textContainer}>
      <p
        ref={textRef}
        style={styleText}
        className={`${styles.text} ${
          expanded ? styles.expanded : styles.clamped
        }`}
      >
        {children}
      </p>
      {showExpand && (
        <p className={styles.expandBtn} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Ver menos" : "Ver más"}
        </p>
      )}
    </div>
  );
}
