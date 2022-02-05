import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuias, addGuia } from "../../redux/actions/GuiasAction";
import "./guias.css";
import TableGuias from "./TableGuias";
const Guias = () => {
  const dispatch = useDispatch();
  const { guias } = useSelector((state) => state.guias);
  const [data, setData] = useState([]);
  useEffect(() => {
    guias.length <= 0 && dispatch(getAllGuias());
    // for (let i = 1; i < 20; i++) {
    //   dispatch(addGuia(i))
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
        console.log(newArray);
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

  
  return (
    <div className="container">
       <h2 className="text-center">Guías</h2>
      
      <div className="row mt-4 d-flex justify-content-center">
        <div
          onClick={() => filtrar("Historial")}
          className="col-5 col-sm-4 col-lg-3 text-center border historialPendientes"
        >
          <h3>Todas</h3>
        </div>
        <div
          onClick={() => filtrar("Proceso")}
          className="col-5 col-sm-4 col-lg-3 text-center border historialPendientes"
        >
          <h3>Proceso</h3>
        </div>
        <div
          onClick={() => filtrar("Recibidos")}
          className="col-5 col-sm-4 col-lg-3 text-center border historialPendientes"
        >
          <h3>Recibidos</h3>
        </div>
        <div
          onClick={() => filtrar("Entregados")}
          className="col-5 col-sm-4 col-lg-3 text-center border historialPendientes"
        >
          <h3>Entregados</h3>
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