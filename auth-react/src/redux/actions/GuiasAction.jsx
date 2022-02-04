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
  query,
} from "@firebase/firestore";
import { aceptarEliminar } from "./NotificacionesAction";

// const random = () => {
//   return Math.floor(Math.random() * (90000 - 10000 + 1) + 10000);
// };

export const addGuia = (id_heka) => {
  return async () => {
    try {
      // const id_heka = 1;
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
      await setDoc(doc(dbFirestore, `usuarios/id_user/guias/${id_heka}`), data);
      console.log("cree 1");
    } catch (error) {
      console.log(`ERROR en GuiasAction: addGuia ${error}`);
    }
  };
};

export const getAllGuias = () => {
  return async (dispatch, getState) => {
    try {
      let dataGuias = [];
      const {id} = getState().user;
      const q = query(
        collection(dbFirestore, "users", id, "guiasOficina"),
        where("visible", "==", true)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataGuias = dataGuias.concat(doc.data().guias);
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

export const getGuia = (id_user, guia) => {
  return async (dispatch) => {
    try {
      const dataGuia = await getDoc(doc(dbFirestore, `usuarios/${id_user}/guias/${guia}`));
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
        return dataGuia.data();
      } else {
        console.log("La Guia no fue encontrada");
      }
    } catch (error) {
      console.log(`ERROR en GuiasAction: getAllGuias ${error}`);
    }
  };
};

export const guiasHistorial = (guia, id_notification) => {
  const dataGuias = {
    guias: [],
    
    id_oficna: "1",
    fechaCreacion: new Date(),
    ultimaActualizacion: new Date(),
    finalizado: false,
    data: true,
    visible: true,
  };
  return async (dispatch, getState) => {
    try {
      const { id } = getState().user;
      const numGuia = await getDoc(
        doc(dbFirestore, `/users/${id}/guiasOficina/numGuias`)
      );

      let numDoc = numGuia.exists() ? numGuia.data().num : 0;

      // el nombreDoc sera el nodo al que se enviará {tosend}
      let nombreDoc, toSend;

      //Definimos la máxima cantidad de guía permitida por documento
      const maxPermitidas = 5;

      if (numDoc >= 1) {
        nombreDoc = "doc_" + numDoc;
        const document = await getDoc(doc(dbFirestore, `/users/${id}/guiasOficina/${nombreDoc}`));

        if(!document.exists) throw new Error("Aparentemente no existe este documento");
        const addGuia = document.data();
        console.log(addGuia);

        const next = addGuia.finalizado;

        //Para indicar si ya el paquete consultado está full
        if (next) {
          numDoc++;
          nombreDoc = "doc_" + numDoc;
          await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/numGuias`), {
            num: numDoc,
          });
          toSend = await newDoc(numDoc)
        } else {
          addGuia.guias.push(guia);
          toSend = addGuia;
        }
        
      } else {
        nombreDoc = "doc_1";
        toSend = await newDoc(1);
      }

      async function newDoc(num) {
        dataGuias.guias.push(guia);
        await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/numGuias`), {
          num,
        });

        return dataGuias;
      }

      if(toSend.guias.length >= maxPermitidas) {
        toSend.finalizado = true;
      }
      await setDoc(doc(dbFirestore, `/users/${id}/guiasOficina/${nombreDoc}`), toSend);
      dispatch(aceptarEliminar(id_notification));
    } catch (error) {
      console.log(`ERROR en GuiasAction: guiasHistorial ${error}`);
    }
  };
};

export const buscador = (guias) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.getAllGuias,
        payload: {
          guias: guias,
        },
      });
    } catch (error) {
      console.log(`ERROR en GuiasAction: recibirGuia ${error}`);
    }
  }
}

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