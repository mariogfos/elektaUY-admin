import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import styles from "./Contents.module.css";
import {
  IconArrowLeft,
  IconArrowRight,
  IconComment,
  IconDocs,
  IconLike,
  IconPDF,
} from "@/components/layout/icons/IconsBiblioteca";
import { getDateStrMes } from "@/mk/utils/date";
import List from "@/mk/components/ui/List/List";
import ReactPlayer from "react-player";
import { useState } from "react";
import DetailAffiliate from "@/components/AffiliatesOld/DetailAffiliate";
import { useAuth } from "@/mk/contexts/AuthProvider";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
  extraData?: any;
}) => {
  const { data } = props?.item;
  const extraData = props?.extraData;
  const [idOpenAff, setIdOpenAff]: any = useState({ open: false, id: "" });
  const entidad = ["", "", "Provincia", "Cantón", "Parroquia", "Barrio"];
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const commentList = (item: any) => {
    if (item?.affiliate == null) {
      return;
    }
    return (
      <ItemList
        title={getFullName(item.affiliate)}
        subtitle={item?.comment}
        left={
          <Avatar
            onClick={() => setIdOpenAff({ open: true, id: item.affiliate.id })}
            name={getFullName(item.affiliate)}
            src={getUrlImages(
              "/AFF-" +
                item?.affiliate?.id +
                ".webp?d=" +
                item?.affiliate?.updated_at
            )}
          />
        }
      />
    );
  };

  const [indexVisible, setIndexVisible] = useState(0);
  const nextIndex = () => {
    setIndexVisible((prevIndex) => (prevIndex + 1) % data?.images?.length);
  };
  const prevIndex = () => {
    setIndexVisible((prevIndex) =>
      prevIndex === 0 ? data?.images?.length - 1 : prevIndex - 1
    );
  };
  const getDestinys = () => {
    let lEntidad: any = [];
    data.cdestinies.map((item: any, index: number) => {
      if (data.destiny == 2) {
        lEntidad.push({
          id: item.prov_id,
          name: extraData.provs.find((prov: any) => prov.id == item.prov_id)
            ?.name,
        });
      }
      if (data.destiny == 3) {
        lEntidad.push({
          id: item.canton_id,
          name: extraData.cantons.find(
            (canton: any) => canton.id == item.canton_id
          )?.name,
        });
      }
      if (data.destiny == 4) {
        lEntidad.push({
          id: item.parish_id,
          name: extraData.parishes.find(
            (parish: any) => parish.id == item.parish_id
          )?.name,
        });
      }
      if (data.destiny == 5) {
        lEntidad.push({
          id: item.barrio_id,
          name: extraData.barrios.find(
            (barrio: any) => barrio.id == item.barrio_id
          )?.name,
        });
      }
    });
    return lEntidad;
  };

  const getIconTypeFile = (item: any) => {
    if (item === "pdf") {
      return (
        <div
          style={{
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--cBlackV2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconPDF size={64} />
            <div
              style={{ color: "var(--cInfo)", textDecorationLine: "underline" }}
            >
              Abrir
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--cBlackV2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconDocs size={64} />
          <div
            style={{ color: "var(--cInfo)", textDecorationLine: "underline" }}
          >
            Abrir
          </div>
        </div>
      </div>
    );
  };

  // console.log(user?.role.level, data?.destiny);
  return (
    <>
      <DataModal
        open={props.open}
        onClose={props?.onClose}
        title={"Detalle de la noticia"}
        buttonText=""
        buttonCancel=""
      >
        <div className={styles.container}>
          <div className={styles.content}>
            {data?.destiny != 0 && user?.role.level != data?.destiny && (
              <p style={{ marginBottom: 12, color: "var(--cInfo)" }}>
                Destino:{" "}
                {entidad[data.destiny] +
                  `${
                    getDestinys().length > 1
                      ? data.destiny == 3
                        ? "es"
                        : "s"
                      : ""
                  }`}{" "}
                {getDestinys()
                  .map((e: any) => e.name)
                  .join(", ")}
              </p>
            )}
            <ItemList
              title={getFullName(data.candidate)}
              subtitle={
                <>
                  <div>{data?.user?.role1[0]?.name}</div>
                  <div>{getDateStrMes(props?.item?.data?.created_at)}</div>
                </>
              }
              left={
                <Avatar
                  name={getFullName(data.candidate)}
                  src={getUrlImages(
                    "/CAND-" +
                      data?.candidate.id +
                      ".webp?d=" +
                      data?.candidate.updated_at
                  )}
                />
              }
            />
            <p className={isExpanded ? undefined : styles.truncatedText}>
              {props?.item?.data?.description}
            </p>
            <p
              style={{
                color: "var(--cAccent)",
                cursor: "pointer",
                width: 100,
                fontWeight: 600,
              }}
              onClick={toggleExpanded}
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </p>
            <section className={styles["renderViewImage"]}>
              {props?.item?.data?.type == "I" && (
                <>
                  {data?.images?.length > 1 && (
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        justifyContent: "space-between",
                        padding: "0px 16px",
                        alignItems: "center",
                        width: "100%",
                        gap: 24,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#11111166",
                          padding: "6px",
                          borderRadius: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={prevIndex}
                      >
                        <IconArrowLeft />
                      </div>
                      <div
                        style={{
                          backgroundColor: "#11111166",
                          padding: "6px",
                          borderRadius: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={nextIndex}
                      >
                        <IconArrowRight />
                      </div>
                    </div>
                  )}

                  {data.images[indexVisible]?.id ? (
                    <img
                      alt=""
                      style={{
                        resize: "inherit",
                        objectFit: "contain",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      src={getUrlImages(
                        "/CONT-" +
                          data.id +
                          "-" +
                          data.images[indexVisible]?.id +
                          ".webp" +
                          "?" +
                          data?.updated_at
                      )}
                    />
                  ) : (
                    "Noticia sin imagen"
                  )}
                </>
              )}

              {props?.item?.data?.type == "D" && (
                <>
                  {/* <iframe
                    src={getUrlImages(
                      "/CONT-" +
                        data?.id +
                        "." +
                        data?.url +
                        "?d=" +
                        data?.updated_at
                    )}
                    width="500"
                    height="500"
                  ></iframe> */}
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href={getUrlImages(
                      "/CONT-" +
                        data?.id +
                        "." +
                        data?.url +
                        "?d=" +
                        data?.updated_at
                    )}
                  >
                    {getIconTypeFile(data?.url)}
                  </a>
                </>
              )}
              {props?.item?.data?.type == "V" && (
                <ReactPlayer
                  url={data?.url}
                  width="100%"
                  height={480}
                  controls
                  // config={{
                  //   youtube: {
                  //     playerVars: { showinfo: 1 },
                  //   },
                  //   facebook: {
                  //     appId: "12345",
                  //   },
                  // }}
                />
              )}
            </section>
          </div>
          <section className={styles["reactionsSection"]}>
            {/* <div>
            <p>Apoyos</p>
            <div>
              <IconLike size={40} color="var(--cInfo)" />
              {props?.item?.data?.likes}
            </div>
          </div>

          <div>
            <p>Comentarios</p>
            <div>
              {data?.comments.map((item: any, index: number) => (
                <div key={index}>
                  <ItemList
                    key={index}
                    style={{ marginLeft: -8 }}
                    title={getFullName(item.affiliate)}
                    subtitle={getDateStrMes(item?.created_at)}
                    left={
                      <Avatar
                        name={getFullName(item.affiliate)}
                        src={getUrlImages(
                          "/AFF-" +
                            item?.affiliate.id +
                            ".webp?d=" +
                            item?.affiliate.updated_at
                        )}
                      />
                    }
                  />
                  <p>{item?.comment}</p>
                </div>
              ))}
            </div>
          </div> */}
            <div>
              <div>
                <p>Apoyos</p>
                <p>
                  <IconLike color="var(--cInfo)" />
                  {props?.item?.data?.likes}
                </p>
              </div>
              <div>
                <p>Comentarios</p>
                <p>
                  <IconComment />
                  {props?.item?.data?.comments?.length}
                </p>
              </div>
            </div>
            {props?.item?.data?.comments?.length > 0 && (
              <>
                <h2>Comentarios:</h2>
                <List
                  data={props?.item?.data?.comments}
                  renderItem={commentList}
                />
              </>
            )}
          </section>
        </div>
      </DataModal>
      {idOpenAff.open && (
        <DetailAffiliate
          open={idOpenAff.open}
          close={() => setIdOpenAff({ open: false, id: 0 })}
          id={idOpenAff.id}
        />
      )}
    </>
  );
};

export default RenderView;
