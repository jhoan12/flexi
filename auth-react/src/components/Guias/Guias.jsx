import { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuias } from "../../redux/actions/GuiasAction";
import Buscador from "./Buscador";
import "./guias.css";
import TableGuias from "./TableGuias";
import Swal from "sweetalert2";
const Guias = () => {
  const dispatch = useDispatch();
  const { guias } = useSelector((state) => state.guias);
  const [data, setData] = useState([]);
  useEffect(() => {
    guias.length <= 0 && dispatch(getAllGuias());
    // for (let i = 0; i < 5; i++) {
    // dispatch(addGuia(2))
    // }
    // eslint-disable-next-line
  }, [dispatch]);
  useEffect(() => {
    filtrar("Historial");
    // eslint-disable-next-line
  }, [guias]);

  const filtrar = (filter) => {
    try {
      if (filter === "Proceso") {
        const newArray = guias.filter((guia) => !guia.recibidoEnPunto);
        setData(newArray);
      } else if (filter === "Punto") {
        const newArray = guias.filter((guia) => guia.recibidoEnPunto);
        setData(newArray);
      } else {
        setData(guias);
      }
    } catch (error) {
      console.log(`ERROR en Guias.jsx en filtrar: ${error}`);
    }
  };

  const buscar = (e) => {
    filtrar("Historial");
    console.log("soy el mensaje",e);
    const newArray = guias.filter((guia) => guia.transportadora == e);
    console.log(newArray);
    // if(newArray.length == 0){
    //   Swal.fire("no se encontraron guias")
    //   filtrar("Historial")
    // }else{
    //   setData(newArray)
    // }
    setData(newArray)
    // newArray.length == 0? (Swal.fire("Este paquete aun no ha sido registrado"), filtrar("Historial")) :setData(newArray);
  }
  return (
    <div className="container">
       <h2 className="text-center">Guías</h2>
      <Buscador/>
      <div className="row mt-4">
        <div
          onClick={() => filtrar("Historial")}
          className="col-4 text-center border historialPendientes"
        >
          <h3>Historial</h3>
        </div>
        <div
          onClick={() => filtrar("Proceso")}
          className="col-4 text-center border historialPendientes"
        >
          <h3>Proceso</h3>
        </div>
        <div
          onClick={() => filtrar("Punto")}
          className="col-4 text-center border historialPendientes"
        >
          <h3>Punto</h3>
        </div>
      </div>
      {guias.length < 1 ? (
        <div className="mt-5 text-center">
          {/* <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner> */}
          <h5>No hay registro de guías</h5>
        </div>
      ) : (
        <div className="text-center mt-2">
          <TableGuias guias={data} />
        </div>
      )}
    </div>
  );
};

export default Guias;
