"use client";
import React, { useEffect, useState } from "react";
import styles from "./AddContent.module.css";
import { useAuth } from "@/mk/contexts/AuthProvider";
import { IconArrowLeft } from "@/components/layout/icons/IconsBiblioteca";
import { useRouter } from "next/navigation";
import useAxios from "@/mk/hooks/useAxios";
import { Card } from "@/mk/components/ui/Card/Card";
import Select from "@/mk/components/forms/Select/Select";
import { getFullName } from "@/mk/utils/string";
import Radio from "@/mk/components/forms/Ratio/Radio";
import Input from "@/mk/components/forms/Input/Input";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import CardContent from "./CardContent";
import Button from "@/mk/components/forms/Button/Button";
import Preview from "./Preview";
import ModalDestiny from "./ModalDestiny";
import UploadFileMultiple from "@/mk/components/forms/UploadFile/UploadFileMultiple";
import { checkRules, hasErrors } from "@/mk/utils/validate/Rules";

const AddContent = ({
  onClose,
  open,
  item,
  setItem,
  errors,
  extraData,
  user,
  execute,
  setErrors,
  reLoad,
  action,
}: any) => {
  const { store, setStore, showToast } = useAuth();
  // const [errors, setErrors] = useState({});
  const [ldestinys, setLdestinys]: any = useState([]);
  const [openDestiny, setOpenDestiny] = useState(false);
  const [formState, setFormState]: any = useState({ ...item, type: "N" });
  // const { data: extraData, execute } = useAxios("/contents", "GET", {
  //   fullType: "EXTRA",
  // });

  const handleChangeInput = (e: any) => {
    let value = e.target.value;
    if (e.target.type == "checkbox") {
      value = e.target.checked ? "Y" : "N";
    }
    setFormState({ ...formState, [e.target.name]: value });
    if (e.target.name == "destiny" && value > 0) {
      setOpenDestiny(true);
      if (formState.destiny != value) {
        setFormState({
          ...formState,
          lDestiny: [],
          [e.target.name]: value,
        });
      }
    } else if (e.target.name == "destiny" && value == 0) {
      setFormState({
        ...formState,
        lDestiny: null,
        [e.target.name]: value,
      });
    }
  };
  const getCandidates = () => {
    let data: any = [];
    extraData?.candidates.map((c: any) => {
      if (c.status == "A") {
        data.push({
          id: c.id,
          name:
            getFullName(c) +
            " - " +
            extraData?.typeCands.find((t: any) => t.id == c.typecand_id)?.name,
        });
      }
    });
    return data;
  };
  const lDestinies = () => {
    const level = user?.role.level;
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
  const selDestinies = (value: any) => {
    let selDestinies = [];
    if (value == 2) selDestinies = extraData?.listas;
    if (value == 3) selDestinies = extraData?.dptos;
    if (value == 4) selDestinies = extraData?.muns;
    // if (value == 5) selDestinies = extraData.barrios;

    return selDestinies;
  };

  useEffect(() => {
    let lDestinies: any = formState.lDestiny || [];
    if (action == "edit" && !formState.lDestiny) {
      formState?.cdestinies?.map((d: any) => {
        if (formState?.destiny == 2) {
          lDestinies.push(d.lista_id);
        }
        if (formState?.destiny == 3) {
          lDestinies.push(d.dpto_id);
        }
        if (formState?.destiny == 4) {
          lDestinies.push(d.mun_id);
        }
        if (formState?.destiny == 5) {
          lDestinies.push(d.barrio_id);
        }
      });
    }
    setLdestinys(lDestinies);
  }, [action, formState.lDestiny]);

  console.log(formState);

  const getDestinysNames = () => {
    let des: any = [];
    selDestinies(formState?.destiny)
      .filter((d: any) => ldestinys?.includes(d.id))
      .map((d: any) => des.push(d.name));
    return des;
  };

  const validate = (field: any = "") => {
    let errors: any = {};

    errors = checkRules({
      value: formState?.destiny,
      rules: ["required"],
      key: "destiny",
      errors,
    });
    errors = checkRules({
      value: formState?.candidate_id,
      rules: ["required"],
      key: "candidate_id",
      errors,
    });
    if (formState?.type == "N") {
      errors = checkRules({
        value: formState?.title,
        rules: ["required"],
        key: "title",
        errors,
      });
      // errors = checkRules({
      //   value: formState?.avatar,
      //   rules: ["required"],
      //   key: "avatar",
      //   errors,
      // });
    }
    errors = checkRules({
      value: formState?.description,
      rules: ["required"],
      key: "description",
      errors,
    });

    setErrors(errors);
    return errors;
  };

  const onSave = async () => {
    if (hasErrors(validate())) return;
    let method = formState.id ? "PUT" : "POST";
    const { data } = await execute(
      "/contents" + (formState.id ? "/" + formState.id : ""),
      method,
      {
        candidate_id: formState.candidate_id,
        lDestiny: ldestinys,
        destiny: formState.destiny,
        // affCount: formState.affCount,
        title: formState.title,
        description: formState.description,
        avatar: formState.avatar,
        type: "I",
      }
    );

    if (data?.success == true) {
      onClose();
      reLoad();
      showToast(data.message, "success");
    } else {
      showToast(data.message, "error");
    }
  };

  useEffect(() => {
    if (formState?.type == "P") {
      setFormState({ ...formState, title: null });
    }
  }, [formState?.type]);

  // console.log(formState);
  // console.log(errors);

  return (
    open && (
      <div className={styles.AddContent}>
        <div className={styles.containerForm}>
          <div>
            <p onClick={() => onClose()}>Volver</p>
            <IconArrowLeft />
            <p>Crear nueva publicacion</p>
          </div>
          <CardContent
            title="Publicar como"
            subtitle=" El perfil que selecciones aparecerá como la cuenta creadora del post"
          >
            <Select
              name="candidate_id"
              label="Candidato"
              onChange={handleChangeInput}
              value={formState.candidate_id}
              options={getCandidates()}
              error={errors}
            />
          </CardContent>

          <CardContent
            title="Destino"
            destinys={getDestinysNames().toString()}
            subtitle={
              formState?.affCount > 0
                ? `Tu publicación tendrá un alcance estimado de ${formState?.affCount} afiliados`
                : "Selecciona quienes pueden ver esta publicación"
            }
            style={{ display: "flex" }}
          >
            <Select
              style={{ width: 200 }}
              name="destiny"
              label="Público objetivo"
              onChange={handleChangeInput}
              value={formState.destiny}
              options={lDestinies()}
              error={errors}
            />
          </CardContent>

          <CardContent title="Tipo de publicación">
            <div style={{ display: "flex", width: "100%" }}>
              <Radio
                checked={formState?.type == "N"}
                label="Noticia"
                subtitle="Ideal para informar con mayor detalle sobre un acontecimiento importante."
                onChange={() => setFormState({ ...formState, type: "N" })}
              />
              <Radio
                checked={formState?.type == "P"}
                label="Post"
                subtitle="Publicación más informal, ideal para publicar eventos cotidianos."
                onChange={() => setFormState({ ...formState, type: "P" })}
              />
            </div>
          </CardContent>
          {formState?.type == "N" && (
            <CardContent
              title="Título de la publicación"
              subtitle="Coloca un titular que impacte"
            >
              <Input
                name="title"
                label="Titulo"
                value={formState?.title}
                onChange={handleChangeInput}
                error={errors}
              />
            </CardContent>
          )}

          <CardContent
            title="Detalle de la publicación"
            subtitle="¿Qué quieres publicar hoy?"
          >
            <TextArea
              name="description"
              label="Descripción"
              value={formState?.description}
              onChange={handleChangeInput}
              error={errors}
            />
          </CardContent>
          <CardContent
            title="Tipo de contenido"
            subtitle="Selecciona el tipo de contenido que quieras publicar"
          >
            <UploadFileMultiple
              name="avatar"
              value={formState?.avatar}
              onChange={handleChangeInput}
              label={"Subir una imagen"}
              error={errors}
              ext={["jpg", "png", "jpeg"]}
              setError={setErrors}
              img={true}
              maxFiles={5}
              prefix={"CONT"}
              images={formState?.images}
              item={formState}
              // editor={}
              // sizePreview={_field.sizePreview}
              // autoOpen={data?.action == "add"}
            />
          </CardContent>
          <section>
            <Button onClick={onSave}>
              {formState?.id ? "Actualizar" : "Publicar"}
            </Button>
          </section>
        </div>
        <div className={styles.containerPreview}>
          <p>Vista previa</p>
          <div>
            <Preview formState={formState} extraData={extraData} />
          </div>
        </div>
        {openDestiny && (
          <ModalDestiny
            open={openDestiny}
            onClose={() => setOpenDestiny(false)}
            selDestinies={selDestinies(formState?.destiny)}
            formState={{ ...formState, lDestiny: ldestinys }}
            setFormState={setFormState}
            showToast={showToast}
            execute={execute}
          />
        )}
      </div>
    )
  );
};

export default AddContent;
