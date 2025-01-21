"use client";
import React, { useEffect } from "react";
import styles from "./AddContent.module.css";
import { useAuth } from "@/mk/contexts/AuthProvider";
import { IconArrowLeft } from "@/components/layout/icons/IconsBiblioteca";
import { useRouter } from "next/navigation";

const AddContent = () => {
  const router = useRouter();
  const { store, setStore } = useAuth();
  useEffect(() => {
    setStore({ ...store, title: "Publicaciones" });
  }, []);
  return (
    <section className={styles.AddContent}>
      <div className={styles.containerForm}>
        <div>
          <p onClick={() => router.push("/contents")}>Volver</p>
          <IconArrowLeft />
          <p>Crear nueva publicacion</p>
        </div>
      </div>
      <div className={styles.containerPreview}>
        <p>Vista previa</p>
        <div></div>
      </div>
    </section>
  );
};

export default AddContent;
