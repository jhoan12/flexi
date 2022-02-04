import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalInfoHistorial from "./ModalInfoHistorial";
import { dbFirestore } from "../../firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actualizarGuia } from "../../redux/actions/GuiasAction";
import tipoActualizacionEstado from "../../helpers/tipoActualizacionEstado";
const TableGuias = ({ guias }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [dataGuia, setDataGuia] = useState({});

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_heka,
      sortable: true,
    },
    {
      name: "Guia",
      selector: (row) => row.numeroGuia,
      sortable: true
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Transportadora",
      selector: (row) => row.transportadora,
    },
    {
      name: "Acción",
      selector: (row) => {
        if(!row.recibidoEnPunto) return "";
        if(row.entregada) return "Entregada";
        return <Button onClick={() => handleEntregarClick(row)}>Entregar</Button>
      },
      button: true,
      omit: true   
    }
  ];

  useEffect(() => {
    console.log("estas son las guias", guias);
  }, [guias]);

  const handleButtonClick = async (e) => {
    try {
      if (e.recibidoEnPunto) {
        //dispatch(getGuia(e.id_heka))

        console.log("id desde table", e.id_heka);
        const datosGuia = await getDoc(doc(dbFirestore, `guias/${e.id_heka}`));
        setDataGuia(datosGuia.data());
        setModalShow(true);
      } else {
        Swal.fire("Este paquete aun no ha sido registrado");
      }
    } catch (error) {
      console.log(`ERROR en TableGuias.jsx en handleButtonClick: ${error} `);
    }
  };

  const handleEntregarClick = async (row) => {
    Swal.fire({
      title: "Entregando guía",
      text: "Estás entregando la guía " + row.numeroGuia + ". ¿Deseas cotinuar?",
      showCancelButton: true,
      confirmButtonText: "Si, continuar"
    }).then(res => {
      if(res.isConfirmed) {
        const actualizar = tipoActualizacionEstado.entregar;
    
        dispatch(actualizarGuia(actualizar, row.id_heka, row.parent_id));
      }
    });

  }

  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={guias}
          pagination
          pointerOnHover
          highlightOnHover
          onRowClicked={(e) => handleButtonClick(e)}
        />
      </div>

      {modalShow && (
        <ModalInfoHistorial
          show={modalShow}
          setModalShow={setModalShow}
          data={dataGuia}
        />
      )}
    </>
  );
};

export default TableGuias;
