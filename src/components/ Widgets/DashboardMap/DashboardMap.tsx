import React from "react";
import { Card } from "@/mk/components/ui/Card/Card";
import { formatNumber } from "../../../mk/utils/numbers";
import styles from "./DashboardMap.module.css";
import Image from "next/image";
import Maps from "@/components/Maps/Maps";

type TypeProps = {
  data: any;
  params: any;
  onClick?: any;
  entidadData?: any;
  itemSelected: any;
  setPoblacion?: any;
};

export const DashboardMap = ({
  data,
  params,
  onClick,
  entidadData,
  itemSelected,
  setPoblacion,
}: TypeProps) => {
  const totalAfiliados = data?.entidad?.reduce(
    (acc: number, current: any) => acc + current.affiliate_count,
    0
  );

  return (
    <div className={styles.WidgetMaps}>
      <>
        <div>
          Resumen poblacional en{" "}
          {params[0]?.level === 1
            ? "Ecuador"
            : params[0]?.level === 2
            ? "Provincia"
            : "Cantón"}
        </div>

        <div className={styles.stats}>
          {params[0]?.level != 3 && (
            <>
              <Card
                style={{ textAlign: "right", fontSize: 16 }}
                // onClick={() =>
                //   setPoblacion({
                //     total:
                //       params[0]?.level == entidadData?.role?.level
                //         ? entidadData?.entidad?.habitantes
                //         : data?.population?.habitantes,
                //     label: "Censo 2022",
                //   })
                // }
              >
                <p>
                  Población Censo <br /> 2022
                </p>
                {params[0]?.level == entidadData?.role?.level ? (
                  <p>{formatNumber(entidadData?.entidad?.habitantes, 0)}</p>
                ) : (
                  <p>{formatNumber(data?.population?.habitantes, 0)}</p>
                )}
              </Card>
              <Card
                style={{ textAlign: "right", fontSize: 16, cursor: "pointer" }}
                onClick={() =>
                  setPoblacion({
                    total:
                      params[0]?.level == entidadData?.role?.level
                        ? entidadData?.entidad?.habilitados
                        : data?.population?.habilitados,
                    label: "Habilitados",
                  })
                }
              >
                <p>Votantes habilitados 2024</p>
                {params[0]?.level == entidadData?.role?.level ? (
                  <p>{formatNumber(entidadData?.entidad?.habilitados, 0)}</p>
                ) : (
                  <p>{formatNumber(data?.population?.habilitados)}</p>
                )}
              </Card>
              <Card
                style={{ textAlign: "right", fontSize: 16, cursor: "pointer" }}
                onClick={() =>
                  setPoblacion({
                    total:
                      params[0]?.level == entidadData?.role?.level
                        ? entidadData?.entidad?.pid
                        : data?.population?.pib,
                    label: "Votos obtenidos PID 2023",
                  })
                }
              >
                <p>Votos obtenidos PID 2023</p>
                {params[0]?.level == entidadData?.role?.level ? (
                  <p>{formatNumber(entidadData?.entidad?.pid, 0)}</p>
                ) : (
                  <p>{formatNumber(data?.population?.pib)}</p>
                )}
              </Card>
            </>
          )}
          <Card style={{ textAlign: "right", fontSize: 16 }}>
            <p>Afiliados registrados en Elekta</p>
            <p>{formatNumber(totalAfiliados, 0)}</p>
          </Card>
        </div>
      </>

      <div className={styles.ecuador}>
        {/* <Maps
          data={data?.entidad}
          params={params}
          onClick={onClick}
          itemSelected={itemSelected}
        /> */}
        <div>Uruguay</div>
        {params[0]?.level == 1 && (
          <div>
            <Image
              src="/images/EcuadorM.png"
              alt="Ecuador"
              width={190}
              height={40}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMap;
