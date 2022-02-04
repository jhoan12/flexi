import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { buscador, getAllGuias } from "../../redux/actions/GuiasAction";

const Buscador = () => {
  const dispatch = useDispatch()
  const { guias } = useSelector((state) => state.guias);
  const [filtrarPor, setFiltrarPor] = useState("")
  const [textFilter, setTextFilter] = useState("")
  const buscar = (e) => {
    e.preventDefault()
    if(filtrarPor === "")return Swal.fire("Debes indicar por que quieres filtrar")
  
    let buscarTexto = textFilter.toUpperCase()
    let newArray;

    filtrarPor === "transportadora" && (newArray = guias.filter((guia) => guia.transportadora.toUpperCase().includes(buscarTexto)  ));
    filtrarPor === "fecha" && (newArray = guias.filter((guia) => guia.fecha === buscarTexto));
    filtrarPor === "numeroGuia" && (newArray = guias.filter((guia) => guia.numeroGuia == buscarTexto));
    filtrarPor === "id_heka" && (newArray = guias.filter((guia) => guia.id_heka == buscarTexto));

    console.log("sin guias para mostrar", newArray);
    if(newArray.length <= 0){
      Swal.fire("no se encontraron guias con estos datos")
    }else{
      dispatch(buscador(newArray))
      setTextFilter("")
    }
  }

  return (
    <div className="row text-center">
      <div className="col-sm-7">
        <Form>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                inline
                label="Fecha"
                onChange={() => setFiltrarPor("fecha")}
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Transportadora"
                name="group1"
                onChange={() => setFiltrarPor("transportadora")}
                type={type}
                id={`inline-${type}-2`}
              />
              <Form.Check
                inline
                label="Id-Heka"
                name="group1"
                onChange={() => setFiltrarPor("id_heka")}
                type={type}
                id={`inline-${type}-3`}
              />
              <Form.Check
                inline
                name="group1"
                label="Guia"
                onChange={() => setFiltrarPor("numeroGuia")}
                type={type}
                id={`inline-${type}-4`}
              />
              <Form.Check
                inline
                name="group1"
                label="todas"
                onChange={() => dispatch(getAllGuias())}
                type={type}
                id={`inline-${type}-4`}
              />
            </div>
          ))}
        </Form>
      </div>
      <form onSubmit={buscar} className="col-sm-5 buscador d-flex justify-content-center">
        <input 
        type="text" 
        placeholder="Search.."
        onChange={(e) => setTextFilter(e.target.value)}
        value={textFilter}
        />
        <button type="submit" className="buscador-icono">
          <FaSearch />
        </button>
        </form>
    </div>
  );
};

export default Buscador;
