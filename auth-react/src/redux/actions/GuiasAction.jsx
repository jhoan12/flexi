import { types } from "../types/types";
import { dbFirestore } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  where,
  query
} from "@firebase/firestore";
import { aceptarEliminar } from "./NotificacionesAction";

const random = () => {
  return Math.floor(Math.random() * (90000 - 10000 + 1) + 10000);
};

export const addGuia = () => {
  return async () => {
    try {
      const id_heka = "1000" + random();
      const data = {
        recibidoEnPunto: false,
        debe: false,
        total_pagar: 0,
        celularD: "1231231231",
        nombreD: "Ikaro",
        timeline: 1637771937688,
        identificacionD: 123,
        valor: 50000,
        transportadora: "ENVIA",
        departamentoD: "CUNDINAMARCA",
        tipo_doc_dest: "2",
        detalles: {
          seguro: 50000,
          peso_con_volumen: 0,
          recaudo: 50000,
          comision_trasportadora: 3000,
          flete: 8250,
          peso_liquidar: 3,
          peso_real: 3,
          total: 13250,
          comision_heka: 2000,
        },
        peso: 3,
        dane_ciudadR: "25120000",
        ancho: "1",
        recoleccion_esporadica: 1,
        correoD: "notiene@gmail.com",
        departamentoR: "CUNDINAMARCA",
        id_user: "000000",
        telefonoD: "1231231231",
        direccionR: "calle barrio",
        estado: "",
        direccionD: "direccion  ",
        costo_envio: 13250,
        ciudadD: "CABRERA",
        ciudadR: "CABRERA",
        correoR: "calle@gmail.com",
        numeroGuia: "2128690096",
        nombreR: "Efesto",
        seguro: 50000,
        celularR: "321234454",
        dane_ciudadD: "25120000",
        id_archivoCargar: "hfN0zDzEESoRLa+25qt/5w==",
        has_sticker: true,
        observaciones: "",
        ultima_actualizacion: {
          seconds: 1637776800,
          nanoseconds: 2000000,
        },
        dice_contener: "calzado",
        fecha: "2021-11-24",
        alto: "1",
        centro_de_costo: "Sellerprobando",
        seguimiento_finalizado: false,
        largo: "1",
        type: "PAGO CONTRAENTREGA",
        id_heka,
      };
      const idHeka = parseInt(id_heka);
      await setDoc(doc(dbFirestore, `guias/${idHeka}`), data);
      console.log("cree 1");
    } catch (error) {
      console.log(`ERROR en GuiasAction: addGuia ${error}`);
    }
  };
};

export const getAllGuias = () => {
  return async (dispatch) => {
    try {
      const dataGuias = [];
      const querySnapshot = await getDocs(collection(dbFirestore, "guias"));
      querySnapshot.forEach((doc) => {
        dataGuias.push(doc.data());
      });
      dispatch({
        type: types.getAllGuias,
        payload: {
          guias: dataGuias,
        },
      });
    } catch (error) {
      console.log(`ERROR en GuiasAction: getAllGuias ${error}`);
    }
  };
};

export const getGuia = (guia) => {
  return async (dispatch) => {
    try {
      const dataGuia = await getDoc(doc(dbFirestore, `guias/${guia}`));
      console.log("firebase", dataGuia.data());
      console.log("idguia ", guia);
      if (dataGuia.exists()) {
        dispatch({
          type: types.getGuia,
          payload: {
            debe: dataGuia.data().debe,
            celularD: dataGuia.data().celularD,
            nombreD: dataGuia.data().nombreD,
            timeline: dataGuia.data().timeline,
            identificacionD: dataGuia.data().identificacionD,
            valor: dataGuia.data().valor,
            transportadora: dataGuia.data().transportadora,
            departamentoD: dataGuia.data().departamentoD,
            tipo_doc_dest: dataGuia.data().tipo_doc_dest,
            detalles: {
              seguro: dataGuia.data().seguro,
              peso_con_volumen: dataGuia.data().peso_con_volumen,
              recaudo: dataGuia.data().recaudo,
              comision_trasportadora: dataGuia.data().comision_trasportadora,
              flete: dataGuia.data().flete,
              peso_liquidar: dataGuia.data().peso_liquidar,
              peso_real: dataGuia.data().peso_real,
              total: dataGuia.data().total,
              comision_heka: dataGuia.data().comision_heka,
            },
            peso: dataGuia.data().peso,
            dane_ciudadR: dataGuia.data().dane_ciudadR,
            ancho: dataGuia.data().ancho,
            recoleccion_esporadica: dataGuia.data().recoleccion_esporadica,
            correoD: dataGuia.data().correoD,
            departamentoR: dataGuia.data().departamentoR,
            id_user: dataGuia.data().id_user,
            telefonoD: dataGuia.data().telefonoD,
            direccionR: dataGuia.data().direccionR,
            estado: dataGuia.data().estado,
            direccionD: dataGuia.data().direccionD,
            costo_envio: dataGuia.data().costo_envio,
            ciudadD: dataGuia.data().ciudadD,
            ciudadR: dataGuia.data().ciudadR,
            correoR: dataGuia.data().correoR,
            numeroGuia: dataGuia.data().numeroGuia,
            nombreR: dataGuia.data().nombreR,
            seguro: dataGuia.data().seguro,
            celularR: dataGuia.data().celularR,
            dane_ciudadD: dataGuia.data().dane_ciudadD,
            id_archivoCargar: dataGuia.data().id_archivoCargar,
            has_sticker: dataGuia.data().has_sticker,
            observaciones: dataGuia.data().observaciones,
            ultima_actualizacion: {
              seconds: dataGuia.data().seconds,
              nanoseconds: dataGuia.data().nanoseconds,
            },
            dice_contener: dataGuia.data().dice_contener,
            fecha: dataGuia.data().fecha,
            alto: dataGuia.data().alto,
            centro_de_costo: dataGuia.data().centro_de_costo,
            seguimiento_finalizado: dataGuia.data().seguimiento_finalizado,
            largo: dataGuia.data().largo,
            type: dataGuia.data().type,
            id_heka: dataGuia.data().id_heka,
          },
        });
        console.log("idguia ", guia);
        console.log("firebase", dataGuia.data());
      } else {
        console.log("La Guia no fue encontrada");
      }
    } catch (error) {
      console.log(`ERROR en GuiasAction: getAllGuias ${error}`);
    }
  };
};


let guias = {
  doc_1: [
    {
      id_oficna: "1",
      fechaCreacion: "02/01/2022",
      ultimaActualizacion: "20/01/2022",
      nombreColecion: "oficina_1_1",
      finalizado: true,
    }
  ]
};

export const guiasHistorial = (guia, id_heka) => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().user;
      const numGuia = await getDoc(doc(dbFirestore, `/users/${id}/guiasOficina/numGuias`));
      const numDoc = numGuia.data().num
      let nombreDoc;
      if(numDoc >= 1){
        nombreDoc = "doc_" + (numDoc + 1)
        await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/numGuias`), {num: numDoc + 1});
      }else if(numDoc <= 0){
        nombreDoc = "doc_1"

        await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/numGuias`), {num: numDoc + 1});
      }else{
        nombreDoc = "doc_" + numDoc
      }
      await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/${nombreDoc}`), guia);
      // querySnapshot.forEach((doc) => {
      //   dataNotificaciones.push(doc.data());
      // });
      // guias.doc_1.push(guia);
      console.log("guias historial ", numDoc);
      //await setDoc(doc(dbFirestore, `guiasOficina/${id}`), guias);
      // await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/doc1`), guia);
      // dispatch(getAllGuias());
      // dispatch(aceptarEliminar(id_heka));
    } catch (error) {
      console.log(`ERROR en GuiasAction: guiasHistorial ${error}`);
    }
  };
};

export const recibirGuia = (guia) => {
  return async (dispatch) => {
    try {
      const docRef = doc(dbFirestore, `guias/${guia}`);
      await updateDoc(docRef, {
        recibidoEnPunto: true,
      });
      dispatch(getAllGuias());
    } catch (error) {
      console.log(`ERROR en GuiasAction: recibirGuia ${error}`);
    }
  };
};
