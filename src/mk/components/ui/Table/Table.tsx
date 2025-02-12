"use client";
import {
  CSSProperties,
  Fragment,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { formatNumber } from "@/mk/utils/numbers";
import useScrollbarWidth from "@/mk/hooks/useScrollbarWidth";

export type RenderColType = {
  value: any;
  key?: number;
  row?: Record<string, any>;
  i?: number;
  extraData?: any;
};

type PropsType = {
  header?: {
    key: string;
    responsive: string;
    label: string;
    width?: string;
    className?: string;
    onRender?: Function;
    style?: any;
    sumarize?: number | boolean;
    sumDec?: number;
    sortabled?: boolean;
  }[];
  data: any;
  footer?: any;
  sumarize?: boolean;
  onRenderBody?: null | ((row: any, i: number) => any);
  onRenderHead?: null | ((item: any, row: any) => any);
  onRenderFoot?: null | ((item: any, row: any) => any);
  onRowClick?: (e: any) => void;
  onTabletRow?: (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => any;
  onButtonActions?: Function;
  actionsWidth?: string;
  style?: CSSProperties;
  className?: string;
  height?: string;
  showHeader?: boolean;
  extraData?: any;
  sortCol?: { col: string; asc: boolean };
  onSort?: (col: string, asc: boolean) => void;
  onRenderCard?: (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => any;
};

const getWidth = (width: any) => {
  if (!width || width == "" || width == "100%") return { flex: "1" };
  width = ("" + width).replace("px", "");
  return {
    flex: `0 0 ${width}px`,
    width: `${width}px`,
  };
};

const Table = ({
  header = [],
  data,
  footer,
  sumarize = false,
  onRenderBody = null,
  onRenderHead = null,
  onRenderFoot = null,
  onRowClick = (e) => {},
  onTabletRow,
  onButtonActions,
  onRenderCard,
  actionsWidth,
  style = {},
  className = "",
  height,
  showHeader = true,
  extraData = null,
  sortCol,
  onSort,
}: PropsType) => {
  const { isMobile } = useScreenSize();
  const [scrollbarWidth, setScrollbarWidth] = useState();
  return (
    <div
      className={styles.table + " " + styles[className] + " " + className}
      style={style}
    >
      {(!isMobile || !onTabletRow) && showHeader && !onRenderCard && (
        <Head
          header={header}
          actionsWidth={actionsWidth}
          onRenderHead={onRenderHead}
          onButtonActions={onButtonActions}
          scrollbarWidth={scrollbarWidth}
          extraData={extraData}
          sortCol={sortCol}
          onSort={onSort}
        />
      )}
      <div style={height ? { height: height, overflowY: "auto" } : {}}>
        <Body
          onTabletRow={onTabletRow}
          onRenderCard={onRenderCard}
          onRowClick={onRowClick}
          data={data}
          header={header}
          actionsWidth={actionsWidth}
          renderBody={onRenderBody}
          onButtonActions={onButtonActions}
          height={height}
          setScrollbarWidth={setScrollbarWidth}
          onRenderBody={onRenderBody}
          extraData={extraData}
        />
      </div>
      {sumarize && (
        <Sumarize
          header={header}
          data={data}
          actionsWidth={actionsWidth}
          onRenderFoot={onRenderFoot}
          onButtonActions={onButtonActions}
          scrollbarWidth={scrollbarWidth}
          extraData={extraData}
        />
      )}
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

const Head = memo(function Head({
  header,
  actionsWidth,
  onRenderHead,
  onButtonActions,
  scrollbarWidth,
  extraData,
  onSort,
  sortCol,
}: {
  header: any;
  actionsWidth: any;
  onRenderHead?: any;
  onButtonActions: any;
  scrollbarWidth?: number;
  extraData?: any;
  onSort?: (col: string, asc: boolean) => void;
  sortCol?: { col: string; asc: boolean };
}) {
  if (onRenderHead === false) return null;
  const renderLabelTitle = (
    item: any,
    index: number,
    onSort: any,
    sortCol: any
  ) => {
    if (!item.sortabled) return item.label;

    return (
      <span
        onClick={() => {
          if (item.sortabled) {
            if (sortCol?.col === item.key) {
              onSort?.(item.key, !sortCol.asc);
            } else {
              onSort?.(item.key, true);
            }
          }
        }}
      >
        {item.sortabled && sortCol?.col === item.key && (
          <>
            <span>{sortCol.asc ? "▲" : "▼"}</span>{" "}
          </>
        )}
        {item.sortabled && sortCol?.col !== item.key && (
          <>
            <span style={{ opacity: 0.1 }}>{sortCol?.asc ? "▲" : "▼"}</span>{" "}
          </>
        )}
        {item.label}
      </span>
    );
  };
  return (
    <header style={{ width: `calc(100% - ${scrollbarWidth || 0}px)` }}>
      {header.map((item: any, index: number) => (
        <div
          key={"th" + index}
          className={styles[item.responsive] + " " + item.className}
          style={{
            ...item.style,
            overflow: "hidden",
            ...getWidth(item.width),
          }}
          title={
            onRenderHead
              ? onRenderHead(item, index, onSort, sortCol, true)
              : item.label
          }
        >
          {onRenderHead
            ? onRenderHead(item, index, onSort, sortCol)
            : renderLabelTitle(item, index, onSort, sortCol)}
        </div>
      ))}

      {onButtonActions && (
        <div className={styles.onlyDesktop} style={{ ...getWidth("100") }}>
          Acciones
        </div>
      )}
    </header>
  );
});

const Sumarize = memo(function Sumarize({
  header,
  data,
  actionsWidth = "100%",
  onRenderFoot = null,
  onButtonActions = false,
  scrollbarWidth,
  extraData,
}: {
  header: any;
  data: any;
  actionsWidth?: any;
  onRenderFoot?: Function | null;
  onButtonActions?: any;
  scrollbarWidth?: number;
  extraData?: any;
}) {
  // const { store } = useStore();
  const [sumas, setSumas]: any = useState({});
  const onSumarize = (item: any, row: any, i: number) => {
    if (item.sumarize) {
      setSumas((prev: any) => ({
        ...prev,
        [item.key]: (prev[item.key] || 0) + row[item.key] * 1,
      }));
    }
    return true;
  };
  useEffect(() => {
    if (!data || !header) return;
    setSumas({});
    data.map((item: any, i: number) => {
      header.map((h: any) => onSumarize(h, item, i));
    });
  }, [data]);

  return (
    <summary style={{ width: `calc(100% - ${scrollbarWidth || 0}px)` }}>
      {header.map((item: any, index: number) => (
        <div
          key={"foot" + index}
          className={styles[item.responsive] + " " + item.className}
          style={{
            ...item.style,
            ...getWidth(item.width),
          }}
        >
          {item.onRenderFoot ? (
            <span>{item.onRenderFoot(item, index, sumas)}</span>
          ) : item.sumarize ? (
            <div>{formatNumber(sumas[item.key], item.sumDec || 0)}</div>
          ) : (
            ""
          )}
        </div>
      ))}

      {onButtonActions && (
        <div className={styles.onlyDesktop} style={{ ...getWidth("100") }}>
          {" "}
        </div>
      )}
    </summary>
  );
});

const Body = memo(function Body({
  onTabletRow,
  onRowClick,
  data,
  header,
  actionsWidth,
  renderBody,
  onButtonActions,
  height,
  setScrollbarWidth,
  onRenderBody,
  extraData,
  onRenderCard,
}: {
  onTabletRow: any;
  onRowClick: any;
  data: any;
  header: any;
  actionsWidth: any;
  renderBody: any;
  onButtonActions: any;
  height?: any;
  setScrollbarWidth?: Function;
  onRenderBody?: null | ((row: any, i: number) => any);
  extraData?: any;
  onRenderCard?: any;
}) {
  const { isMobile } = useScreenSize();
  const divRef = useRef(null);
  const scrollWidth = useScrollbarWidth(divRef);
  useEffect(() => {
    if (setScrollbarWidth) setScrollbarWidth(scrollWidth);
  }, [scrollWidth]);
  return (
    <main
      ref={divRef}
      style={
        height
          ? { height: height, overflowY: "auto" }
          : {
              display: onRenderCard ? "grid" : "flex",
              flexDirection: onRenderCard ? "row" : "column",
              gridTemplateColumns: onRenderCard ? "1fr 1fr 1fr 1fr 1fr" : "",
              gap: onRenderCard ? "16px" : "0px",
              // border: onRenderCard ? "none" : "",
            }
      }
    >
      {data?.map((row: Record<string, any>, index: number) => (
        <Fragment key={"r_" + index}>
          {isMobile && onTabletRow ? (
            onTabletRow(row, index, onRowClick)
          ) : onRenderBody ? (
            <div key={"row" + index} onClick={(e) => onRowClick(row)}>
              {renderBody?.(row, index + 1)}
            </div>
          ) : onRenderCard ? (
            onRenderCard(row, index, onRowClick)
          ) : (
            <div key={"row" + index} onClick={(e) => onRowClick(row)}>
              {header.map((item: any, i: number) => (
                <span
                  key={item.key + i}
                  className={styles[item.responsive] + " " + item.className}
                  style={{
                    ...item.style,
                    ...getWidth(item.width),
                  }}
                >
                  {item.onRender &&
                    item.onRender?.({
                      value: row[item.key],
                      key: item.key,
                      item: row,
                      i: index + 1,
                      extraData,
                    })}
                  {!item.onRender && row[item.key]}
                </span>
              ))}
              {onButtonActions && (
                <span
                  className={styles.onlyDesktop}
                  style={{ ...getWidth("100") }}
                >
                  {onButtonActions(row)}
                </span>
              )}
            </div>
          )}
        </Fragment>
      ))}
    </main>
  );
});

export default Table;
