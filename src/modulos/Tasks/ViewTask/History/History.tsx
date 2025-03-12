import React from "react";
import Empty from "../Empty/Empty";
import styles from "./History.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import useAxios from "@/mk/hooks/useAxios";

type PropsType = {
  id: any;
};
const History = ({ id }: PropsType) => {
  const { data: history } = useAxios(
    "/histories",
    "GET",
    {
      fullType: "L",
      searchBy: id,
      entity: "task",
    },
    true
  );
  let data = [
    {
      type: "A",
      coordinator: "Emiliano Lora",
      avatar:
        "https://i.pinimg.com/236x/14/20/7d/14207d52efefefaf3abdf69053d83b41.jpg",
      affiliate: "Lautaro Melgar",
      created_at: new Date().toISOString(),
    },
    {
      type: "C",
      coordinator: "Emiliano Lora",
      created_at: new Date(Date.now() - 200000000).toISOString(),
      avatar:
        "https://i.pinimg.com/236x/14/20/7d/14207d52efefefaf3abdf69053d83b41.jpg",
    },
    {
      type: "W",
      affiliate: "Lautaro Melgar",
      created_at: new Date(Date.now() - 100000000).toISOString(),
      avatar:
        "https://guillemrecolons.com/wp-content/uploads/2020/01/Ventajas-y-desventajas-de-los-perfiles-privados-en-las-redes-sociales.webp",
    },
    {
      type: "W",
      affiliate: "Fernanda Claros",
      created_at: new Date().toISOString(),
      avatar:
        "https://img.wattpad.com/6e10fe43fb8c450fc971f5f9a30c471153a29a2e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6353377a706941574530425937513d3d2d32362e313630643937663934353530623561363935393136313931383537302e6a7067?s=fit&w=720&h=720",
    },
  ];

  const getTitle = (item: any) => {
    if (item.type == "A") {
      return (
        <p>
          {item.coordinator}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            aceptó a
          </span>{" "}
          {item.affiliate}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            {" "}
            como voluntario
          </span>
        </p>
      );
    }
    if (item.type == "W") {
      return (
        <p>
          {item.affiliate}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            mandó una solicitud para ser voluntario
          </span>
        </p>
      );
    }
    if (item.type == "C") {
      return (
        <p>
          {item.coordinator}{" "}
          <span style={{ color: "var(--cBlackV2)", fontWeight: 400 }}>
            creó la tarea
          </span>
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

  data.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className={styles.History}>
      {data.length > 0 ? (
        data.map((d: any, i: any) => {
          const label =
            i === 0 ||
            getLabelDate(d.created_at) !== getLabelDate(data[i - 1].created_at)
              ? getLabelDate(d.created_at)
              : null;
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
                    name={getFullName(d.affiliate)}
                    // src={getUrlImages(
                    //   "/AFF-" + d.affiliate_id + ".webp?d=" + d?.updated_at
                    // )}
                    src={d.avatar}
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
              />
            </div>
          );
        })
      ) : (
        <Empty msg="No se encuentra ningún historial" />
      )}
    </div>
  );
};

export default History;
