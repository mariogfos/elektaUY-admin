import { formatNumber } from "@/mk/utils/numbers";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./Maps.module.css";
import {
  pathsArtigas,
  pathsBellaUnion,
  pathsCanelones,
  pathsCerroLargo,
  pathsColonia,
  pathsDurazno,
  pathsFlores,
  pathsFlorida,
  pathsLaValleja,
  pathsMaldonado,
  pathsMontevideo,
  pathsPais,
  pathsPaysandu,
  pathsRioNegro,
  pathsRivera,
  pathsRocha,
  pathsSalto,
  pathsSanJose,
  pathsSoriano,
  pathsTacuarembo,
  pathsTreintaTres,
} from "./pathMapas";

type PropsType = {
  data: any;
  onClick?: any;
  params?: any;
  itemSelected: any;
};

const Maps = ({
  data,
  onClick = () => {},
  params = [{}, () => {}],
  itemSelected,
}: PropsType) => {
  const svgRef: any = useRef(null);
  const [param] = params;

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  let path: any = [];

  if ((param?.level || 1) == 1) {
    path = pathsPais;
  }
  if (param?.level == 2) {
    switch (param?.code) {
      case "1":
        path = pathsMontevideo;
        break;
      case "2":
        path = pathsArtigas;
        break;
      case "3":
        path = pathsCanelones;
        break;
      case "4":
        path = pathsCerroLargo;
        break;
      case "5":
        path = pathsColonia;
        break;
      case "6":
        path = pathsDurazno;
        break;
      case "7":
        path = pathsFlores;
        break;
      case "8":
        path = pathsFlorida;
        break;
      case "9":
        path = pathsLaValleja;
        break;
      case "10":
        path = pathsMaldonado;
        break;
      case "11":
        path = pathsPaysandu;
        break;
      case "12":
        path = pathsRioNegro;
        break;
      case "13":
        path = pathsRivera;
        break;
      case "14":
        path = pathsRocha;
        break;
      case "15":
        path = pathsSalto;
        break;
      case "16":
        path = pathsSanJose;
        break;
      case "17":
        path = pathsSoriano;
        break;
      case "18":
        path = pathsTacuarembo;
        break;
      case "19":
        path = pathsTreintaTres;
        break;
    }
  }
  if (param?.level == 3) {
    switch (param?.code) {
      case "0":
        path = pathsBellaUnion;
        break;
    }
  }

  const _onClick = (code: string | number) => {
    let row = data?.find((d: any) => d.code == code);
    onClick(row);
  };

  let paramLevel = param?.level == undefined ? 1 : param?.level;

  const onTooltip = (event: any, id: string | number, show: boolean = true) => {
    if (!show) return setTooltip({ visible: false, x: 0, y: 0, item: null });
    const rect = event.target.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();
    const item = data?.find((d: any) => d.code == id) || {
      id: id || itemSelected?.id,
      name: itemSelected?.name || "Sin municipio",
      habitantes: itemSelected?.habitantes || 0,
      habilitados: itemSelected?.habilitados || 0,
      afiliados: itemSelected?.affiliate_count || 0,
      municipios: itemSelected?.municipios || 0,
      // total: 0,
    };

    setTooltip({
      visible: id || item != null ? true : false,
      x: rect.left - svgRect.left + rect.width / 2,
      y: rect.top - svgRect.top,
      item: paramLevel <= 3 ? item : null,
    });
  };

  const getStyle = () => {
    switch (param?.code) {
      case "1":
        return styles.CerroLargoMap;
      case "2":
        return styles.CerroLargoMap;
      case "3":
        return styles.CañarMap;
      case "4":
        return styles.CerroLargoMap;
      case "5":
        return styles.CotopaxiMap;
      case "6":
        return styles.ChimborazoMap;
      case "7":
        return styles.ElOroMap;
      case "8":
        return styles.SaltoMap;
      case "9":
        return styles.GuayasMap;
      case "10":
        return styles.ImbaduraMap;
      case "11":
        return styles.LojaMap;
      case "12":
        return styles.DuraznoMap;
      case "13":
        return styles.ManabiMap;
      case "14":
        return styles.MoronaMap;
      case "15":
        return styles.NapoMap;
      case "16":
        return styles.PastazaMap;
      case "17":
        return styles.PichinchaMap;
      case "17":
        return styles.TunguaruMap;
      case "19":
        return styles.ZamoraMap;
      default:
        return styles.mapa;
    }
  };

  const Tooltip = ({ item }: any) => {
    return (
      paramLevel <= 2 && (
        <div
          className={styles.tooltip}
          style={{
            top: tooltip.y,
            left: tooltip.x,
            borderRadius: 4,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <h3 style={{ fontSize: 16, color: "#101111", paddingBottom: 8 }}>
            {item?.name?.charAt(0).toUpperCase() +
              item?.name?.slice(1).toLowerCase()}
          </h3>
          <div style={{ fontSize: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Habitantes: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.habitantes, 0)}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Votantes habilitados: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.habilitados, 0)}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Afiliados: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.affiliate_count || item?.afiliados, 0)}
              </p>
            </div>
            {param?.level == 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#656F78",
                }}
              >
                <p>Municipios: </p>
                <p style={{ color: "#101111" }}>
                  {formatNumber(item?.distritosCount || item?.distritos, 0)}
                </p>
              </div>
            )}
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className={
        param?.level == 1 ? styles.mapa : param?.level == 2 ? getStyle() : ""
      }
    >
      <svg ref={svgRef} viewBox={path[0]?.vb}>
        {path.map((path: any, index: number) => {
          if (path.title === "rect") {
            return (
              <rect
                key={path.id || index}
                x={path.x}
                y={path.y}
                width={path.width}
                height={path.height}
                rx={path.rx}
                style={{ fill: "#fff" }}
              />
            );
          }

          return (
            <Link
              key={path.id || index}
              href="#"
              onClick={() =>
                path.title !== "map" &&
                path.title !== "line" &&
                path.title !== "salar" &&
                param?.level != 4 &&
                path.title !== "disabled" &&
                path.code
                  ? _onClick(path?.code)
                  : {}
              }
              title={path.title}
            >
              <path
                key={path.id || index}
                style={{
                  fill: path.title === "salar" ? "#393c3f" : "",
                  strokeWidth:
                    path.title === "salar" ? 0 : paramLevel === 2 ? 0.5 : 1,
                  stroke:
                    path.title === "value"
                      ? "#000"
                      : path.title === "line"
                      ? "#fff"
                      : "",
                  cursor: param?.level < 3 ? "pointer" : "default",
                }}
                d={path.d}
                onMouseEnter={(e) =>
                  path.title !== "salar" && onTooltip(e, path?.code)
                }
                onMouseLeave={() =>
                  path.title !== "salar" && onTooltip(null, path?.code, false)
                }
              />
            </Link>
          );
        })}
      </svg>

      {tooltip.visible && (
        <Tooltip
          x={tooltip.x}
          y={tooltip.y}
          item={tooltip.item}
          param={param}
        />
      )}
    </div>
  );
};

export default Maps;
