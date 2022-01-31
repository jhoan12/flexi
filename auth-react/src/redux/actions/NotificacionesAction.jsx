import { types } from "../types/types";
import { dbFirestore } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  where,
  query
} from "@firebase/firestore";

const random = () => {
  return Math.floor(Math.random() * (90000 - 10000 + 1) + 10000);
};

// datos de prueba para las guias
export const addNotificacion = () => {
  return async () => {
    try {
      console.log("entre");
      const id_heka = "1000" + random();
      const data = {
        visible_user: false,
        visible_admin: false,
        visible_office: true,
        icon: ["exclamation", "danger"],
        user_id: "vinculo.id_user",
        office_id: "Yw0S25wPutV0qtvmKyGmXabpvGb2",
        mensaje: "Mensaje a mostrar en la notificación",
        href: "id destino",
        fecha: "dd/mm/aaaa",
        timeline: new Date().getTime(),
        id_heka: parseInt(id_heka)
    }
      const idHeka = parseInt(id_heka);
      await setDoc(doc(dbFirestore, `notificaciones/${idHeka}`), data);
      console.log("addNotificacion cree 1")
    } catch (error) {
      console.log(`ERROR en NotificacionAction: addNotificacion ${error}`);
    }
  };
};

// obtener todas las guias 
export const getAllNotificaciones = () => {
  return async (dispatch, getState) => {
    try {
      const {id} = getState().user
      const dataNotificaciones = [];
      const notificaciones = query(collection(dbFirestore, "notificaciones"), where("office_id", "==", id));
      const querySnapshot = await getDocs(notificaciones)
        querySnapshot.forEach((doc) => {
          dataNotificaciones.push(doc.data());
        });
      dispatch({
        type: types.getAllNotificaciones,
        payload: {
          notificaciones: dataNotificaciones,
        },
      });
    } catch (error) {
      console.log(`ERROR en NotificacionAction: getAllNotificaciones ${error}`);
    }
  };
};

// aceptar una guia y eliminar la notificacion 
export const aceptarEliminar = (id_heka) => {
  return async (dispatch, getState) => {
    try {

      const {notificaciones} = getState().notificaciones
      const dataNotificaciones = notificaciones.filter((notificacion) => notificacion.id_heka !== id_heka)
      dispatch({
        type: types.getAllNotificaciones,
        payload: {
          notificaciones: dataNotificaciones,
        },
      });
    } catch (error) {
      console.log(`ERROR en NotificacionAction: aceptarEliminar ${error}`);
    }
  }
}