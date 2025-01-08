"use client";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import {
  IconSearch,
  IconX,
} from "../../../../components/layout/icons/IconsBiblioteca";
import Button from "../Button/Button";
import styles from "./dataSearch.module.css";
import { PropsTypeInputBase } from "../ControlLabel";

interface PropsType extends PropsTypeInputBase {
  setSearch: Function;
  textButton?: string;
}

const DataSearch = ({
  setSearch,
  name,
  value,
  label = "",
  textButton = "Buscar",
  className = "",
}: PropsType) => {
  const [searchBy, setSearchBy] = useState("");
  const [oldSearch, setOldSearch] = useState("");

  const onSearch = (v: any = false) => {
    let s = searchBy.trim();
    if (v !== false) {
      s = v.trim();
      setSearchBy(s);
    }

    if (s == oldSearch) return;

    setSearch(s);
    setOldSearch(s);
  };

  const onChange = (e: any) => {
    setSearchBy(e.target.value);
  };

  useEffect(() => {
    setSearchBy(value);
    setOldSearch(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Input
      name={name}
      className={styles.dataSearch + " " + className}
      required={false}
      label={label}
      placeholder="Buscar"
      onKeyDown={handleKeyDown}
      value={searchBy}
      style={{ backgroundColor: "var(--cBlackV1" }}
      onChange={onChange}
      iconLeft={
        !value ? (
          <IconSearch
            size={16}
            color={"var(--cBlackV2)"}
            style={{ marginRight: "var(--spS)" }}
          />
        ) : (
          <IconX
            onClick={() => onSearch("")}
            color={"var(--cBlackV2)"}
            className="error"
          />
        )
      }
      iconRight={
        searchBy && (
          <Button variant="primary" onClick={() => onSearch()}>
            {textButton}
          </Button>
        )
      }
    />
  );
};

export default DataSearch;
