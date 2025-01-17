import { useEffect, useState } from "react";
import ControlLabel, { PropsTypeInputBase } from "../ControlLabel";
import { getUrlImages } from "@/mk/utils/string";
import {
  IconAdd,
  IconImage,
  IconX,
} from "@/components/layout/icons/IconsBiblioteca";
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

  useEffect(() => {
    if (imgs[0]?.id != 0 && imgs?.length < maxFiles)
      setImgs([...imgs, { id: 0 }]);
  }, []);

  const deleteImg = (img: string, del = true) => {
    const indice = img.replace(name, "").split("-")[0];
    const id = img.replace(name, "").split("-")[1] || 0;
    let act = "delete";
    // console.log("deleteImg", img, indice, id);
    let newE: any = {};
    if (id == 0) {
      act = "";

      const newI: any = [];
      imgs.map((it: any, i: number) => {
        // console.log("it", value[name + i], i);
        if (i !== parseInt(indice) && (value[name + i] || it.id != 0)) {
          newI.push(imgs[i]);
          if (value[name + i]) newE[name + (newI.length - 1)] = value[name + i];
        }
      });
      newI.push({ id: 0 });
      setValue(newE);
      setImgs(newI);
      // console.log("imgs", newI);
    } else {
      if (value[name + indice]?.file == "delete") act = "";
      newE = {
        ...value,
        [name + indice]: { file: act, ext: "webp", id },
      };
      setValue(newE);
    }

    onChange && onChange({ target: { name, value: newE } });

    // console.log("newE", newE);
  };

  const _onChange = (e: any) => {
    if (
      (e.target.value.file == "" || e.target.value.file == "delete") &&
      imgs.length > 1
    ) {
      // setImgs(
      //   imgs.filter(
      //     (_: any, i: number) =>
      //       i !== parseInt(e.target.name.replace(name, "").split("-")[0])
      //   )
      // );
      deleteImg(e.target.name, false);

      return;
    }

    const indice = e.target.name.replace(name, "").split("-")[0];
    const id = e.target.name.replace(name, "").split("-")[1] || 0;
    // const add = !value[name + indice] || value[name + indice]?.file == "";

    // console.log("add", value[name + indice]);
    const newE = { ...value, [name + indice]: { ...e.target.value, id } };
    onChange && onChange({ target: { name, value: newE } });
    setValue(newE);
    //

    let add = true;
    //iterar newE que es un objeto
    // console.log("newE", newE);
    // console.log("imgs", imgs);
    // Object.values(newE).forEach((it: any, i: number) => {
    //   if (it.file == "") add = false;
    // });

    // imgs.forEach((it: any, i: number) => {
    //   if (!newE[name + i] && newE[name + i]?.file == "") add = false;
    // });

    // newE.((it: any, i: number) => {
    //   if (it.file == "") add = false;
    // });

    // contar cuantos elementos hay en newE
    add = imgs.length <= Object.keys(newE).length;

    if (!add) {
      add = true;
      imgs.map((it: any, i: number) => {
        if (
          it.id == 0 &&
          value &&
          value[name + i] &&
          value[name + i].file == ""
        )
          add = false;
      });
    }

    if (imgs.length >= maxFiles || !add) return;
    setImgs((prev: any) => [...prev, { id: 0 }]);
    //
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
          {props.label || "Puede subir hasta " + maxFiles + " imágenes"}
          {/* {imgs.length > 1 ||
            (value[name + "0"]?.file != "" && (
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
            ))} */}
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
            {/* {value[name + i]?.file.substr(0, 5)} */}
            <UploadFileM
              {...props}
              className="v2"
              // autoOpen={imgs.length > 1 && !it.id}
              editor={editor}
              sizePreview={sizePreview}
              value={value[name + i]?.file || false}
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

            {/* {i > 0 && !it.id && (
              // (it.value?.file == "" || it.value?.file == "DELETE") &&
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
            )} */}
          </div>
        ))}
        {/* {imgs.length <= maxFiles && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "10px",
              color: "var(--cPrimary)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              if (imgs.length >= maxFiles) return;
              setImgs((prev: any) => [...prev, { id: 0 }]);
            }}
          >
            <IconImage size={40} color={"var(--cWhite)"} />
            <span>{props.placeholder || "Subir imagen "}</span>
            <span>{props.ext.join(", ") || "jpg,png,jpeg"}</span>
          </div>
        )} */}
      </div>
    </>
    // </ControlLabel>
  );
};

export default UploadFileMultiple;
