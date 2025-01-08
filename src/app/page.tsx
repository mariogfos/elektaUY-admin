"use client";

import useScreenSize from "@/mk/hooks/useScreenSize";
import HomePage from "@/components/Index/Index";
import "../styles/theme.css";
import "../styles/utils.css";

export default function Home() {
  const { isMobile } = useScreenSize();
  // return isMobile ? <EventList /> : <HomePage />;
  return <HomePage />;
}
