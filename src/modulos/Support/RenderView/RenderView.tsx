import HeaderBack from "@/components/HeaderBack/HeaderBack";
import styles from "./RenderView.module.css";
import { useEffect, useState } from "react";
import { Avatar } from "../../../mk/components/ui/Avatar/Avatar";
import KeyValue from "@/mk/components/ui/KeyValue/KeyValue";
import ItemChat from "./ItemChat/ItemChat";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import Input from "@/mk/components/forms/Input/Input";
import Button from "@/mk/components/forms/Button/Button";
import Qualification from "../Qualification/Qualification";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
  extraData?: any;
  openList: any;
  setOpenList: any;
}) => {
  useEffect(() => {
    props?.setOpenList(false);
  }, []);
  let item = props?.item;
  const [formState, setFormState] = useState({
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  item = {
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/TITODOUBLEP.jpg",
    name: "Elekta",
    phone: "+52 81 1234 5678",
  };
  let dataChat = [
    {
      id: 1,
      user_id: 1,
      name: "Pedro",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 2,
      user_id: 2,
      name: "Elekta",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 3,
      user_id: 1,
      name: "Pedro",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 4,
      user_id: 2,
      name: "Elekta",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 5,
      user_id: 1,
      name: "Pedro",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 6,
      user_id: 2,
      name: "Elekta",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 7,
      user_id: 1,
      name: "Pedro",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
    {
      id: 8,
      user_id: 2,
      name: "Elekta",
      date: "8:30",
      message:
        "Buenas días. Estoy teniendo problemas para cambiar mis datos de acceso, el sistema no me deja cambiar mi contraseña, al parecer no reconoce mi correo electrónico y no me llega ningún código de verificación. Me podrían ayudar con este problemita porfa, ¡Gracias!",
    },
  ];
  return (
    props?.open && (
      <div className={styles.RenderView}>
        <HeaderBack
          onClose={() => {
            props?.onClose();
            props?.setOpenList(true);
          }}
          titleLeft="Lista tickets"
          titleRight="Ticket #123"
        />
        <section>
          <div>
            {/* <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={item?.avatar} h={64} w={64} name={item.name} />
              <div>
                <p>{item.name}</p>
                <p>Soporte técnico</p>
              </div>
            </div> */}
            <ItemList
              title={"Maria Lopez"}
              subtitle={"Soporte técnico"}
              left={
                <Avatar src={item?.avatar} h={64} w={64} name={item.name} />
              }
            />

            <div style={{ height: 1, backgroundColor: "var(--cBlackV3)" }} />
            <div
              style={{
                overflow: "scroll",
                height: "680px",
                paddingTop: 16,
              }}
            >
              {dataChat.map((item) => {
                return (
                  <ItemChat
                    key={item.id}
                    name={item.name}
                    date={item.date}
                    message={item.message}
                    user_id={item.user_id}
                    // src={}
                  />
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Input
                name="message"
                label="Escribe tu mensaje"
                // placeholder="Escribe tu mensaje"

                type="text"
                value={formState?.message}
                onChange={handleChange}
                error={errors}
              />
              <Button style={{ width: 100 }}>Enviar </Button>
            </div>
          </div>
          <div>
            <p className={styles.title}>Detalle de ticket</p>
            <p className={styles.title} style={{ textAlign: "center" }}>
              #4564443
            </p>
            <KeyValue
              title={"Fecha y hora de creación"}
              value={"16 ene 2025, 9:15 a.m."}
            />
            <KeyValue
              title={"Módulo afectado"}
              value={"Usuario y contraseña"}
            />
            <KeyValue
              title={"Agente asignado"}
              value={"Juan Marcos Peña Castilla"}
            />
            <KeyValue title={"Estado"} value={"En revisión"} />
            <p className={styles.title}>Historial de atención</p>
            <p className={styles.title}>Calificación</p>
            <p>Has calificado la atención con un puntaje de 9/10</p>
            <Qualification />
          </div>
        </section>
      </div>
    )
  );
};

export default RenderView;
