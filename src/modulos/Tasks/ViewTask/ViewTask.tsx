import DataModal from "@/mk/components/ui/DataModal/DataModal";
import React, { useState } from "react";
import FilterButton from "./FilterButton/FilterButton";
import styles from "./ViewTask.module.css";
import useAxios from "@/mk/hooks/useAxios";
import { getDateTimeStrMes } from "../../../mk/utils/date";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { Card } from "@/mk/components/ui/Card/Card";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import Button from "@/mk/components/forms/Button/Button";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";
import { cStatusTask, statusTask } from "@/mk/utils/utils";
import Requests from "./Requests/Requests";
import Reports from "./Reports/Reports";
import Volunteers from "./Volunteers/Volunteers";
import History from "./History/History";

type PropsType = {
  open: boolean;
  onClose: any;
  id: any;
};

const ViewTask = ({ open, onClose, id }: PropsType) => {
  const [tab, setTab] = useState("S");
  const {
    data: task,
    loaded,
    reLoad,
  } = useAxios(
    "/tasks",
    "GET",
    {
      fullType: "DET",
      searchBy: id,
    },
    true
  );

  const requestsData = () => {
    let data: any = [];
    task?.data?.data?.affiliate_tasks.map((t: any) => {
      if (t.status == "W") {
        data.push(t);
      }
    });
    return data;
  };

  const volunteersData = () => {
    let data: any = [];
    task?.data?.data?.affiliate_tasks.map((t: any) => {
      if (t.status == "A" || t.status == "X") {
        data.push(t);
      }
    });
    return data;
  };
  return (
    <DataModal
      title="Detalles de la tarea"
      open={open}
      onClose={onClose}
      buttonCancel=""
      buttonText={tab == "R" ? "Finalizar tarea" : ""}
      className={styles.ViewTask}
    >
      {!task ? (
        <div>Cargando....</div>
      ) : (
        <>
          <p>{task?.data?.data?.description}</p>
          <div className={styles.card}>
            <p>Requisitos</p>
            <p>{task?.data?.data?.requirements}</p>
          </div>
          <div className={styles.detail}>
            <div>
              <p>Estado</p>
              <p style={{ color: cStatusTask[task?.data?.data?.task_status] }}>
                {statusTask[task?.data?.data?.task_status]}
              </p>
            </div>
            <div>
              <p>Vigencia</p>
              <p>
                {getDateTimeStrMes(task?.data?.data?.begin_at)} -{" "}
                {getDateTimeStrMes(task?.data?.data?.end_at)}
              </p>
            </div>
            <div>
              <p>Puntos</p>
              <p>{task?.data?.data?.points}</p>
            </div>
            <div>
              <p>Voluntarios</p>
              <p>0/{task?.data?.data?.volunteer_count}</p>
            </div>
          </div>
          <FilterButton
            style={{ marginTop: "8px" }}
            sel={tab}
            setSel={setTab}
            values={[
              { value: "A", name: "Historial" },
              {
                value: "S",
                name: "Solicitudes",
                badge: requestsData().length > 0 ? requestsData().length : null,
              },
              { value: "R", name: "Reportes" },
              { value: "V", name: "Voluntarios" },
            ]}
          />
          {tab == "A" && <History />}
          {tab == "S" && <Requests data={requestsData()} reLoad={reLoad} />}
          {tab == "R" && <Reports />}
          {tab == "V" && <Volunteers data={volunteersData()} reLoad={reLoad} />}
        </>
      )}
    </DataModal>
  );
};

export default ViewTask;
