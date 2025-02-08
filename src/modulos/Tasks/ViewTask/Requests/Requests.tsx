import Button from "@/mk/components/forms/Button/Button";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { Card } from "@/mk/components/ui/Card/Card";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import React from "react";
import styles from "./Requests.module.css";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import useAxios from "@/mk/hooks/useAxios";
import { useAuth } from "@/mk/contexts/AuthProvider";
import { IconInfoApp } from "@/components/layout/icons/IconsBiblioteca";
import Empty from "../Empty/Empty";

const Requests = ({ data, reLoad }: any) => {
  const { execute } = useAxios();
  const { showToast } = useAuth();
  const onAccept = async (item: any) => {
    const { data } = await execute(
      "/task-participate",
      "POST",
      {
        task_id: item.task_id,
        affiliate_id: item.affiliate_id,
        status: "A",
      },
      false,
      true
    );

    if (data?.success) {
      showToast("Afiliado aceptado", "success");
      reLoad();
    }
  };
  return (
    <div className={styles.Requests}>
      {data.length > 0 ? (
        data.map((d: any, i: any) => {
          return (
            <Card variant="V1" key={i}>
              <p style={{ fontSize: 12, fontWeight: 400, marginBottom: 8 }}>
                03/02/2025, 11:00
              </p>

              <ItemList
                left={
                  <Avatar
                    name={getFullName(d.affiliate)}
                    src={getUrlImages(
                      "/AFF-" + d.id + ".webp?d=" + d?.updated_at
                    )}
                  />
                }
                title={getFullName(d.affiliate)}
                right={
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="secondary">Rechazar</Button>
                    <Button onClick={() => onAccept(d)}>Aceptar</Button>
                  </div>
                }
              />
              <p>
                Yo quiero hacer esta tarea, tengo un vivero y puedo conseguir
                los 40 plantines que se están pidiendo.
              </p>
            </Card>
          );
        })
      ) : (
        // <div className={styles.empty}>
        //   <IconInfoApp />
        //   <p>No existen solicitudes </p>
        // </div>
        <Empty msg="No existen solicitudes" />
      )}
    </div>
  );
};

export default Requests;
