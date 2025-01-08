import React from "react";
import { Card } from "@/mk/components/ui/Card/Card";

import { DepartmentsMaps } from "@/components/Maps/Departments/DepartmentsMaps";

import styles from "./WidgetMaps.module.css";
import { formatNumber } from "../../../mk/utils/numbers";

import Image from "next/image";

type TypeProps = {
  tooltipsData: any;
  totalHabitanes: number;
  totalHabilitados: number;
  totalAfiliados: number;
  totalPid: number;
};

export const WidgetMaps = ({
  tooltipsData,
  totalHabitanes,
  totalHabilitados,
  totalAfiliados,
  totalPid,
}: TypeProps) => {
  return (
    <div className={styles.WidgetMaps}>
      <div>Resumen poblacional en Ecuador</div>
      <div className={styles.stats}>
        <Card style={{ textAlign: "right", fontSize: 16 }}>
          <p>Población Censo 2022</p>
          <p>{formatNumber(totalHabitanes, 0)}</p>
        </Card>
        <Card style={{ textAlign: "right", fontSize: 16 }}>
          <p>Votantes habilitados 2024</p>
          <p>{formatNumber(totalHabilitados, 0)}</p>
        </Card>
        <Card style={{ textAlign: "right", fontSize: 16 }}>
          <p>Votos obtenidos PID 2024</p>
          <p>{formatNumber(totalPid, 0)}</p>
        </Card>
        <Card style={{ textAlign: "right", fontSize: 16 }}>
          <p>Afiliados en Elekta</p>
          <p>{formatNumber(totalAfiliados, 0)}</p>
        </Card>
      </div>

      <div className={styles.uruguay}>
        <DepartmentsMaps tooltipsData={tooltipsData} />
        <div>
          <Image
            src="/images/ecuador.png"
            alt="Ecuador"
            // layout="fixed"
            width={190}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetMaps;
