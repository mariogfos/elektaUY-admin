import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import styles from "./AddContent.module.css";
import React from "react";
import {
  IconComment,
  IconGallery,
  IconLike,
  IconShare,
} from "@/components/layout/icons/IconsBiblioteca";

import { getFullName, getUrlImages } from "@/mk/utils/string";
type PropsType = {
  formState: any;
  extraData: any;
};
const Preview = ({ formState, extraData }: PropsType) => {
  const dataFake = {
    avatar:
      "https://revistaverde.com.uy/wp-content/uploads/2020/03/lacalle-pou-presidente-3-20.jpg",
    name: "Nombre candidato",
    title: "Lorem ipsum dolor sit amet consectetur.",
    subtitle: "Presidente de la República Oriental del Uruguay",
    description:
      " Lorem ipsum dolor sit amet consectetur. Placerat augue id nulla risus ut ultrices. Vestibulum tristique commodo non proin dis.",
  };

  const candidate = extraData?.candidates?.find(
    (can: any) => formState?.candidate_id == can.id
  );
  return (
    <div className={styles.Preview}>
      <div>
        <ItemList
          left={
            <Avatar
              src={getUrlImages(
                "/CAND-" + candidate?.id + ".webp?d=" + candidate?.updated_at
              )}
              name={getFullName(candidate) || dataFake.name}
            />
          }
          title={getFullName(candidate) || dataFake.name}
          subtitle={
            extraData?.typeCands?.find(
              (t: any) => t?.id == candidate?.typecand_id
            )?.name || dataFake.subtitle
          }
        />
        <section
          style={{ flexDirection: formState?.isType == "N" ? "row" : "column" }}
        >
          <div>
            {formState?.isType == "N" && (
              <p>{formState?.title || dataFake.title}</p>
            )}
            <span>{formState?.description || dataFake.description}</span>
          </div>
          {(formState?.isType == "N" ||
            (formState?.isType == "P" && formState.avatar)) && (
            <div>
              <div
                style={{
                  height: "184px",
                  width: formState?.isType == "N" ? " 180px" : "100%",
                }}
              >
                <IconGallery />
              </div>
            </div>
          )}
        </section>
      </div>
      <div>
        <div>
          <IconLike color="var(--cBlackV2)" />
          <p>Apoyar</p>
        </div>
        <div>
          <IconComment color="var(--cBlackV2)" />
          <p>Comentar</p>
        </div>
        <div>
          <IconShare color="var(--cBlackV2)" />
          <p>Compartir</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
