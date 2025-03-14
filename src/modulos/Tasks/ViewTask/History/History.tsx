import React, { useEffect, useState } from "react";
import Empty from "../Empty/Empty";
import styles from "./History.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import useAxios from "@/mk/hooks/useAxios";
import { getDateTimeStrMes, getHourStr } from "@/mk/utils/date";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";
import SkeletonAdapterComponent from "@/mk/components/ui/LoadingScreen/SkeletonAdapter";

type PropsType = {
  id: any;
};
const History = ({ id }: PropsType) => {
  const [history, setHistory]: any = useState([]);
  const { execute } = useAxios();
  const [loading, setLoading] = useState(false);

  const getHistory = async () => {
    setLoading(true);
    const { data } = await execute(
      "/histories",
      "GET",
      {
        fullType: "L",
        searchBy: id,
        entity: "task",
        page: 1,
        perPage: -1,
      },
      false,
      true
    );
    if (data?.success) {
      setHistory(data?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getHistory();
  }, []);

  const getTitle = (item: any) => {
    if (item?.type_action == "I") {
      return (
        <p>
          {getFullName(item?.affiliate)}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            {" "}
            envió su reporte
          </span>
        </p>
      );
    }
    if (item?.type_action == "A") {
      return (
        <p>
          {getFullName(item?.user)}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            aceptó a
          </span>{" "}
          {getFullName(item?.affiliate)}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            {" "}
            como voluntario
          </span>
        </p>
      );
    }
    if (item.type_action == "W") {
      return (
        <p>
          {getFullName(item?.affiliate)}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            mandó una solicitud para ser voluntario
          </span>
        </p>
      );
    }
    if (item.type_action == "C") {
      return (
        <p>
          {getFullName(item?.user)}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            creó la tarea
          </span>
        </p>
      );
    }
    if (item.type_action == "H") {
      return (
        <p>
          {getFullName(item?.user)}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            habilitó a
          </span>{" "}
          {getFullName(item?.affiliate)}
        </p>
      );
    }
    if (item.type_action == "D") {
      return (
        <p>
          {getFullName(item?.user)}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            deshabilitó a
          </span>{" "}
          {getFullName(item?.affiliate)}
        </p>
      );
    }
    if (item.type_action == "R") {
      return (
        <p>
          {getFullName(item?.user)}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            rechazo a
          </span>{" "}
          {getFullName(item?.affiliate)}
        </p>
      );
    }
  };

  const getLabelDate = (date: string) => {
    const createdAt = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let text;

    if (createdAt.toDateString() === today.toDateString()) {
      text = "Hoy";
    } else if (createdAt.toDateString() === yesterday.toDateString()) {
      text = "Ayer";
    } else {
      text = createdAt.toLocaleDateString();
    }
    return text;
  };
  return (
    <div className={styles.History}>
      {loading && <SkeletonAdapterComponent type="TableSkeleton" />}
      {history?.length < 0 && <Empty msg="No se encuentra ningún historial" />}

      {history?.map((d: any, i: any) => {
        const label =
          i === 0 ||
          getLabelDate(d.created_at) !==
            getLabelDate(history[i - 1]?.created_at)
            ? getLabelDate(d.created_at)
            : null;

        let avatar = d.user_id
          ? getUrlImages("/ADM-" + d.user_id + ".webp?d=" + d?.user?.updated_at)
          : getUrlImages(
              "/AFF-" + d.affiliate_id + ".webp?d=" + d?.affiliate?.updated_at
            );
        return (
          <div key={i}>
            {label && (
              <p
                style={{
                  color: "var(--cWhite)",
                  fontWeight: "600",
                  fontSize: 16,
                  margin: "8px 0px",
                }}
              >
                {label}
              </p>
            )}
            <ItemList
              variant="V3"
              left={
                <Avatar
                  name={
                    d.user_id ? getFullName(d.user) : getFullName(d.affiliate)
                  }
                  src={avatar}
                  // src={d.avatar}
                />
              }
              title={getTitle(d)}
              // right={
              //   <span>
              //     {new Date(d.created_at).toLocaleTimeString([], {
              //       hour: "2-digit",
              //       minute: "2-digit",
              //     })}
              //   </span>
              // }
              subtitle={
                <p style={{ color: "var(--cWhiteV1)" }}>
                  {getDateTimeStrMes(d.created_at)}
                </p>
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default History;
