import React, { useEffect, useState } from "react";
import ViewSurveys from "../ViewSurvey/ViewSurveys";
import { useAuth } from "@/mk/contexts/AuthProvider";
import useAxios from "@/mk/hooks/useAxios";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@/components/layout/icons/IconsBiblioteca";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";
import { DetailSurveySkeleton } from "@/mk/components/ui/Skeleton/Skeleton";

type Params = {
  page: number;
  perPage: number;
  searchBy: number;
  fullType: string;
  prov_id?: number;
  soption_id?: number;
  ages?: string;
  gender?: string;
  education_id?: number | string;
  extraData?: any;
};

const DetailSurvey = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const paramInitial: any = {
    page: 1,
    perPage: 1,
    searchBy: Number(id),
    fullType: "DET",
    extraData: 1,
    metric: 1,
  };
  const [params, setParams] = useState(paramInitial);
  const { data, reLoad } = useAxios("/surveys", "GET", params);

  const { user } = useAuth();
  const onBack = () => {
    router.push({
      pathname: "/surveys",
      // query: { type: "S" },
    });
  };
  useEffect(() => {
    reLoad(params);
  }, [params]);
  const onChangeParams = (newParams: Params) => {
    setParams((prevParams: Params) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  // if (!loaded) return <DetailSurveySkeleton />;
  return (
    <div style={{ paddingLeft: "var(--spL)", paddingRight: "var(--spL)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <p
          onClick={onBack}
          style={{
            fontSize: "var(--sL)",
            fontWeight: 600,
            color: "var(--cBlackV2)",
            cursor: "pointer",
          }}
        >
          Comunicación
        </p>
        <IconArrowLeft color="var(--cWhite)" size={32} />{" "}
        <p style={{ fontSize: "var(--sL)", fontWeight: 600 }}>
          Detalles de encuesta
        </p>
      </div>

      {data?.data && (
        <ViewSurveys
          data={data?.data}
          user={user}
          onChangeParams={onChangeParams}
          extraData={{ educations: data?.data?.educations }}
        />
      )}
    </div>
  );
};

export default DetailSurvey;
