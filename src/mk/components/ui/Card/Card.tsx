import { CSSProperties, MouseEvent } from "react";
import styles from "./card.module.css";

interface PropsType {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  hoverInColor?: string;
  outHoverColor?: string;
}

export const Card = ({
  children,
  className = "",
  style = {},
  onClick,
  hoverInColor = "var(--cBlackV3)",
  outHoverColor = "var(--cHover)",
}: PropsType) => {
  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.backgroundColor = hoverInColor;
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.backgroundColor = outHoverColor;
    }
  };

  return (
    <div
      style={style}
      onClick={onClick}
      className={`${styles.card} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
