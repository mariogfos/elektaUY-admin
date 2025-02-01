import React from "react";
type PropsType = {
  state: string;
};

const StateLabel = ({ state }: PropsType) => {
  const stateText: any = {
    P: "Pendiente",
    E: "En proceso",
    F: "Finalizado",
    C: "Cancelado",
  };
  const color: any = {
    P: "var(--cBlackV2)",
    E: "green",
    F: "gray",
    C: "red",
  };
  return (
    <p
      // font-size: 12px;
      // font-weight: 500;
      // padding: 4px 8px;
      // color: var(--cWhiteV1);
      // background-color: var(--cBlackV2);
      // border-radius: 50px;
      style={{
        backgroundColor: color[state],
        borderRadius: "50px",
        color: "var(--cWhiteV1)",
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 8px",
      }}
    >
      {stateText[state]}
    </p>
  );
};

export default StateLabel;
