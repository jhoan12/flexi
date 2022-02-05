import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuias } from "../../redux/actions/GuiasAction";
import { Nav } from "react-bootstrap";
import "./guias.css";
import TableGuias from "./TableGuias";
const Guias = () => {
  const dispatch = useDispatch();
  const { guias } = useSelector((state) => state.guias);
  const [data, setData] = useState(guias);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    guias.length <= 0 && dispatch(getAllGuias());
  }, [dispatch]);

  useEffect(() => {
    filtrar(filter);
  }, [guias])

  const filtrar = (filter) => {
    try {
      if (filter === "Proceso") {
        const newArray = guias.filter((guia) => !guia.recibidoEnPunto && !guia.entregadaDestinatario);
        setData(newArray);
      } else if (filter === "Recibidos") {
        const newArray = guias.filter((guia) => guia.recibidoEnPunto && !guia.entregadaDestinatario);
        setData(newArray);
      } else if (filter === "Entregados") {
        const newArray = guias.filter((guia) => guia.entregadaDestinatario);
        setData(newArray);
      } else {
        setData(guias);
      }
      setFilter(filter);
    } catch (error) {
      console.log(`ERROR en Guias.jsx en filtrar: ${error}`);
    }
  };


  return (
    <div className="container">
      <h2 className="text-center">Historial guías</h2>
      <Nav variant="pills"
        className="flex-nowrap overflow-auto"
        justify onSelect={filtrar} defaultActiveKey=""
      >
        <Nav.Item>
          <Nav.Link eventKey="" className="text-mutted">Todas</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Proceso">Proceso</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Recibidos">Recibidas</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Entregados">Entregadas</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-2">
        <TableGuias guias={data} filter={filter}/>
      </div>
    </div>
  );
};

export default Guias;