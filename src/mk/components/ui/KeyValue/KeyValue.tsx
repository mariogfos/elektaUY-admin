import styles from "./keyValue.module.css";
type PropsType = {
  title: any;
  value: any;
  colorKey?: string;
  colorValue?: string;
  size?: string;
};
const KeyValue = ({ title, value, colorKey, colorValue, size }: PropsType) => {
  return (
    <div className={styles.keyValue}>
      <div
        style={
          colorKey
            ? { color: colorKey, fontSize: `${size}px` }
            : { fontSize: `${size}px` }
        }
      >
        {title}
      </div>
      <div
        style={
          colorKey
            ? { color: colorKey, fontSize: `${size}px` }
            : { fontSize: `${size}px` }
        }
      >
        {value}
      </div>
    </div>
  );
};

export default KeyValue;
