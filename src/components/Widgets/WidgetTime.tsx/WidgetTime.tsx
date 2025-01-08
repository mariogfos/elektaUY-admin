import { MONTHS, MONTHS_S, getDateStr, getDateStrMes } from "@/mk/utils/date";
import styles from "./WidgetTime.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";

const WidgetTime = ({ data }: any) => {
  const today: any = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const currentYear = today.getFullYear();
  const { isTablet } = useScreenSize();
  data = { count_from: "2024-10-01", count_to: "2025-5-11" };
  let d: any = data.count_from.split("-");
  const countFrom = new Date(2025, 1 - 1, 1);
  d = data.count_to.split("-");

  const countTo = new Date(d[0], d[1] - 1, d[2]);

  const daysInMonth = (mes: any, año: any) => {
    return new Date(año, mes, 0).getDate();
  };
  const generateMonths = (from: Date, to: Date) => {
    let months = [];
    let current = new Date(from.getFullYear(), from.getMonth(), 1);
    const end = new Date(to.getFullYear(), to.getMonth(), 1);

    while (current <= end) {
      const month = current.getMonth();
      const year = current.getFullYear();
      months.push({
        mes: month + 1,
        anio: year,
        dias: daysInMonth(month, year),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  };

  const meses = generateMonths(countFrom, countTo);

  const getPercentage = (mes: any, dias: any) => {
    if (mes === currentMonth) {
      return (currentDay / dias) * 100;
    }
    return 0;
  };

  const getDaysFaltantes = () => {
    let d = data?.count_to.split("-");
    const fechaObjetivo: any = new Date(d[0], d[1] - 1, d[2]);
    const diferencia = fechaObjetivo - today;
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diasFaltantes = Math.ceil(diferencia / milisegundosPorDia);

    return diasFaltantes;
  };

  return (
    <div className={styles.container}>
      <p>
        Faltan <span>{getDaysFaltantes()}</span> días para las elecciones del{" "}
        {getDateStrMes(data?.count_to)}
      </p>
      <div>
        {meses?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                borderRight:
                  index < meses.length - 1 ? "1.5px solid var(--cWhite)" : "",
                backgroundColor:
                  item.anio < currentYear ||
                  (item.anio === currentYear && currentMonth > item.mes)
                    ? "var(--cInfo)"
                    : "",
                borderTopLeftRadius: index == 0 ? 8 : 0,
                borderBottomLeftRadius: index == 0 ? 8 : 0,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: `${getPercentage(item.mes, item.dias)}%`,
                  borderTopLeftRadius: index == 0 ? 8 : 0,
                  borderBottomLeftRadius: index == 0 ? 8 : 0,
                }}
              />
              <div style={{ zIndex: 99 }}>
                <div />
                <div />
                <div />
                <div
                  style={{
                    borderRight: "0px",
                  }}
                />
              </div>
              <span>{isTablet ? MONTHS_S[item.mes] : MONTHS[item.mes]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WidgetTime;
