import React, { useEffect } from "react";
import styles from "../Activities.module.css";
import { IconArrowLeft } from "@/components/layout/icons/IconsBiblioteca";
import Image from "next/image";
import CardActivityView from "./CardActivityView";
import KeyValue from "@/mk/components/ui/KeyValue/KeyValue";
import Tasks from "@/modulos/Tasks/Tasks";
import ProgressBar from "./ProgressBar/ProgressBar";

const RenderView = ({
  onClose,
  open,
  item,
  setItem,
  extraData,
  user,
  openList,
  setOpenList,

  reLoad,
  action,
}: any) => {
  useEffect(() => {
    setOpenList(false);
  }, []);
  return (
    open && (
      <div className={styles.RenderView}>
        <div>
          <p onClick={() => onClose()}>Volver</p>
          <IconArrowLeft />
          <p>Detalle de la actividad</p>
        </div>
        <div>
          <section>
            <div style={{ width: "100%", height: "220px", overflow: "hidden" }}>
              <img
                //   width={416}
                //   height={220}
                style={{ width: "100%", height: "auto" }}
                src={
                  "https://cdn-images.dzcdn.net/images/cover/0dc1610857f00628e14aafa693ec9216/0x1900-000000-80-0-0.jpg"
                }
                alt="Picture of the author"
              />
            </div>
            <div>
              <p>Voluntariado</p>
              <p>Pendiente</p>
            </div>
            <div>
              <p>Una plaza más verde</p>
              <p>
                Únete a esta actividad de voluntariado para revitalizar una
                plaza local mediante la plantación de árboles, flores y mejoras
                en las áreas verdes, fomentando un espacio más limpio y
                sostenible para la comunidad.
              </p>
            </div>
            <div>
              <CardActivityView>
                <p>Fecha de inicio</p>
                <p>Viernes 25 de junio</p>
              </CardActivityView>
              <CardActivityView>
                <p>Fecha de finalización</p>
                <p>Viernes 25 de junio</p>
              </CardActivityView>
            </div>
            <CardActivityView title="Información de general">
              <KeyValue title={"Destino"} value={"colonia"} />
              <KeyValue title={"Voluntarios"} value={"10"} />
              <KeyValue title={"Duración"} value={"3 horas"} />
              <KeyValue title={"Fecha"} value={"25 de junio"} />
              <KeyValue title={"Hora"} value={"10:00 am"} />
              <KeyValue title={"Lugar"} value={"Plaza de la colonia"} />
            </CardActivityView>
          </section>
          <section>
            <div>
              <p>Tareas de la actividad</p>
              <ProgressBar level={1} maxLevel={5} />
            </div>
            {/* <Tasks id={1} /> */}
          </section>
        </div>
      </div>
    )
  );
};

export default RenderView;
