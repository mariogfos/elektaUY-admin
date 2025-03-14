import Button from "@/mk/components/forms/Button/Button";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { Card } from "@/mk/components/ui/Card/Card";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import React, { useState } from "react";
import styles from "./Requests.module.css";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import useAxios from "@/mk/hooks/useAxios";
import { useAuth } from "@/mk/contexts/AuthProvider";
import Empty from "../Empty/Empty";
import { getDateTimeStrMes } from "@/mk/utils/date";

const Requests = ({
  data,
  reLoad,
  statusTask,
  participants,
  volunters,
}: any) => {
  const { execute } = useAxios();
  const { showToast } = useAuth();

  const onAccept = async (item: any, status: any) => {
    const { data } = await execute(
      "/task-participate",
      "POST",
      {
        task_id: item.task_id,
        affiliate_id: item.affiliate_id,
        status: status,
      },
      false,
      true
    );

    if (data?.success) {
      if (status == "A") {
        showToast("Afiliado aceptado", "success");
      } else {
        showToast("Afiliado rechazado", "success");
      }

      reLoad();
    }
  };

  const [imageErrors, setImageErrors]: any = useState({});
  const handleImageError = (id: number) => {
    setImageErrors((prev: any) => ({ ...prev, [id]: true }));
  };
  return (
    <div className={styles.Requests}>
      {data.length > 0 ? (
        data.map((d: any, i: any) => {
          return (
            <Card variant="V1" key={i}>
              <p>{getDateTimeStrMes(d?.created_at)}</p>

              <ItemList
                left={
                  <Avatar
                    name={getFullName(d.affiliate)}
                    src={getUrlImages(
                      "/AFF-" + d.affiliate_id + ".webp?d=" + d?.updated_at
                    )}
                  />
                }
                title={getFullName(d.affiliate)}
                right={
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      variant="secondary"
                      onClick={() => onAccept(d, "R")}
                      disabled={statusTask == "F" || statusTask == "V"}
                    >
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => onAccept(d, "A")}
                      disabled={
                        statusTask == "F" ||
                        statusTask == "V" ||
                        participants >= volunters
                      }
                    >
                      Aceptar
                    </Button>
                  </div>
                }
              />
              {d?.comment && <p>{d?.comment}</p>}
              <img
                alt="requests"
                src={getUrlImages(
                  "/TASKAPPLICATION-" + d.id + ".webp?d=" + d?.updated_at
                )}
                onError={() => {
                  handleImageError(d.id);
                }}
                style={{ maxWidth: "100px", display: "none" }}
              />
              {!imageErrors[d.id] && (
                <a
                  target="_blank"
                  href={getUrlImages(
                    "/TASKAPPLICATION-" + d.id + ".webp?d=" + d?.updated_at
                  )}
                >
                  Ver imagen
                </a>
              )}
            </Card>
          );
        })
      ) : (
        <Empty msg="No existen solicitudes" />
      )}
    </div>
  );
};

export default Requests;
