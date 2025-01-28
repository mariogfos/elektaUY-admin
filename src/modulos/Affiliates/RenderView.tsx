import DataModal from "@/mk/components/ui/DataModal/DataModal";
import styles from "./Affiliates.module.css";
import { getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName } from "../../mk/utils/string";

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
  // let entidades = ["", "", "Provincia", "Cantón", "Parroquia", "Barrio"];

  // const getEntidad = () => {
  //   let entidad = ["", "", "prov", "canton", "parish", "barrio"];
  //   let data: any = [];
  //   if (props.item?.level) {
  //     data =
  //       props?.extraData[
  //         entidad[props.item.level] + `${props.item.level == 4 ? "es" : "s"}`
  //       ];
  //   }
  //   return data?.find(
  //     (e: any) => e.id == props.item?.[entidad[props.item.level] + "_id"]
  //   )?.name;
  // };
  console.log(props.item);
  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle del Afiliado"}
      buttonText=""
      buttonCancel=""
    >
      <div className={styles.container}>
        <div>
          <Avatar
            src={getUrlImages(
              "/AFF-" +
                props.item.affiliate_id +
                ".webp?d=" +
                props.item.updated_at
            )}
            h={100}
            w={100}
            name={getFullName(props?.item)}
          />
          <div>
            <p className={styles.title}>{getFullName(props.item.affiliate)}</p>
            {/* <p style={{ color: "var(--cWhiteV1)", fontSize: "var(--sL)" }}>
              {
                props.extraData.roles.find(
                  (e: any) => e.id == props.item.role_id
                ).name
              }
            </p> */}
            {/* {props?.item?.level > 1 && (
              <p style={{ fontSize: 10 }}>
                {entidades[props?.item.level] + ": " + getEntidad()}
              </p>
            )} */}
          </div>
        </div>
        <section>
          {/* {props?.item?.level > 1 && (
            <div>
              <p>{entidades[props?.item.level]}</p>
              <p>{getEntidad()}</p>
            </div>
          )} */}
          <div>
            <p>Cédula de identidad</p>
            <p>{props.item?.ci}</p>
          </div>
          <div>
            <p>Nivel</p>
            <p>{props.item?.level}</p>
          </div>
          <div>
            <p>Puntos</p>
            <p>{props.item?.points}</p>
          </div>
        </section>
      </div>
    </DataModal>
  );
};

export default RenderView;
