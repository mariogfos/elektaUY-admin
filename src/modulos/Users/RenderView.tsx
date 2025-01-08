import DataModal from "@/mk/components/ui/DataModal/DataModal";
import styles from "./Users.module.css";
import { getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName } from "../../mk/utils/string";
import useAxios from "@/mk/hooks/useAxios";
import {
  IconBorn,
  IconCandidates,
  IconProfession,
} from "@/components/layout/icons/IconsBiblioteca";
import { Card } from "@/mk/components/ui/Card/Card";
import KeyValue from "@/mk/components/ui/KeyValue/KeyValue";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
  extraData?: any;
}) => {
  // const { data: typeCant } = useAxios("/typecands", "GET", {
  //   fullType: "L",
  //   searchBy: "",
  // });

  //   console.log(typeCant);
  // console.log(props.item);
  // console.log(props?.extraData);
  let entidades = ["", "", "Provincia", "Cantón", "Parroquia", "Barrio"];

  const getEntidad = () => {
    let entidad = ["", "", "prov", "canton", "parish", "barrio"];
    let data: any = [];
    if (props.item?.level) {
      data =
        props?.extraData[
          entidad[props.item.level] + `${props.item.level == 4 ? "es" : "s"}`
        ];
    }
    return data?.find(
      (e: any) => e.id == props.item?.[entidad[props.item.level] + "_id"]
    )?.name;
  };
  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle del Administrador"}
      buttonText=""
      buttonCancel=""
    >
      <div className={styles.container}>
        <div>
          <Avatar
            src={getUrlImages(
              "/ADM-" + props.item.id + ".webp?d=" + props.item.updated_at
            )}
            h={100}
            w={100}
            name={getFullName(props.item)}
          />
          <div>
            <p className={styles.title}>{getFullName(props.item)}</p>
            <p style={{ color: "var(--cWhiteV1)", fontSize: "var(--sL)" }}>
              {
                props.extraData.roles.find(
                  (e: any) => e.id == props.item.role_id
                ).name
              }
            </p>
            {/* {props?.item?.level > 1 && (
              <p style={{ fontSize: 10 }}>
                {entidades[props?.item.level] + ": " + getEntidad()}
              </p>
            )} */}
          </div>
        </div>
        <section>
          {props?.item?.level > 1 && (
            <div>
              <p>{entidades[props?.item.level]}</p>
              <p>{getEntidad()}</p>
            </div>
          )}
          <div>
            <p>Cédula de identidad</p>
            <p>{props.item?.ci}</p>
          </div>
          <div>
            <p>Correo electrónico</p>
            <p>{props.item?.email}</p>
          </div>
          <div>
            <p>Número de Whatsapp</p>
            <p>
              {(props.item.prefix_phone ? "+" + props.item.prefix_phone : "") +
                " " +
                props.item?.phone}
            </p>
          </div>
        </section>
      </div>
    </DataModal>
  );
};

export default RenderView;
