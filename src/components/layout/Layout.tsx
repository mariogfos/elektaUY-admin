"use client";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import { useAuth } from "@/mk/contexts/AuthProvider";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import Sidebar from "@/mk/components/ui/Sidebar/Sidebar";
import MainMenu from "../MainMenu/MainMenu";
import Header from "../Header/Header";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/mk/utils/date";
import SideMenu from "@/mk/components/ui/SideMenu/SideMenu";

const Layout = ({ children }: any) => {
  const { user, logout, store } = useAuth();
  const { isTablet, isDesktop } = useScreenSize();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [client, setClient]: any = useState(null);
  const [onLogout, setOnLogout] = useState(false);
  const path: any = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const client = user.clients?.find((c: any) => c.id === user.client_id);
      setClient(client);
    }
  }, [user]);

  const layoutClassName = `${styles.layout} ${
    isDesktop && !sideMenuOpen ? styles.layoutExpanded : ""
  } ${isDesktop && sideMenuOpen ? styles.layoutCollapsed : ""}`;

  return (
    <main className={layoutClassName}>
      <section>
        <Header
          isTablet={isTablet}
          user={user}
          path={path}
          router={router}
          client={client}
          title={store?.title + " / " + getFormattedDate()}
          right={store?.right}
          customTitle={store?.customTitle}
          openSlider={sideBarOpen}
          setOpenSlider={setSideBarOpen}
        />
      </section>
      <section>
        {isDesktop && (
          <SideMenu collapsed={sideMenuOpen} setCollapsed={setSideMenuOpen}>
            <MainMenu
              collapsed={sideMenuOpen}
              user={user}
              client={client}
              setLogout={setOnLogout}
            />
          </SideMenu>
        )}
        {isTablet && (
          <Sidebar
            open={sideBarOpen}
            onClose={setSideBarOpen}
            iconClose={false}
          >
            <MainMenu
              setSideBarOpen={setSideBarOpen}
              client={client}
              user={user}
              collapsed={false}
              setLogout={setOnLogout}
            />
          </Sidebar>
        )}
      </section>
      <section>{children}</section>
      <section>{/* Fotter Here!! */}</section>
      <DataModal
        open={onLogout}
        title="Cerrar sesión"
        onClose={() => {
          setOnLogout(false);
        }}
        buttonText="Cerrar sesión"
        buttonCancel="Cancelar"
        onSave={() => logout()}
      >
        <p className={styles.modalLogout}>
          ¿Estás seguro de que deseas cerrar sesión?
        </p>
      </DataModal>
    </main>
  );
};

export default Layout;
