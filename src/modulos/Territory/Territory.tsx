"use client";
import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import React, { useState } from "react";
import Sublemas from "../Sublemas/Sublemas";
import Listas from "../Listas/Listas";
import Locals from "../Locals/Locals";
import Dptos from "../Dptos/Dptos";
import Barrios from "../Barrios/Barrios";

const Territory = () => {
  const [typeSearch, setTypeSearch] = useState("S");
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TabsButtons
          tabs={[
            { value: "S", text: "Sublemas" },
            { value: "L", text: "Listas" },
            { value: "D", text: "Departamentos" },
            { value: "O", text: "Localidades" },
            { value: "B", text: "Barrios" },
            // { value: "A", text: "Afiliados" },
          ]}
          sel={typeSearch}
          setSel={setTypeSearch}
        />
      </div>
      {typeSearch === "S" && <Sublemas />}
      {typeSearch === "L" && <Listas />}
      {typeSearch === "D" && <Dptos />}
      {typeSearch === "O" && <Locals />}
      {typeSearch === "B" && <Barrios />}
      {/* {typeSearch === "A" && <Afiliados />} */}
      {/* {typeSearch === "C" && <Candidates />} */}
    </div>
  );
};

export default Territory;
