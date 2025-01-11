import React, { useState } from "react";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetCandidates.module.css";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import DetailCandidate from "./DetailCantidate";

const WidgetCandidates = ({ data, params }: any) => {
  const candidates = data;
  const [userId, setUserId]: any = useState(null);

  // console.log("candidates: ", candidates);

  return (
    <>
      <WidgetBase
        title={
          <span className={styles.widgetTitle}>
            {params?.level === 1
              ? "Candidatos para intendentes departamentales"
              : params?.level >= 2
              ? "Candidatos a Asambleístas por departamento"
              : "Sin Candidatos"}
          </span>
        }
        className={styles.widgetCandidates}
      >
        {candidates && candidates.length > 0 ? (
          <div style={{ paddingLeft: 0, paddingRight: 0}}>
            {candidates.map((candidate: any, index: number) => (
              <div
                key={candidate.id}
                className={styles.candidateCard}
                onClick={(e) => {
                  e.stopPropagation();
                  setUserId(candidate.id);
                }}
              >
                <Avatar
                  className={styles.avatar}
                  name={getFullName(candidate)}
                  src={getUrlImages(
                    `/CAND-${candidate?.id}.webp?d=${candidate?.updated_at}`
                  )}
                  h={72}
                  w={72}
                />
                <div className={styles.candidateInfo}>
                  <p>{candidate?.name}</p>
                  <p>{candidate?.last_name}</p>
                </div>
                <div className={styles.professionInfo}>{candidate?.profession}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noCandidates}>No tienes candidatos</p>
        )}
      </WidgetBase>
      {userId && (
        <DetailCandidate
          id={userId}
          close={() => setUserId(null)}
          open={true}
        />
      )}
    </>
  );
};

export default WidgetCandidates;
