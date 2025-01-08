// import { redirect } from "next/navigation";
"use client";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import styles from "./headTitle.module.css";
import { IconArrowLeft } from "../layout/icons/IconsBiblioteca";

type PropsType = {
  title?: string | null;
  backUrl?: string;
  className?: string;
  style?: CSSProperties;
  onBack?: any;
  left?: any;
  right?: any;
  customTitle?: any;
};

const HeadTitle = ({
  title = null,
  backUrl = "/",
  className = "",
  onBack = null,
  style = {},
  left = null,
  right = null,
  customTitle = null,
}: PropsType) => {
  const router = useRouter();
  const goBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (backUrl != "") {
      router.push(backUrl);
      return;
    }
    router.back();
  };
  return (
    <div style={style} className={styles.headTitle + " " + className}>
      {left !== false && (
        <span>
          {left !== null ? (
            left
          ) : (
            <IconArrowLeft onClick={goBack} color="var(--cWhite)" size={32} />
          )}
        </span>
      )}
      <div
        style={{
          marginLeft: left === false ? undefined : "var(--spM)",
          marginRight: left === false ? undefined : "var(--spM)",
        }}
      >
        {customTitle ? customTitle : <h1>{title}</h1>}
      </div>
      <span>{right}</span>
    </div>
  );
};

export default HeadTitle;
