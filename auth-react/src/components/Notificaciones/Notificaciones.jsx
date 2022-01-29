import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllNotificaciones } from '../../redux/actions/NotificacionesAction';
import TableNotificaciones from './TableNotificaciones';
const Notificaciones = () => {
  const dispatch = useDispatch()
  const {notificaciones} = useSelector((state) => state.notificaciones)
  useEffect(() => {
    console.log("entre");
    // dispatch(addNotificacion())
    notificaciones.length <= 0 && (dispatch(getAllNotificaciones()))
    console.log("finalice");
  }, []);

  const date = () => {
    notificaciones.forEach(notificacion => {
      notificacion.timeline = Date(notificacion.timeline).getTime()
    });
  }
  return (
      <div className='container'>
         <h2 className='text-center'>Notificaciones</h2>
         <TableNotificaciones data={notificaciones}/>
      </div>
  );
};
export default Notificaciones;
