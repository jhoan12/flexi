import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalInfoHistorial from "./ModalInfoHistorial";
import { dbFirestore } from "../../firebase";
import {
  doc,
  getDoc
} from "@firebase/firestore";
const TableGuias = ({ guias }) => {
  const [modalShow, setModalShow] = useState(false);
  const [dataGuia, setDataGuia] = useState({});
  const columns = [
    {
      name: "ID Heka",
      selector: (row) => row.id_heka,
    },
    {
      name: "Transportadora",
      selector: (row) => row.transportadora,
    },
  ];

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
      console.log(`ERROR en TableGuias.jsx en handleButtonClick: ${error} `)
    }
  };
  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <DataTable
          columns={columns}
          data={guias}
          pagination
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
