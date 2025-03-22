/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import styles from "./Support.module.css";
import RenderItem from "../shared/RenderItem";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import NotAccess from "@/components/layout/NotAccess/NotAccess";
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import RenderView from "./RenderView/RenderView";
// import { useAuth } from "@/mk/contexts/AuthProvider";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import RenderForm from "./RenderForm/RenderForm";

// import Pagination from "@/mk/components/ui/Pagination/Pagination";

const paramsInitial = {
  // perPage: 20,
  // page: 1,
  // fullType: "L",
  searchBy: "",
};

const Support = () => {
  // const { user } = useAuth();

  const mod: ModCrudType = {
    modulo: "tickets-list",
    singular: "ticket",
    plural: "tickets",
    permiso: "",
    renderView: (props: {
      open: boolean;
      onClose: any;
      item: Record<string, any>;
      onConfirm?: Function;
      extraData?: Record<string, any>;
      openList: any;
      setOpenList: any;
    }) => <RenderView {...props} />,
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
        <RenderForm
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
    extraData: true,
    // hideActions: { add: true, edit: true, del: true },
    loadView: { key_id: "affiliate_id" },

    // onHideActions: (item: any) => {
    //   return {
    //     hideEdit: validate(item, user) || user.id == item.id,

    //     hideDel: validate(item, user) || user.id == item.id,
    //   };
    // },
  };

  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },

      // fullName: {
      //   // rules: ["required"],
      //   api: "ae",
      //   label: "Nombre del afiliado",
      //   form: false,
      //   onRender: ({ item, extraData }: any) => {
      //     let entidad = "";
      //     if (user?.role?.level == 1) {
      //       entidad =
      //         "Departamento - " +
      //         extraData?.dptos?.find((dpto: any) => dpto?.id == item?.dpto_id)
      //           ?.name;
      //     }
      //     if (user?.role?.level == 2) {
      //       entidad =
      //         "Municipio - " +
      //         extraData?.muns?.find((mun: any) => mun?.id == item?.mun_id)
      //           ?.name;
      //     }
      //     if (user?.role?.level == 3) {
      //       entidad =
      //         "localidad - " +
      //         extraData?.locals?.find((lo: any) => lo?.id == item?.local_id)
      //           ?.name;
      //     }
      //     if (user?.role?.level == 4) {
      //       entidad =
      //         "Barrio - " +
      //         extraData?.barrios?.find((ba: any) => ba?.id == item?.barrio_id)
      //           ?.name;
      //     }
      //     if (user?.role?.level == 5) {
      //       entidad = "";
      //     }
      //     return (
      //       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      //         <Avatar
      //           src={getUrlImages(
      //             "/AFF-" + item?.affiliate_id + ".webp?d=" + item?.updated_at
      //           )}
      //           name={getFullName(item)}
      //         />
      //         <p>
      //           {getFullName(item)}
      //           <br />
      //           {entidad.includes("undefined") ? (
      //             ""
      //           ) : (
      //             <p style={{ marginTop: 4 }}>{entidad}</p>
      //           )}
      //         </p>
      //       </div>
      //     );
      //   },
      //   list: true,
      // },
      ticket: {
        rules: ["required"],
        api: "ae",
        label: "Ticket",
        form: { type: "text" },
        list: {
          width: 200,
        },
      },
      created_at: {
        rules: ["required"],
        api: "ae",
        label: "Fecha de creación",
        form: { type: "text" },
        list: {
          width: 200,
        },
      },

      title: {
        rules: ["required"],
        api: "ae",
        label: "Título",
        form: {
          type: "text",
        },
        list: {},
      },
      category_id: {
        rules: [""],
        api: "ae",
        label: " Módulo afectado",
        form: { type: "text" },
        list: {},
      },

      status: {
        rules: [""],
        api: "ae",
        label: "Estado",
        form: { type: "text" },
        list: {
          width: 150,
        },
      },
    };
  }, []);

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
    showToast,
    // extraData,
    execute,
    data,
    params,
    user,
    setParams,
    reLoad,
    getExtraData,
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    _onImport: onImport,
  });
  const { onLongPress, selItem, searchState, setSearchState } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
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
    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <ItemList
          title={item?.name}
          subtitle={item?.description}
          variant="V1"
          active={selItem && selItem.id == item.id}
        />
      </RenderItem>
    );
  };
  // const onChangePage = (page: any) => {
  //   setParams({ ...params, page });
  // };

  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.affiliates}>
      <List onTabletRow={renderItem} />
    </div>
  );
};

export default Support;
