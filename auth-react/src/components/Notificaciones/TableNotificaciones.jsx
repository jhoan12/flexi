import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { guiasHistorial } from '../../redux/actions/GuiasAction';
function TableNotificaciones({data}) {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [dataNotificacion, setDataNotificacion] = useState({});
    const columns = [
      {
        name: "Fecha",
        selector: (row) => row.fecha,
      },
      {
        name: "Prioridad",
        selector: (row) => row.prioridad,
      },
    ];
    
    const handleButtonClick = (e) => {
      try {
          setDataNotificacion(e);
        //  console.log(e);
          Swal.fire({
            title: 'Te llegara un paquete',
            text: e.mensaje,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonText: 'Aceptar Paquete',
            
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(e);
              const mensaje = {mensaje:"hola maundo"}
              dispatch(guiasHistorial(mensaje, e.id_heka))
            } else if ("pase ", result.isDenied) {
              Swal.fire('Error', '', 'info')
            }
          })
      } catch (error) {
        console.log(`ERROR en TableGuias.jsx en handleButtonClick: ${error} `)
      }
    };

  
    return (
      <>
        <div style={{ cursor: "pointer" }}>
          <DataTable
            columns={columns}
            data={data}
            pagination
            onRowClicked={(e) => handleButtonClick(e)}
          />
        </div>
      </>
    );
}

export default TableNotificaciones;
