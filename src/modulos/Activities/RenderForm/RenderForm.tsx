import DataModal from "@/mk/components/ui/DataModal/DataModal";
import React, { useState } from "react";
import CardActivity from "./CardActivity";
import Select from "@/mk/components/forms/Select/Select";
import Input from "@/mk/components/forms/Input/Input";
import Radio from "@/mk/components/forms/Ratio/Radio";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import styles from "../Activities.module.css";
import UploadFileMultiple from "@/mk/components/forms/UploadFile/UploadFileMultiple";

const RenderForm = ({
  onClose,
  open,
  item,
  setItem,
  // errors,
  extraData,
  user,
  execute,
  // setErrors,
  reLoad,
  action,
  openList,
  setOpenList,
}: any) => {
  const [formState, setFormState]: any = useState({ ...item, modalidad: "P" });
  const [errors, setErrors]: any = useState({});

  const handleChangeInput = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const lDestinies = () => {
    const level = user?.role.level;
    const r = [];
    if (level == 1 || level == 0) {
      r.push({ id: 0, name: "Todos" });
    }
    if (level == 2) r.push({ id: 0, name: "Mi organización" });
    if (level == 3) r.push({ id: 0, name: "Mi departamento" });
    if (level == 4) r.push({ id: 0, name: "Mi municipio" });
    // if (level == 4) r.push({ id: 0, name: "Mi localidad" });
    if (level == 5) r.push({ id: 0, name: "Mi barrio" });

    if (level <= 1) r.push({ id: 2, name: "Organización" });
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
  return (
    <DataModal
      className={styles.RenderForm}
      open={open}
      onClose={onClose}
      title="Crear actividad"
    >
      <CardActivity
        style={{ flexDirection: "row" }}
        title="Destino"
        subtitle="Escoge el lugar donde quieres que aparezca la actividad para que los afiliados puedan participar como voluntarios"
      >
        <Select
          name="destiny"
          style={{ width: 200 }}
          label="Público"
          value={formState?.destiny}
          options={lDestinies()}
          onChange={handleChangeInput}
          error={errors}
        />
      </CardActivity>
      <CardActivity title="Fecha de actividad">
        <div style={{ display: "flex", gap: 8 }}>
          <Input
            type="datetime-local"
            label="Fecha y hora de inicio"
            name="start_date"
            value={formState?.start_date}
            onChange={handleChangeInput}
            error={errors}
          />
          <Input
            type="datetime-local"
            label="Fecha y hora de fin"
            name="end_date"
            value={formState?.end_date}
            onChange={handleChangeInput}
            error={errors}
          />
        </div>
      </CardActivity>
      <CardActivity
        style={{ flexDirection: "row" }}
        title="Tipo de actividad"
        subtitle="Define la naturaleza de la iniciativa que deseas organizar con tu equipo  y los afiliados"
      >
        <Select
          name="type"
          style={{ width: 200 }}
          label="Tipo de actividad"
          value={formState?.type}
          options={[
            { id: 1, name: "Tipo 1" },
            { id: 2, name: "Tipo 2" },
            { id: 3, name: "Tipo 3" },
          ]}
          onChange={handleChangeInput}
          error={errors}
        />
      </CardActivity>
      <CardActivity title="Modalidad">
        <div style={{ display: "flex", gap: 16 }}>
          <Radio
            label="Presencial"
            checked={formState.modalidad == "P"}
            onChange={() => setFormState({ ...formState, modalidad: "P" })}
          />
          <Radio
            label="Virtual"
            checked={formState.modalidad == "V"}
            onChange={() => setFormState({ ...formState, modalidad: "V" })}
          />
        </div>
        {formState?.modalidad == "V" && (
          <Input
            type="text"
            label="Link de la actividad"
            name="link"
            value={formState?.link}
            onChange={handleChangeInput}
            error={errors}
          />
        )}
        {formState?.modalidad == "P" && (
          <Input
            label="Link de la ubicación"
            name="link"
            value={formState?.link}
            onChange={handleChangeInput}
            error={errors}
          />
        )}
      </CardActivity>
      <CardActivity title="Información general">
        <Input
          name="name"
          label="Nombre de la actividad"
          value={formState?.name}
          onChange={handleChangeInput}
          error={errors}
        />
        <TextArea
          name="description"
          label="Descripción de la actividad"
          value={formState?.description}
          onChange={handleChangeInput}
          error={errors}
        />
      </CardActivity>
      <CardActivity
        title="Coordinador"
        subtitle="Selecciona a una persona que sea responsable para que la actividad se cumpla con éxito."
      >
        <Select
          name="coordinator"
          label="Coordinador"
          value={formState?.coordinator}
          options={[
            { id: 1, name: "Coordinador 1" },
            { id: 2, name: "Coordinador 2" },
            { id: 3, name: "Coordinador 3" },
          ]}
          onChange={handleChangeInput}
          error={errors}
        />
      </CardActivity>
      <CardActivity
        title="Imagen referencia"
        subtitle="Sube una imagen de la actividad"
      >
        <UploadFileMultiple
          name="avatar"
          value={formState?.avatar}
          onChange={handleChangeInput}
          label={"Subir una imagen"}
          error={errors}
          ext={["jpg", "png", "jpeg", "webp"]}
          setError={setErrors}
          img={true}
          maxFiles={10}
          prefix={"CONT"}
          images={formState?.images}
          item={formState}
          // editor={}
          // sizePreview={_field.sizePreview}
          // autoOpen={data?.action == "add"}
        />
      </CardActivity>
    </DataModal>
  );
};

export default RenderForm;
