import Button from "@/mk/components/forms/Button/Button";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { Card } from "@/mk/components/ui/Card/Card";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import React from "react";
import styles from "./Reports.module.css";

const Reports = ({ data }: any) => {
  return (
    <Card variant="V1" className={styles.Reports}>
      <p style={{ fontSize: 12, fontWeight: 400, marginBottom: 8 }}>
        03/02/2025, 11:00
      </p>
      <ItemList
        left={
          <Avatar
            name={"Pedro pinaicobo"}
            src="https://www.billboard.com/wp-content/uploads/2024/04/Tito-Double-P-cr-Double-P-Records-press-2024-billboard-1548.jpg?w=942&h=623&crop=1"
          />
        }
        title={"Lautaro Melgar Fernández"}
        // right={
        //   <div style={{ display: "flex", gap: 8 }}>
        //     <Button variant="secondary">Rechazar</Button>
        //     <Button>Aceptar</Button>
        //   </div>
        // }
      />
      <p>
        Ya tengo las 40 plantas. Pueden mandar al chofer para preparar el
        traslado de las plantas hacia la plaza el día de la actividad
      </p>
    </Card>
  );
};

export default Reports;
