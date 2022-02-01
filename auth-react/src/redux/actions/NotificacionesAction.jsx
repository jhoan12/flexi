import { types } from "../types/types";
import { dbFirestore } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  where,
  query
} from "@firebase/firestore";

const random = (initial = 10000, range = 80000) => {
  return Math.floor((Math.random() * range) + initial);
};

// datos de prueba para las guias
export const addNotificacion = (id_heka) => {
  return async () => {
    try {

      const time = random(new Date().getTime() - 4.32e+8, 4.32e+8)
      // const id_heka = 1;
      const data = {
        visible_user: false,
        visible_admin: false,
        visible_office: true,
        icon: ["exclamation", "danger"],
        user_id: "id_user",
        office_id: "Yw0S25wPutV0qtvmKyGmXabpvGb2",
        mensaje: "Mensaje a mostrar en la notificación",
        href: "id destino",
        fecha: "12/15/2121",
        timeline: new Date(time).getTime(),
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
          const data = doc.data();
          data.id = doc.id;
          dataNotificaciones.push(data);
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
export const aceptarEliminar = (id) => {
  return async (dispatch, getState) => {
    try {

      const {notificaciones} = getState().notificaciones
      const dataNotificaciones = notificaciones.filter((notificacion) => notificacion.id !== id)
      dispatch({
        type: types.getAllNotificaciones,
        payload: {
          notificaciones: dataNotificaciones,
        },
      });
      await deleteDoc(doc(dbFirestore, `/notificaciones/${id}`));
      dispatch(getAllNotificaciones())
    } catch (error) {
      console.log(`ERROR en NotificacionAction: aceptarEliminar ${error}`);
    }
  }
}