import { useState } from "react";
import ControlLabel, { PropsTypeInputBase } from "../ControlLabel";
import { getUrlImages } from "@/mk/utils/string";
import { IconAdd, IconX } from "@/components/layout/icons/IconsBiblioteca";
import { UploadFileM } from "./UploadFileM";
import styles from "./uploadFile.module.css";

interface PropsType extends PropsTypeInputBase {
  ext: string[];
  setError: Function;
  img?: boolean;
  maxFiles?: number;
  prefix?: string;
  images?: any[];
  item: any;
  editor?: boolean | { width: number; height: number };
  sizePreview?: { width: string; height: string };
  // autoOpen?: boolean;
}

const UploadFileMultiple = ({
  className = "",
  maxFiles = 1,
  images = [{ id: 0 }],
  prefix = "",
  item,
  name,
  onChange,
  editor = false,
  sizePreview = { width: "100px", height: "100px" },
  // autoOpen = true,
  ...props
}: PropsType) => {
  const [imgs, setImgs]: any = useState(images);
  const [value, setValue]: any = useState({});

  const deleteImg = (img: string, del = true) => {
    const indice = img.replace(name, "").split("-")[0];
    const id = img.replace(name, "").split("-")[1] || 0;
    let act = "delete";
    if (del == false) act = "";
    const newE = {
      ...value,
      [name + indice]: { file: act, ext: "webp", id },
    };
    onChange && onChange({ target: { name, value: newE } });
    setValue(newE);
  };

  const _onChange = (e: any) => {
    const indice = e.target.name.replace(name, "").split("-")[0];
    const id = e.target.name.replace(name, "").split("-")[1] || 0;
    const newE = { ...value, [name + indice]: { ...e.target.value, id } };
    onChange && onChange({ target: { name, value: newE } });
    setValue(newE);
  };
  return (
    // <ControlLabel
    //   {...props}
    //   name={name}
    //   value={value}
    //   className={styles.uploadFileMultiple + " " + styles[className]}
    // >
    <>
      <div
        className={styles.uploadFileMultiple + " " + styles[className]}
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "space-around",
          gap: "var(--sM)",
          width: "100%",
          flexWrap: "wrap",
          border: "1px solid var(--cWhiteV2)",
          padding: "var(--sM)",
          borderRadius: "var(--bRadius)",
          position: "relative",
        }}
      >
        <label>
          {props.label}
          <IconAdd
            style={{
              backgroundColor: "green",
              cursor: "pointer",
              padding: "4px",
              display: imgs.length >= maxFiles ? "none" : "inline",
              right: -16,
              top: 0,
              position: "absolute",
            }}
            size={16}
            circle={true}
            onClick={() => {
              if (imgs.length >= maxFiles) return;
              setImgs((prev: any) => [...prev, { id: 0 }]);
            }}
          />
        </label>
        {imgs.map((it: any, i: number) => (
          <div
            key={"img-" + i}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              alignItems: "center",
              position: "relative",
            }}
          >
            <UploadFileM
              {...props}
              className="v2"
              autoOpen={i > 0 && !it.id}
              editor={editor}
              sizePreview={sizePreview}
              value={value[name + i]?.file}
              name={name + i + "-" + it.id}
              onChange={_onChange}
              label=""
              placeholder="Subir imagen"
              fileName={
                it.id
                  ? getUrlImages(
                      "/" +
                        prefix +
                        "-" +
                        item.id +
                        "-" +
                        it.id +
                        "." +
                        (it.ext || "webp") +
                        "?" +
                        item.updated_at
                    )
                  : null
              }
            />

            {i > 0 && !it.id && (
              <IconX
                size={16}
                circle={true}
                style={{
                  cursor: "pointer",
                  backgroundColor: "red",
                  padding: "2px",
                  position: "absolute",
                  bottom: 4,
                  right: -8,
                }}
                onClick={() => {
                  deleteImg(name + i + "-" + it.id, false);
                  setImgs(imgs.filter((_: any, j: number) => j !== i));
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
    // </ControlLabel>
  );
};

export default UploadFileMultiple;
