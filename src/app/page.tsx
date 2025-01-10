"use client";
import useScreenSize from "@/mk/hooks/useScreenSize";
import HomePage from "@/components/Index/Index";

export default function Home() {
  const { isMobile } = useScreenSize();
  // return isMobile ? <EventList /> : <HomePage />;
  return isMobile ? (
    <p>No hay eventos disponibles para este día</p>
  ) : (
    <HomePage />
  );
  // return <HomePage />;
}
