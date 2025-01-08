import { useRef, useState } from "react";
import styles from "./Maps.module.css";
import Link from "next/link";
import { formatNumber } from "@/mk/utils/numbers";
import {
  pathsPais,
  pathsGalapagos,
  pathsAzuay,
  pathsBolivar,
  pathsCarchi,
  pathsCañar,
  pathsCotopaxi,
  pathsChimborazo,
  pathsElOro,
  pathsEsmeralda,
  pathsGuayas,
  pathsImbabura,
  pathsLoja,
  pathsLosRios,
  pathsManabi,
  pathsMoronaSantiago,
  pathsPichincha,
  pathsNapo,
  pathsPastaza,
  pathsSantaElena,
  pathsSantoDomingo,
  pathsOrellana,
  pathsSucumbios,
  pathsZamora,
  pathsTunguaru,
  pathsCuenca,
  pathsPonce,
  pathsPucara,
  pathsSanFernando,
  pathsGiron,
  pathsNabon,
  pathsOña,
  pathSisi,
  pathsChonderleg,
  pathsSanIsabel,
  pathsGuaranda,
  pathsLasNaves,
  pathsEcheandia,
  pathsCaluma,
  pathsChimbo,
  pathsSanMiguel,
  pathsChillanes,
  pathsGualaceo,
  pathsElPan,
  pathsGuachapala,
  pathsPaute,
  pathsOro,
  pathsTulcan,
  pathsMira,
  pathsEspejo,
  pathsBoli,
  pathsMontufuar,
  pathsPedro,
  pathsCaña,
  pathsBiblian,
  pathsDeleg,
  pathsAzogues,
  pathsSuscal,
  pathsTambo,
  pathsAlausi,
  pathsChunchi,
  pathsCumanada,
  pathsGuamote,
  pathsPallatanga,
  pathsColta,
  pathsRiobamba,
  pathsChambo,
  pathsGuano,
  pathsPenipe,
  pathsPanagua,
  pathsMana,
  pathsSichos,
  pathsPujili,
  pathsSalcedo,
  pathsSaquisili,
  pathsLatacunga,
  pathsArenillas,
  pathsMarcabeli,
  pathsBalsas,
  pathsPinas,
  pathsSantaRosa,
  pathsZaruma,
  pathsPortovelo,
  pathsChilla,
  pathsPasaje,
  pathsElGuabo,
  pathsMachala,
  pathsAtahualpa,
  pathsMuisne,
  pathsQuinide,
  pathsAtacames,
  pathsEsmerel,
  pathsRioVerde,
  pathsEloyAlfaro,
  pathsSanLorenzo,
  pathsIsabela,
  pathsSantaCruz,
  pathsSanCristobal,
  pathsEmpalme,
  pathsBalzar,
  pathsColimnes,
  pathsPalestina,
  pathsSantaLucia,
  pathsPedroCabo,
  pathsIsidiro,
  pathsLomas,
  pathsNobol,
  pathsDaule,
  pathsSalitre,
  pathsSamborodon,
  pathsGuayaquil,
  pathsPlayas,
  pathsNaranjal,
  pathsBalao,
  pathsDuran,
  pathsSanJacinto,
  pathsAlfredo,
  pathsMilagro,
  pathsSimonBolivar,
  pathsNaranjito,
  pathsGeneralAntonio,
  pathsMarcelino,
  pathsTriunfo,
  pathsCotacachi,
  pathsOtavalo,
  pathsUrququi,
  pathsIbarra,
  pathsAntonioAnte,
  pathsPinampiro,
  pathsZapotillo,
  pathsPindall,
  pathsPuyango,
  pathsCelica,
  pathsMacara,
  pathsPaltas,
  pathsSoranga,
  pathsCalvas,
  pathsEspindola,
  pathsChaguarpamba,
  pathsOlmedo,
  pathsCatamayo,
  pathsGonzamama,
  pathsQuilanga,
  pathsLoj,
  pathsSaguaru,
  pathsBuenaFe,
  pathsValencia,
  pathsQuevedo,
  pathsQuinsaloma,
  pathsMocache,
  pathsVentanas,
  pathsPalenque,
  pathsVinces,
  pathsTownOld,
  pathsBaba,
  pathsUrdaneta,
  pathsBabaHoyo,
  pathsMontalvo,
  pathsPedernales,
  pathsJama,
  pathsChone,
  pathsFlavio,
  pathsElCarmen,
  pathsSucre,
  pathsSanVicente,
  pathsTosagua,
  pathsBoliv,
  pathsPichin,
  pathsRoca,
  pathsJunin,
  pathsJaramijo,
  pathsManta,
  pathsPortoViejo,
  pathsSantaAna,
  pathsMontecristo,
  pathsJipapa,
  pathsPuertoLope,
  paths24,
  pathsOlmed,
  pathsPaja,
  pathsPalora,
  pathsPabloSexto,
  pathsHuamboya,
  pathsMorona,
  pathsTaicha,
  pathsSucua,
  pathsSantiago,
  pathsLogroño,
  pathsTwitza,
  pathsLimon,
  pathsBozco,
  pathsGualaquiza,
  pathsPuertoQuito,
  pathsMaldonado,
  pathsBancos,
  pathsQuito,
  pathsPedroMoncayo,
  pathsCayambe,
  pathsRumiñabi,
  pathsMejia,
  pathsSantaElen,
  pathsLaLibertad,
  pathsSalinas,
  pathsSantoDoming,
  pathsLaConcordia,
  pathsElChaco,
  pathsQuijos,
  pathsArchidona,
  pathsTena,
  pathsCarlos,
  pathsLoreto,
  pathsFranciscoOrellana,
  pathsSachas,
  pathsAguarico,
  pathsMera,
  pathsSantaClara,
  pathsPastaz,
  pathsArajuno,
  pathsSucumbio,
  pathsGonzaloPizarro,
  pathsCascales,
  pathsLagoAgrio,
  pathsShusfus,
  pathsCuyabeno,
  pathsPutum,
  pathsAmbato,
  pathsTisaleo,
  pathsMocha,
  pathsCeballos,
  pathsSanPedro,
  pathsSantiagoPillaro,
  pathsPatate,
  pathsBaños,
  pathsYacuambi,
  pathsYantaza,
  pathsElPangui,
  pathsZamor,
  pathsCentinela,
  pathsPaquisha,
  pathsNangaritza,
  pathsPalanda,
  pathChinchipie,
} from "./pathMapas";

type PropsType = {
  data: any;
  onClick?: any;
  params?: any;
  itemSelected: any;
};

const Maps = ({
  data,
  onClick = () => {},
  params = [{}, () => {}],
  itemSelected,
}: PropsType) => {
  const svgRef: any = useRef(null);
  const [param, setParam] = params;

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  let path: any = [];

  if ((param?.level || 1) == 1) {
    path = pathsPais;
  }
  if (param?.level == 2) {
    switch (param?.code) {
      case "01":
        path = pathsAzuay;
        break;
      case "02":
        path = pathsBolivar;
        break;
      case "03":
        path = pathsCañar;
        break;
      case "04":
        path = pathsCarchi;
        break;
      case "05":
        path = pathsCotopaxi;
        break;
      case "06":
        path = pathsChimborazo;
        break;
      case "07":
        path = pathsElOro;
        break;
      case "08":
        path = pathsEsmeralda;
        break;
      case "09":
        path = pathsGuayas;
        break;
      case "10":
        path = pathsImbabura;
        break;
      case "11":
        path = pathsLoja;
        break;
      case "12":
        path = pathsLosRios;
        break;
      case "13":
        path = pathsManabi;
        break;
      case "14":
        path = pathsMoronaSantiago;
        break;
      case "15":
        path = pathsNapo;
        break;
      case "16":
        path = pathsPastaza;
        break;
      case "17":
        path = pathsPichincha;
        break;
      case "18":
        path = pathsTunguaru;
        break;
      case "19":
        path = pathsZamora;
        break;
      case "20":
        path = pathsGalapagos;
        break;
      case "21":
        path = pathsSucumbios;
        break;
      case "22":
        path = pathsOrellana;
        break;
      case "23":
        path = pathsSantoDomingo;
        break;
      case "24":
        path = pathsSantaElena;
        break;

      // default:
      //   path = pathsPais;
    }
  }

  if (param?.level == 3) {
    switch (param?.code) {
      case "0101":
        path = pathsCuenca;
        break;
      case "0102":
        path = pathsGiron;
        break;
      case "0104":
        path = pathsNabon;
        break;
      case "0115":
        path = pathsPonce;
        break;
      case "0106":
        path = pathsPucara;
        break;
      case "0107":
        path = pathsSanFernando;
        break;
      case "0108":
        path = pathsSanIsabel;
        break;
      case "0109":
        path = pathSisi;
        break;
      case "0110":
        path = pathsOña;
        break;
      case "0111":
        path = pathsChonderleg;
        break;
      case "0103":
        path = pathsGualaceo;
        break;
      case "0201":
        path = pathsGuaranda;
        break;
      case "0207":
        path = pathsLasNaves;
        break;
      case "0203":
        path = pathsChimbo;
        break;
      case "0204":
        path = pathsEcheandia;
        break;
      case "0205":
        path = pathsSanMiguel;
        break;
      case "0206":
        path = pathsCaluma;
        break;
      case "0202":
        path = pathsChillanes;
        break;
      case "0112":
        path = pathsElPan;
        break;
      case "0114":
        path = pathsGuachapala;
        break;
      case "0105":
        path = pathsPaute;
        break;
      case "0113":
        path = pathsOro;
        break;
      case "0401":
        path = pathsTulcan;
        break;
      case "0404":
        path = pathsMira;
        break;
      case "0403":
        path = pathsEspejo;
        break;
      case "0402":
        path = pathsBoli;
        break;
      case "0405":
        path = pathsMontufuar;
        break;
      case "0406":
        path = pathsPedro;
        break;
      case "0304":
        path = pathsPedro;
        break;
      case "0303":
        path = pathsCaña;
        break;
      case "0302":
        path = pathsBiblian;
        break;
      case "0306":
        path = pathsDeleg;
        break;
      case "0301":
        path = pathsAzogues;
        break;
      case "0307":
        path = pathsSuscal;
        break;
      case "0305":
        path = pathsTambo;
        break;
      case "0602":
        path = pathsAlausi;
        break;
      case "0605":
        path = pathsChunchi;
        break;
      case "0610":
        path = pathsCumanada;
        break;
      case "0606":
        path = pathsGuamote;
        break;
      case "0608":
        path = pathsPallatanga;
        break;
      case "0603":
        path = pathsColta;
        break;
      case "0601":
        path = pathsRiobamba;
        break;
      case "0604":
        path = pathsChambo;
        break;
      case "0607":
        path = pathsGuano;
        break;
      case "0609":
        path = pathsPenipe;
        break;
      case "0503":
        path = pathsPanagua;
        break;
      case "0502":
        path = pathsMana;
        break;
      case "0507":
        path = pathsSichos;
        break;
      case "0504":
        path = pathsPujili;
        break;
      case "0505":
        path = pathsSalcedo;
        break;
      case "0506":
        path = pathsSaquisili;
        break;
      case "0501":
        path = pathsLatacunga;
        break;
      case "0714":
        path = pathsLatacunga;
        break;
      case "0702":
        path = pathsArenillas;
        break;
      case "0708":
        path = pathsMarcabeli;
        break;
      case "0704":
        path = pathsBalsas;
        break;
      case "0710":
        path = pathsPinas;
        break;
      case "0712":
        path = pathsSantaRosa;
        break;
      case "0713":
        path = pathsZaruma;
        break;
      case "0711":
        path = pathsPortovelo;
        break;
      case "0705":
        path = pathsChilla;
        break;
      case "0709":
        path = pathsPasaje;
        break;
      case "0706":
        path = pathsElGuabo;
        break;
      case "0701":
        path = pathsMachala;
        break;
      case "0703":
        path = pathsAtahualpa;
        break;
      case "0803":
        path = pathsMuisne;
        break;
      case "0804":
        path = pathsQuinide;
        break;
      case "0806":
        path = pathsAtacames;
        break;
      case "0801":
        path = pathsEsmerel;
        break;
      case "0807":
        path = pathsRioVerde;
        break;
      case "0802":
        path = pathsEloyAlfaro;
        break;
      case "0805":
        path = pathsSanLorenzo;
        break;
      case "2002":
        path = pathsIsabela;
        break;
      case "2003":
        path = pathsSantaCruz;
        break;
      case "2001":
        path = pathsSanCristobal;
        break;
      case "0908":
        path = pathsEmpalme;
        break;
      case "0904":
        path = pathsBalzar;
        break;
      case "0905":
        path = pathsColimnes;
        break;
      case "0913":
        path = pathsPalestina;
        break;
      case "0918":
        path = pathsSantaLucia;
        break;
      case "0914":
        path = pathsPedroCabo;
        break;
      case "0928":
        path = pathsIsidiro;
        break;
      case "0924":
        path = pathsLomas;
        break;
      case "0925":
        path = pathsNobol;
        break;
      case "0906":
        path = pathsDaule;
        break;
      case "0919":
        path = pathsSalitre;
        break;
      case "0916":
        path = pathsSamborodon;
        break;
      case "0901":
        path = pathsGuayaquil;
        break;
      case "0921":
        path = pathsPlayas;
        break;
      case "0911":
        path = pathsNaranjal;
        break;
      case "0903":
        path = pathsBalao;
        break;
      case "0907":
        path = pathsDuran;
        break;
      case "0920":
        path = pathsSanJacinto;
        break;
      case "0902":
        path = pathsAlfredo;
        break;
      case "0910":
        path = pathsMilagro;
        break;
      case "0922":
        path = pathsSimonBolivar;
        break;
      case "0912":
        path = pathsNaranjito;
        break;
      case "0927":
        path = pathsGeneralAntonio;
        break;
      case "0923":
        path = pathsMarcelino;
        break;
      case "0923":
        path = pathsMarcelino;
        break;
      case "0909":
        path = pathsTriunfo;
        break;
      case "1003":
        path = pathsCotacachi;
        break;
      case "1004":
        path = pathsOtavalo;
        break;
      case "1006":
        path = pathsUrququi;
        break;
      case "1001":
        path = pathsIbarra;
        break;
      case "1002":
        path = pathsAntonioAnte;
        break;
      case "1005":
        path = pathsPinampiro;
        break;
      case "1113":
        path = pathsZapotillo;
        break;
      case "1114":
        path = pathsPindall;
        break;
      case "1110":
        path = pathsPuyango;
        break;
      case "1104":
        path = pathsCelica;
        break;
      case "1108":
        path = pathsMacara;
        break;
      case "1109":
        path = pathsPaltas;
        break;
      case "1112":
        path = pathsSoranga;
        break;
      case "1102":
        path = pathsCalvas;
        break;
      case "1106":
        path = pathsEspindola;
        break;
      case "1105":
        path = pathsChaguarpamba;
        break;
      case "1116":
        path = pathsOlmedo;
        break;
      case "1103":
        path = pathsCatamayo;
        break;
      case "1107":
        path = pathsGonzamama;
        break;
      case "1115":
        path = pathsQuilanga;
        break;
      case "1101":
        path = pathsLoj;
        break;
      case "1111":
        path = pathsSaguaru;
        break;
      case "1210":
        path = pathsBuenaFe;
        break;
      case "1211":
        path = pathsValencia;
        break;
      case "1205":
        path = pathsQuevedo;
        break;
      case "1213":
        path = pathsQuinsaloma;
        break;
      case "1212":
        path = pathsMocache;
        break;
      case "1207":
        path = pathsVentanas;
        break;
      case "1209":
        path = pathsPalenque;
        break;
      case "1208":
        path = pathsVinces;
        break;
      case "1204":
        path = pathsTownOld;
        break;
      case "1202":
        path = pathsBaba;
        break;
      case "1206":
        path = pathsUrdaneta;
        break;
      case "1201":
        path = pathsBabaHoyo;
        break;
      case "1203":
        path = pathsMontalvo;
        break;
      case "1317":
        path = pathsPedernales;
        break;
      case "1320":
        path = pathsJama;
        break;
      case "1303":
        path = pathsChone;
        break;
      case "1305":
        path = pathsFlavio;
        break;
      case "1304":
        path = pathsElCarmen;
        break;
      case "1314":
        path = pathsSucre;
        break;
      case "1322":
        path = pathsSanVicente;
        break;
      case "1315":
        path = pathsTosagua;
        break;
      case "1302":
        path = pathsBoliv;
        break;
      case "1311":
        path = pathsPichin;
        break;
      case "1312":
        path = pathsRoca;
        break;
      case "1307":
        path = pathsJunin;
        break;
      case "1321":
        path = pathsJaramijo;
        break;
      case "1308":
        path = pathsManta;
        break;
      case "1301":
        path = pathsPortoViejo;
        break;
      case "1313":
        path = pathsSantaAna;
        break;
      case "1309":
        path = pathsMontecristo;
        break;
      case "1306":
        path = pathsJipapa;
        break;
      case "1319":
        path = pathsPuertoLope;
        break;
      case "1316":
        path = paths24;
        break;
      case "1318":
        path = pathsOlmed;
        break;
      case "1310":
        path = pathsPaja;
        break;
      case "1310":
        path = pathsPaja;
        break;
      case "1404":
        path = pathsPalora;
        break;
      case "1411":
        path = pathsPabloSexto;
        break;
      case "1407":
        path = pathsHuamboya;
        break;
      case "1401":
        path = pathsMorona;
        break;
      case "1409":
        path = pathsTaicha;
        break;
      case "1406":
        path = pathsSucua;
        break;
      case "1405":
        path = pathsSantiago;
        break;
      case "1410":
        path = pathsLogroño;
        break;
      case "1412":
        path = pathsTwitza;
        break;
      case "1403":
        path = pathsLimon;
        break;
      case "1408":
        path = pathsBozco;
        break;
      case "1402":
        path = pathsGualaquiza;
        break;
      case "1709":
        path = pathsPuertoQuito;
        break;
      case "1708":
        path = pathsMaldonado;
        break;
      case "1707":
        path = pathsBancos;
        break;
      case "1701":
        path = pathsQuito;
        break;
      case "1704":
        path = pathsPedroMoncayo;
        break;
      case "1702":
        path = pathsCayambe;
        break;
      case "1705":
        path = pathsRumiñabi;
        break;
      case "1703":
        path = pathsMejia;
        break;
      case "2401":
        path = pathsSantaElen;
        break;
      case "2402":
        path = pathsLaLibertad;
        break;
      case "2403":
        path = pathsSalinas;
        break;
      case "2301":
        path = pathsSantoDoming;
        break;
      case "2302":
        path = pathsLaConcordia;
        break;
      case "1504":
        path = pathsElChaco;
        break;
      case "1507":
        path = pathsQuijos;
        break;
      case "1503":
        path = pathsArchidona;
        break;
      case "1501":
        path = pathsTena;
        break;
      case "1509":
        path = pathsCarlos;
        break;
      case "2204":
        path = pathsLoreto;
        break;
      case "2201":
        path = pathsFranciscoOrellana;
        break;
      case "2203":
        path = pathsSachas;
        break;
      case "2202":
        path = pathsAguarico;
        break;
      case "1602":
        path = pathsMera;
        break;
      case "1603":
        path = pathsSantaClara;
        break;
      case "1601":
        path = pathsPastaz;
        break;
      case "1604":
        path = pathsArajuno;
        break;
      case "2105":
        path = pathsSucumbio;
        break;
      case "2102":
        path = pathsGonzaloPizarro;
        break;
      case "2106":
        path = pathsCascales;
        break;
      case "2101":
        path = pathsLagoAgrio;
        break;
      case "2104":
        path = pathsShusfus;
        break;
      case "2107":
        path = pathsCuyabeno;
        break;
      case "2103":
        path = pathsPutum;
        break;
      case "1801":
        path = pathsAmbato;
        break;
      case "1809":
        path = pathsTisaleo;
        break;
      case "1804":
        path = pathsMocha;
        break;
      case "1803":
        path = pathsCeballos;
        break;
      case "1803":
        path = pathsCeballos;
        break;
      case "1807":
        path = pathsSanPedro;
        break;
      case "1808":
        path = pathsSantiagoPillaro;
        break;
      case "1805":
        path = pathsPatate;
        break;
      case "1802":
        path = pathsBaños;
        break;
      case "1904":
        path = pathsYacuambi;
        break;
      case "1905":
        path = pathsYantaza;
        break;
      case "1906":
        path = pathsElPangui;
        break;
      case "1901":
        path = pathsZamor;
        break;
      case "1907":
        path = pathsCentinela;
        break;
      case "1909":
        path = pathsPaquisha;
        break;
      case "1903":
        path = pathsNangaritza;
        break;
      case "1908":
        path = pathsPalanda;
        break;
      case "1902":
        path = pathChinchipie;
        break;
      default:
        return null;
    }
  }

  const _onClick = (code: string | number) => {
    let row = data?.find((d: any) => d.code == code);
    onClick(row);
  };

  let paramLevel = param?.level == undefined ? 1 : param?.level;

  const onTooltip = (event: any, id: string | number, show: boolean = true) => {
    if (!show) return setTooltip({ visible: false, x: 0, y: 0, item: null });
    const rect = event.target.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();
    const item = data?.find((d: any) => d.code == id) || {
      id: id || itemSelected?.id,
      name: itemSelected?.name,
      habitantes: itemSelected?.habitantes || 0,
      habilitados: itemSelected?.habilitados || 0,
      afiliados: itemSelected?.affiliate_count || 0,
      cantones: itemSelected?.cantones || 0,
      parroquias: itemSelected?.parishesCount || 0,
      // total: 0,
    };

    setTooltip({
      visible: id || item != null ? true : false,
      x: rect.left - svgRect.left + rect.width / 2,
      y: rect.top - svgRect.top,
      item: paramLevel <= 3 ? item : null,
    });
  };

  const getStyle = () => {
    switch (param?.code) {
      case "01":
        return styles.AzuzayMap;
      case "02":
        return styles.BolivarMap;
      case "03":
        return styles.CañarMap;
      case "04":
        return styles.CarchiMap;
      case "05":
        return styles.CotopaxiMap;
      case "06":
        return styles.ChimborazoMap;
      case "07":
        return styles.ElOroMap;
      case "08":
        return styles.EsmeraldaMap;
      case "09":
        return styles.GuayasMap;
      case "10":
        return styles.ImbaduraMap;
      case "11":
        return styles.LojaMap;
      case "12":
        return styles.RioMap;
      case "13":
        return styles.ManabiMap;
      case "14":
        return styles.MoronaMap;
      case "15":
        return styles.NapoMap;
      case "16":
        return styles.PastazaMap;
      case "17":
        return styles.PichinchaMap;
      case "17":
        return styles.TunguaruMap;
      case "19":
        return styles.ZamoraMap;
      case "20":
        return styles.GalapagoMap;
      case "21":
        return styles.Sucumbios;
      case "22":
        return styles.Orellana;
      case "23":
        return styles.SantoDomingo;
      case "24":
        return styles.SantaElena;
      default:
        return styles.mapa;
    }
  };

  const Tooltip = ({ item }: any) => {
    return (
      paramLevel <= 3 && (
        <div
          className={styles.tooltip}
          style={{
            top: tooltip.y,
            left: tooltip.x,
            borderRadius: 4,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <h3 style={{ fontSize: 16, color: "#101111", paddingBottom: 8 }}>
            {item?.name}
          </h3>
          <div style={{ fontSize: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Habitantes: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.habitantes, 0)}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Votantes habilitados: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.habilitados, 0)}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Afiliados: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.affiliate_count || item?.afiliados, 0)}
              </p>
            </div>
            {param?.level == 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#656F78",
                }}
              >
                <p>Cantones: </p>
                <p style={{ color: "#101111" }}>
                  {formatNumber(item?.cantonsCount || item?.cantones, 0)}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#656F78",
              }}
            >
              <p>Parroquias: </p>
              <p style={{ color: "#101111" }}>
                {formatNumber(item?.parishesCount || item?.parroquias, 0)}
              </p>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className={
        param?.level == 1
          ? styles.mapa
          : param?.level == 2
          ? getStyle()
          : styles.mapa
      }
    >
      <svg ref={svgRef} viewBox={path[0]?.vb}>
        {path.map((path: any, index: number) => {
          if (path.title === "rect") {
            return (
              <rect
                key={path.id || index}
                x={path.x}
                y={path.y}
                width={path.width}
                height={path.height}
                rx={path.rx}
                style={{ fill: "#fff" }}
              />
            );
          }

          return (
            <Link
              key={path.id || index}
              href="#"
              onClick={() =>
                path.title !== "map" &&
                path.title !== "line" &&
                path.title !== "salar" &&
                param?.level != 3 &&
                path.title !== "disabled" &&
                path.code
                  ? _onClick(path?.code)
                  : {}
              }
              title={path.title}
            >
              <path
                key={path.id || index}
                style={{
                  fill:
                    path.title === "map"
                      ? "#F58220"
                      : path.title === "salar"
                      ? "#656F78"
                      : "",
                  stroke:
                    path.title === "value"
                      ? "#000"
                      : path.title === "line"
                      ? "#fff"
                      : "",
                  cursor:
                    path.title === "map" ||
                    path.title === "line" ||
                    path.title === "salar" ||
                    param?.level < 3
                      ? "pointer"
                      : "default",
                }}
                d={path.d}
                onMouseEnter={(e) => onTooltip(e, path.code)}
                onMouseLeave={() => onTooltip(null, path.code, false)}
              />
            </Link>
          );
        })}
      </svg>

      {tooltip.visible && (
        <Tooltip
          x={tooltip.x}
          y={tooltip.y}
          item={tooltip.item}
          param={param}
        />
      )}
    </div>
  );
};

export default Maps;
