import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalInfoHistorial from "./ModalInfoHistorial";
import { dbFirestore } from "../../firebase";
import { doc, getDoc } from "@firebase/firestore";
import { FaSearch } from "react-icons/fa";

import Buscador from "./Buscador";
import { Form } from "react-bootstrap";


const TableGuias = ({ guias }) => {
  const [modalShow, setModalShow] = useState(false);
  const [dataGuia, setDataGuia] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(guias)
  }, [guias]);
  

  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Transportadora",
      selector: (row) => row.transportadora,
      sortable: true,
    },
    {
      name: "ID Heka",
      selector: (row) => row.id_heka,
    },
    {
      name: "Guia",
      selector: (row) => row.numeroGuia,
    },
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

  return (
    <div className="row">
    <div className="col-12 d-flex justify-content-center">
      {/* <div className="col-sm-7"> */}
        {/* <Form>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                inline
                label="Fecha"
                // onChange={() => setFiltrarPor("fecha")}
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Transportadora"
                name="group1"
                // onChange={() => setFiltrarPor("transportadora")}
                type={type}
                id={`inline-${type}-2`}
              />
              <Form.Check
                inline
                label="Id-Heka"
                name="group1"
                // onChange={() => setFiltrarPor("id_heka")}
                type={type}
                id={`inline-${type}-3`}
              />
              <Form.Check
                inline
                name="group1"
                label="Guia"
                // onChange={() => setFiltrarPor("numeroGuia")}
                type={type}
                id={`inline-${type}-4`}
              />
              <Form.Check
                inline
                name="group1"
                label="todas"
                // onChange={() => dispatch(getAllGuias())}
                type={type}
                id={`inline-${type}-4`}
              />
            </div>
          ))}
        </Form> */}
      {/* </div> */}
      {/* <div className="col-11 my-3 buscador ">
      <input 
        type="text" 
        placeholder="Search.."
        onChange={(e) => buscar(e.target.value)}
        />
      </div> */}
      <Form.Control type="text" className="m-3" placeholder="Search.." onChange={(e) => buscar(e.target.value)}/>
      
      {/* <form className="col-11 my-3 buscador ">
        <input 
        type="text" 
        placeholder="Search.."
        onChange={(e) => buscar(e.target.value)}
        /> */}
        {/* <button type="submit" className="buscador-icono">
          <FaSearch />
        </button> */}
        {/* </form> */}
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
