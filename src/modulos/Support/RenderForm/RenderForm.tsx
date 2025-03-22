import Input from "@/mk/components/forms/Input/Input";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import React, { useState } from "react";
import CardForm from "./CardForm/CardForm";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import Select from "@/mk/components/forms/Select/Select";
import UploadFileMultiple from "@/mk/components/forms/UploadFile/UploadFileMultiple";
import { hasErrors } from "@/mk/utils/validate/Rules";
import { useAuth } from "@/mk/contexts/AuthProvider";

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
  const [formState, setFormState]: any = useState({
    ...item,
  });
  const { showToast } = useAuth();
  const [errors, setErrors]: any = useState({});
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSave = async () => {
    let method = formState.id ? "PUT" : "POST";
    // if (hasErrors(validate())) return;
    const { data } = await execute(
      "/activities" + (formState.id ? "/" + formState.id : ""),
      method,
      {
        ...formState,
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

  return (
    <DataModal
      // className={styles.RenderForm}
      open={open}
      onClose={onClose}
      title={formState?.id ? "Editar ticket " : "Crear ticket"}
      onSave={onSave}
    >
      <CardForm title="Datos principales">
        <Input
          name="title"
          label="Título del problema"
          value={formState?.title}
          onChange={onChange}
          error={errors}
        />
        <TextArea
          name="description"
          label="Descripción del problema"
          value={formState?.description}
          onChange={onChange}
          error={errors}
        />
      </CardForm>
      <CardForm
        title="Categoría"
        subtitle="Selecciona el tipo de categoría al que pertenezca tu problema"
      >
        <Select
          name="category_id"
          label="Categoría"
          value={formState?.category_id}
          onChange={onChange}
          error={errors}
          options={extraData?.categories || []}
        />
      </CardForm>
      <CardForm
        title="Imagen de referencia"
        subtitle="Sube una captura de pantalla de donde encontraste el problema para que podamos darte una solución más precisa y rápida."
      >
        <UploadFileMultiple
          name="avatar"
          value={formState?.avatar}
          onChange={onChange}
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
      </CardForm>
    </DataModal>
  );
};

export default RenderForm;
