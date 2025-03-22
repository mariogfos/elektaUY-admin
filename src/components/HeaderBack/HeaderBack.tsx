import React from "react";
import { IconArrowLeft } from "../layout/icons/IconsBiblioteca";
import styles from "./HeaderBack.module.css";

type PropsType = {
  onClose: () => void;
  titleLeft?: string;
  titleRight?: string;
};

const HeaderBack = ({ onClose, titleLeft, titleRight }: PropsType) => {
  return (
    <div className={styles.HeaderBack}>
      <p onClick={() => onClose()}>{titleLeft}</p>
      <IconArrowLeft />
      <p>{titleRight}</p>
    </div>
  );
};

export default HeaderBack;
