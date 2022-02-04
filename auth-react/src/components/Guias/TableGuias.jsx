import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalInfoHistorial from "./ModalInfoHistorial";
import { dbFirestore } from "../../firebase";
import { doc, getDoc } from "@firebase/firestore";

import { Form } from "react-bootstrap";


import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actualizarGuia } from "../../redux/actions/GuiasAction";
import tipoActualizacionEstado from "../../helpers/tipoActualizacionEstado";
const TableGuias = ({ guias }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [dataGuia, setDataGuia] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(guias)
  }, [guias]);
  

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

  const handleButtonClick = async (e) => {
    try {
      if (e.recibidoEnPunto) {
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

  const buscar = (e) => {
    try {
      console.log("este es el 35", e);
      let newArray
      let texto = e.toUpperCase()
      console.log(texto);
      if(e != ""){
        newArray = guias.filter((guia) => guia.transportadora.toUpperCase().includes(texto))
        setData(newArray)
      }else{
        setData(guias)
      }
      // e != "" ? setData(guias.filter((guia) => guia.transportadora.toUpperCase().includes(texto))) : setData(guias)
      // e != "" ? setData(guias.filter((guia) => guia.fecha.toUpperCase().includes(texto))) : setData(guias)
      // e != "" ? setData(guias.filter((guia) => guia.numeroGuia.includes(texto))) : setData(guias)
      // e != "" ? setData(guias.filter((guia) => guia.id_heka.includes(texto))) : setData(guias)
      // console.log(guias.filter((guia) => guia.transportadora.toUpperCase().includes(texto)));
      // console.log(guias.map((guia) => guia.filter((element) => element.toUpperCase().includes(texto))))
    } catch (error) {
      console.log(`ERROR TableGuias buscar: ${error}`);
    }
  }
  
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
    <div className="row">
    <div className="col-12 d-flex justify-content-center">
     
       
     
      {/* <div className="col-11 my-3 buscador ">
      <input 
        type="text" 
        placeholder="Search.."
        onChange={(e) => buscar(e.target.value)}
        />
      </div> */}
      <Form.Control type="text" className="m-3" placeholder="Search.." onChange={(e) => buscar(e.target.value)}/>
      
    </div>
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

      {modalShow && (
        <ModalInfoHistorial
          show={modalShow}
          setModalShow={setModalShow}
          data={dataGuia}
        />
      )}
    </div>

  );
};


export default TableGuias;
