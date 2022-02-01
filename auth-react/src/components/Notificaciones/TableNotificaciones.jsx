import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { getGuia, guiasHistorial } from '../../redux/actions/GuiasAction';
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
        selector: definePriorities,
      },
    ];
    
    function definePriorities({timeline}) {
      const act = new Date().getTime();
      const diference = (act - timeline) / (1000 * 60 * 60 * 24);
      if(diference > 3) {
        return "Muy Alta"
      } else if (diference > 2) {
        return "Alta"
      } else if (diference > 1) {
        return "Media"
      } else {
        return "Normal"
      }
    }


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
            
          }).then( async (result) => {
            if (result.isConfirmed) {
              console.log(e);
              const infoGuiaConsultada = await getGuia(e.user_id, e.id_heka)(dispatch);
              const datos_a_tomar = new Array("numeroGuia", "transportadora", "id_user", "id_heka", "fecha")
              const guia = new Object();
              datos_a_tomar.forEach(d => guia[d] = infoGuiaConsultada[d]);
              dispatch(guiasHistorial(guia, e.id))
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
        <div>
          <DataTable
            columns={columns}
            data={data}
            pagination
            pointerOnHover
            highlightOnHover
            onRowClicked={(e) => handleButtonClick(e)}
          />
        </div>
      </>
    );
}

export default TableNotificaciones;
