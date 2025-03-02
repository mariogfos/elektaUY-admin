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
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const lineHeight = parseFloat(
          window.getComputedStyle(textRef.current).lineHeight
        );
        const maxHeight = lineHeight * lines;

        if (textRef.current.scrollHeight > maxHeight) {
          setShowExpand(true);
        } else {
          setShowExpand(false);
        }
      }
    };

    checkOverflow();

    // Volver a chequear cuando la ventana se redimensiona
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children, lines]);

  return (
    <div className={styles.textContainer}>
      <p
        ref={textRef}
        style={{ ...styleText, WebkitLineClamp: expanded ? "unset" : lines }}
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
