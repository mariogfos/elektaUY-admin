"use client";
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Contents.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import RenderItem from "../shared/RenderItem";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import {
  IconComment,
  IconDocs,
  IconDownload,
  IconImage,
  IconLike,
  IconYoutube,
} from "@/components/layout/icons/IconsBiblioteca";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import Check from "@/mk/components/forms/Check/Check";
import RenderView from "./RenderView";
import { getDateTimeStrMesShort } from "@/mk/utils/date";
import ImportDataModal from "@/mk/components/data/ImportDataModal/ImportDataModal";
import { formatNumber } from "@/mk/utils/numbers";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import { useAuth } from "@/mk/contexts/AuthProvider";
import Button from "@/mk/components/forms/Button/Button";
import AddContent from "./AddContent/AddContent";
import { get } from "http";

const paramsInitial = {
  perPage: 10,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const isType = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  if (data.key == "url" && data.item.type == "V") return false;
  if (data.key == "avatar" && data.item.type == "I") return false;
  if (data.key == "file" && data.item.type == "D") return false;
  return true;
};

const lType = [
  { id: "I", name: "Imagen", ext: "png,jpg,jpeg,svg" },
  { id: "V", name: "Video", ext: "mp4" },
  { id: "D", name: "Documento", ext: "pdf,doc,docx" },
];

const lDestinies = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  const level = data.user?.role.level;
  const r = [];
  if (level == 1 || level == 0) {
    r.push({ id: 0, name: "Todos" });
  }
  if (level == 2) r.push({ id: 0, name: "Mi lista" });
  if (level == 3) r.push({ id: 0, name: "Mi departamento" });
  if (level == 4) r.push({ id: 0, name: "Mi municipio" });
  // if (level == 4) r.push({ id: 0, name: "Mi localidad" });
  if (level == 5) r.push({ id: 0, name: "Mi barrio" });

  if (level <= 1) r.push({ id: 2, name: "Lista" });
  if (level <= 2) r.push({ id: 3, name: "Departamento" });
  if (level <= 3) r.push({ id: 4, name: "Municipo" });
  // if (level <= 4) r.push({ id: 5, name: "Localidad" });
  // if (level <= 5) r.push({ id: 5, name: "Barrio" });
  return r;
};

const rigthFile = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  if (!data.item.url) return null;
  return (
    <IconDownload
      size={40}
      color={"white"}
      onClick={() => {
        window.open(
          getUrlImages(
            "/CONT-" +
              data.item.id +
              "." +
              data.item.url +
              "?" +
              data.item.updated_at
          ),
          "_blank"
        );
      }}
    />
  );
};

const Contents = () => {
  const mod: ModCrudType = {
    modulo: "contents",
    singular: "publicación",
    plural: "Publicaciones",
    permiso: "contents",
    // import: true,
    extraData: true,
    saveMsg: {
      add: "Publicación creada con éxito",
      edit: "Publicación actualizada con éxito",
      del: "Publicación eliminada con éxito",
    },
    renderView: (props: {
      open: boolean;
      onClose: any;
      item: Record<string, any>;
      onConfirm?: Function;
      extraData: any;
    }) => <RenderView {...props} />,
    loadView: { fullType: "DET" },
    // hideActions: { add: true },
    // buttonExtra: (
    //   <Button onClick={() => (window.location.href = "/addContent")}>
    //     Crear noticia
    //   </Button>
    // ),
    renderForm: (props: {
      item: any;
      setItem: any;
      errors: any;
      extraData: any;
      open: boolean;
      onClose: any;
      user: any;
      execute: any;
      setErrors: any;
      action: any;
      openList: any;
      setOpenList: any;
    }) => {
      return (
        <AddContent
          onClose={props.onClose}
          open={props.open}
          item={props.item}
          setItem={props.setItem}
          errors={props.errors}
          extraData={props.extraData}
          user={props.user}
          execute={props.execute}
          setErrors={props.setErrors}
          reLoad={reLoad}
          action={props.action}
          openList={props.openList}
          setOpenList={props.setOpenList}
        />
      );
    },
  };
  const onTop = (data: {
    user?: Record<string, any>;
    item: Record<string, any>;
    extraData: any;
    action: any;
  }) => {
    const extraData = data?.extraData;
    if (data?.item?.destiny == 0) {
      return;
    }
    let selDestinies = [];
    if (data?.item?.destiny == 2) selDestinies = extraData.listas;
    if (data?.item?.destiny == 3) selDestinies = extraData.dptos;
    if (data?.item?.destiny == 4) selDestinies = extraData.muns;
    // if (data?.item?.destiny == 4) selDestinies = extraData.locals;
    if (data?.item?.destiny == 5) selDestinies = extraData.barrios;
    let lDestinies: any = data?.item?.lDestiny || [];
    // let dataDestinies =
    //   data?.action == "edit" ? data?.item?.cdestinies : data?.item?.lDestiny;
    if (data?.action == "edit" && !data?.item?.lDestiny) {
      data?.item?.cdestinies?.map((d: any) => {
        if (data?.item?.destiny == 2) {
          lDestinies.push(d.lista_id);
        }
        if (data?.item?.destiny == 3) {
          lDestinies.push(d.dpto_id);
        }
        if (data?.item?.destiny == 4) {
          lDestinies.push(d.mun_id);
        }
        if (data?.item?.destiny == 5) {
          lDestinies.push(d.barrio_id);
        }
        // if (data?.item?.destiny == 5) {
        //   lDestinies.push(d.local_id);
        // }
      });
    }

    return (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {selDestinies
          ?.filter((d: any) => lDestinies?.includes(d.id))
          .map((d: any, index: number, array: any[]) => (
            <p
              key={d.id}
              // className={styles.subtitle}
              style={{ color: "var(--cInfo)", marginTop: 4 }}
            >
              {d.name}
              {index < array.length - 1 ? "," : ""}
            </p>
          ))}
      </div>
    );
  };
  const { user } = useAuth();
  const fields = useMemo(
    () => ({
      id: { rules: [], api: "e" },
      destiny: {
        rules: ["required"],
        api: "ae",
        label: "Destino",
        list: {
          width: "100px",
          onRender: (item: any) => {
            let destinys = [
              "",
              "",
              "Organización",
              "Departamento",
              "Municipio",
            ];
            if (item?.item?.destiny == 0 || item?.item?.destiny == 1) {
              return "Todos";
            }
            if (user?.role.level == 3 && item?.item?.destiny == 2) {
              return "Mi organización";
            }
            if (user?.role.level == 3 && item?.item?.destiny == 3) {
              return "Mi departamento";
            }
            if (user?.role.level == 4 && item?.item?.destiny == 4) {
              return "Mi municipio";
            }
            // if (user?.role.level == 4 && item?.item?.destiny == 4) {
            //   return "Mi localidad";
            // }
            if (user?.role.level == 5 && item?.item?.destiny == 5) {
              return "Mi barrio";
            }
            return destinys[item?.item?.destiny];
          },
        },
        form: {
          type: "select",
          options: lDestinies,
          // onLeft: leftDestiny,
          onTop: onTop,
          precarga: 0,
        },
      },
      lDestiny: {
        rules: [],
        api: "ae",
        label: "",
        list: false,
        form: false,
      },
      candidate_id: {
        rules: ["required"],
        api: "ae",
        label: "Candidato",
        list: {
          width: "250px",
          // optionsExtra: "candidates",
          options: ({ extraData }: any) => {
            let data: any = [];
            extraData?.candidates?.map((c: any) => {
              data.push({
                id: c.id,
                name: getFullName(c),
                img: getUrlImages("/CAND-" + c.id + ".webp?" + c.updated_at),
              });
            });
            return data;
          },
          // options: ({ extraData }: any) => {
          //   console.log(extraData);
          // },
        },
        form: {
          type: "select",
          filter: true,
          options: ({ extraData, item }: any) => {
            let data: any = [];
            extraData?.candidates.map((c: any) => {
              if (c.status == "A") {
                data.push({
                  img: getUrlImages("/CAND-" + c.id + ".webp?" + c.updated_at),
                  id: c.id,
                  name:
                    getFullName(c) +
                    " - " +
                    extraData?.typeCands.find((t: any) => t.id == c.typecand_id)
                      ?.name,
                });
              }
            });
            return data;
          },
        },
      },
      type: {
        rules: ["required"],
        api: "ae",
        label: "Tipo",
        list: { width: "100px" },
        form: {
          type: "select",
          options: lType,
          // precarga: "I"
        },
      },
      title: {
        rules: [""],
        api: "ae",
        label: "Titulo",
        list: false,
        form: { type: "text" },
      },
      description: {
        rules: ["required"],
        api: "ae",
        label: "¿Qué deseas publicar hoy?",
        list: true,
        form: { type: "textArea", lines: 6, isLimit: true, maxLength: 5000 },
      },
      reaction: {
        api: "ae",
        label: "Interacciones",
        list: { width: "120px" },
        onHide: isType,
        form: {},
        onRender: (item: any) => {
          return (
            <div
              style={{ display: "flex", alignItems: "center", fontSize: 14 }}
            >
              <IconLike color={"var(--cInfo)"} size={24} />
              {formatNumber(item?.item?.likes, 0)} <IconComment size={24} />
              {formatNumber(item?.item?.comments_count, 0)}
            </div>
          );
        },
      },
      url: {
        rules: ["requiredIf:type,V"],
        api: "a*e*",
        label: "Link del video",
        list: false,
        onHide: isType,
        form: { type: "text" },
      },
      avatar: {
        // rules: ["requiredFileIf:type,I*add"],
        api: "a*e*",
        label: "Suba una imagen",
        list: false,
        onHide: isType,
        form: {
          type: "imageUploadMultiple",
          prefix: "CONT",
          maxFiles: 10,
          images: "images",
          // onRigth: rigthAvatar,
          style: { width: "100%" },
        },
      },
      file: {
        rules: ["requiredFileIf:type,D"],
        api: "a*e*",
        label: "Suba un Documento",
        list: false,
        onHide: isType,
        form: {
          type: "fileUpload",
          onRigth: rigthFile,
          style: { width: "100%" },
        },
      },
    }),
    []
  );

  const _onChange = (
    e: any,
    item: any,
    setItem: Function,
    setShowExtraModal: Function,
    action: any
  ) => {
    const { name, value } = e.target;
    let selDestinies: any = [];
    if (name.indexOf("destiny_") == 0) {
      const id = parseInt(name.replace("destiny_", ""));
      if (value) {
        setItem({
          ...item,
          lDestiny: [...item.lDestiny, id],
        });
      } else {
        setItem({
          ...item,
          lDestiny: item.lDestiny.filter((d: number) => d != id),
        });
      }

      return true;
    }
    // console.log(action);
    let lDestiny = item.lDestiny || [];
    if (action == "edit") {
      item?.cdestinies?.map((d: any) => {
        if (item?.destiny == 2) {
          lDestiny.push(d.lista_id);
        }
        if (item?.destiny == 3) {
          lDestiny.push(d.dpto_id);
        }
        if (item?.destiny == 4) {
          lDestiny.push(d.mun_id);
        }
        if (item?.destiny == 5) {
          lDestiny.push(d.barrio_id);
        }
        // if (item?.destiny == 4) {
        //   lDestiny.push(d.local_id);
        // }
      });
    }
    if (name == "destiny") {
      selDestinies = null;
      if (value == 2) selDestinies = extraData.listas;
      if (value == 3) selDestinies = extraData.dptos;
      if (value == 4) selDestinies = extraData.muns;
      // if (value == 4) selDestinies = extraData.locals;
      // if (value == 5) selDestinies = extraData.barrios;

      if (value != item.destiny) {
        setItem({ ...item, lDestiny: [] });
        lDestiny = [];
      }

      if (selDestinies)
        setShowExtraModal(
          <ModalDestiny
            item={{ ...item, destiny: value, lDestiny: lDestiny }}
            setItem={setItem}
            selDestinies={selDestinies}
            setShowExtraModal={setShowExtraModal}
          />
        );
      else setShowExtraModal(null);
    }
    return false;
  };

  const ModalDestiny = ({
    item,
    setItem,
    selDestinies,
    setShowExtraModal,
  }: {
    item: any;
    setItem: Function;
    selDestinies: any;
    setShowExtraModal: Function;
  }) => {
    const [openDestiny, setOpenDestiny] = useState(true);
    const [sel, setSel]: any = useState([]);
    const [destiniesFiltered, setDestiniesFiltered]: any = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
      setSel(item?.lDestiny || []);
    }, [item]);

    const setOnSearch = (e: any) => {
      setSearch(e);
    };
    const normalizeText = (text: string) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();

    useEffect(() => {
      if (search == "") {
        setDestiniesFiltered(selDestinies);
        return;
      }
      const filtered = selDestinies.filter((d: any) =>
        normalizeText(d.name).includes(normalizeText(search))
      );
      setDestiniesFiltered(filtered);
    }, [search]);

    const _onSave = () => {
      if (sel <= 0) {
        showToast("Debe seleccionar al menos un destino", "error");
        return;
      }
      setItem((old: any) => ({ ...old, lDestiny: sel }));
      setShowExtraModal(null);
      setOpenDestiny(false);
    };
    const _onClose = () => {
      if (item?.destiny && item?.lDestiny?.length <= 0) {
        setItem((old: any) => ({ ...old, destiny: null }));
      }
      setOpenDestiny(false);
      setShowExtraModal(null);
    };
    return (
      <DataModal
        title="Destino"
        open={openDestiny}
        onClose={_onClose}
        onSave={() => {
          _onSave();
        }}
      >
        {/* <Check
          key={"check0"}
          name={"destiny_0"}
          label="Todos"
          checked={sel.length == 0}
          onChange={(e: any) => {
            const { name, checked } = e.target;
            if (checked) {
              setSel([]);
            }
          }}
          value={0}
          optionValue={["0", "N"]}
        /> */}
        <DataSearch
          name="searchDestiny"
          setSearch={setOnSearch}
          value={search}
        />
        {destiniesFiltered.map((d: any, i: number) => (
          <Check
            key={"check" + i}
            name={"destiny_" + d.id}
            label={d.name}
            checked={sel.includes(d.id)}
            reverse
            onChange={(e: any) => {
              const { name, checked } = e.target;
              const id: any = parseInt(name.replace("destiny_", ""));

              const il: any = sel?.filter((d: number) => d != id) || [];
              if (checked) {
                il.push(d.id);
              }
              setSel(il);
            }}
            value={d.id}
            optionValue={[d.id, "N"]}
          />
        ))}
      </DataModal>
    );
  };

  const onImport = () => {
    setOpenImport(true);
  };

  const {
    userCan,
    List,
    setStore,
    onSearch,
    searchs,
    onEdit,
    onDel,
    extraData,
    showToast,
    execute,
    reLoad,
    getExtraData,
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    _onChange,
    _onImport: onImport,
  });
  const { onLongPress, selItem, searchState, setSearchState } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
    title: "Publicaciones",
  });

  const [openImport, setOpenImport] = useState(false);
  useEffect(() => {
    setOpenImport(searchState == 3);
  }, [searchState]);

  const renderItem = (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => {
    let icon = <IconImage size={48} circle color="var(--cWhite)" />;
    if (item.type == "D")
      icon = <IconDocs size={48} circle color="var(--cWhite)" />;
    if (item.type == "V")
      icon = <IconYoutube size={48} circle color="var(--cWhite" />;

    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <ItemList
          title={item?.description.substring(0, 80) + "..."}
          subtitle={
            "Creado por: " +
            getFullName(item.user) +
            ", en Fecha: " +
            getDateTimeStrMesShort(item.created_at)
          }
          variant="V1"
          active={selItem && selItem.id == item.id}
          left={icon}
        />
      </RenderItem>
    );
  };
  // const onResponse = async () => {
  //   // const { data } = await execute("/optimizeImages", "POST", {});
  //   const { data } = await execute("/contents-automatic", "POST", {});
  //   if (data?.success) {
  //     showToast("success", "Se han enviado las encuestas");
  //     console.log("data", data);
  //   } else {
  //     showToast("error", "No se han podido enviar las encuestas");
  //   }
  // };
  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.roles}>
      {/* <IconLike onClick={() => onResponse()} /> */}
      <List onTabletRow={renderItem} actionsWidth="140px" />
      {openImport && (
        <ImportDataModal
          open={openImport}
          onClose={() => {
            setSearchState(0);
            setOpenImport(false);
          }}
          mod={mod}
          showToast={showToast}
          reLoad={reLoad}
          execute={execute}
          getExtraData={getExtraData}
          // requiredCols="DEPARTAMENTO, HABITANTES, HABILITADOS, ESCANOS, CODE"
        />
      )}
    </div>
  );
};

export default Contents;
