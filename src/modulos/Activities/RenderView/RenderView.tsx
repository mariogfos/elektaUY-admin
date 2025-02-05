import React, { useEffect, useState } from "react";
import styles from "../Activities.module.css";
import {
  IconArrowLeft,
  IconInfoApp,
} from "@/components/layout/icons/IconsBiblioteca";
import Image from "next/image";
import CardActivityView from "./CardActivityView";
import KeyValue from "@/mk/components/ui/KeyValue/KeyValue";
import Tasks from "@/modulos/Tasks/Tasks";
import ProgressBar from "./ProgressBar/ProgressBar";
import { getDateTimeStrMes } from "../../../mk/utils/date";
import StateLabel from "./StateLabel/StateLabel";
import { getUrlImages } from "@/mk/utils/string";
import { useAuth } from "@/mk/contexts/AuthProvider";

const RenderView = ({
  onClose,
  open,
  item,
  setItem,
  extraData,
  user,
  openList,
  setOpenList,

  execute,
  reLoad,
}: // action,
any) => {
  const { showToast } = useAuth();
  const [task, setTask] = useState([]);

  const getTask = async () => {
    const { data } = await execute("/roles", "GET", {
      fullType: "L",
      // searchBy: item?.data.id,
    });
    if (data?.success === true) {
      // showToast("Asistencia confirmada", "success");
      setTask(data?.data);
    } else {
      showToast(data?.message, "info");
      // close();
    }
  };

  useEffect(() => {
    setOpenList(false);
    getTask();
  }, []);
  console.log(task);

  const [level, setLevel] = useState(1);

  const typeActivity: any = {
    T: "Taller",
    C: "Capacitación",
    R: "Reuniones",
    V: "Voluntariado",
  };

  const getMissingDays = () => {
    const date = new Date();
    const dateEnd = new Date(item?.data?.end_at);
    const diff = dateEnd.getTime() - date.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const getDestinys = () => {
    const names: any = ["Todos"];
    if (item?.data?.destiny == 2) {
      extraData?.listas.map((li: any) => {
        let d = item?.data?.adestinies.find((e: any) => e.lista_id == li.id);
        if (d) {
          names.push(li.name);
        }
      });
    }
    if (item?.data?.destiny == 3) {
      extraData?.dptos.map((dpto: any) => {
        let d = item?.data?.adestinies.find((e: any) => e.dpto_id == dpto.id);
        if (d) {
          names.push(dpto.name);
        }
      });
    }
    if (item?.data?.destiny == 4) {
      extraData?.muns.map((mun: any) => {
        let d = item?.data?.adestinies.find((e: any) => e.dpto_id == mun.id);
        if (d) {
          names.push(mun.name);
        }
      });
    }
    return names;
  };

  return (
    open && (
      <div className={styles.RenderView}>
        <section>
          <div>
            <p onClick={() => onClose()}>Volver</p>
            <IconArrowLeft />
            <p>Detalle de la actividad</p>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                height: "220px",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                //   width={416}
                //   height={220}
                style={{ width: "100%", height: "auto" }}
                src={getUrlImages(
                  "/ACTIVITY-" +
                    item?.data?.id +
                    ".webp?d=" +
                    item?.data.updated_at
                )}
                alt="Picture of the author"
              />
            </div>
            <div>
              <p>{typeActivity[item?.data?.type_activity]}</p>
              <StateLabel state={item?.data?.activity_status} />
            </div>
            <div>
              <p>{item?.data?.name}</p>
              <p>{item?.data?.description}</p>
            </div>
            <div>
              <CardActivityView>
                <p>Fecha de inicio</p>
                <p>{getDateTimeStrMes(item?.data?.end_at)}</p>
              </CardActivityView>
              <CardActivityView>
                <p>Fecha de finalización</p>
                <p>{getDateTimeStrMes(item?.data?.begin_at)}</p>
              </CardActivityView>
            </div>
            <CardActivityView title="Información de general">
              <KeyValue
                title={"Destino"}
                value={getDestinys().join(", ")}
                colorValue="var(--cSuccess)"
              />
              <KeyValue
                title={"Voluntarios maximos"}
                value={item?.data?.volunteer_count || 0}
              />

              {item?.data?.date_limit && (
                <KeyValue
                  title={"Fecha limite de inscripción"}
                  value={getDateTimeStrMes(item?.data?.date_limit)}
                />
              )}
              <KeyValue
                title={
                  item?.data?.activity_mode == "P"
                    ? "Ubicación"
                    : "Link de reunion"
                }
                value={
                  <a
                    href={item?.data?.location}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "var(--cPrimary)",
                    }}
                  >
                    {item?.data?.activity_mode == "P"
                      ? item?.data?.address
                      : "Entrar a la reunión"}
                  </a>
                }
                bottom={
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      width: "100%",
                      alignItems: "center",
                      color: "var(--cWarning)",
                    }}
                  >
                    <IconInfoApp />
                    {getMissingDays() == 0 ? (
                      <p>Ya empezó</p>
                    ) : (
                      <p>
                        {"Faltan " +
                          getMissingDays() +
                          " días para que cierren las inscripciones"}
                      </p>
                    )}
                  </div>
                }
              />
            </CardActivityView>
          </div>
        </section>
        <section>
          <div>
            <p>Tareas de la actividad</p>
            <ProgressBar level={level} maxLevel={5} />
            {/* <p onClick={() => setLevel(level + 1)}>Next level</p> */}
          </div>
          {/* <Tasks id={item?.data?.id} /> */}
        </section>
      </div>
    )
  );
};

export default RenderView;
