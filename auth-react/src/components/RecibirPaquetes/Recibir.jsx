import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { actualizaEstadoGuiaUsuario, actualizarGuia, getAllGuias, guiasHistorial, recibirGuia } from "../../redux/actions/GuiasAction";
import ModalInfo from "./ModalInfo";

const RecibirPaquete = () => {
  const dispatch = useDispatch();
  const [numGuia, setnumGuia] = useState("");
  const { guias, id } = useSelector((state) => {
    return {
      guias: state.guias.guias,
      id: state.user.id
    }
  });

  const [guia, setGuia] = useState({})
  const [modalShow, setModalShow] = useState(false);

  const action = async (e) => {
    try {
      e.preventDefault();

      const res = await recibirGuia(numGuia, id);
      setGuia(res.guia);
      switch(res.type) {
        case "error": 
          setGuia(false);
          setnumGuia("");
          Swal.fire(res.swal);
          return;
        case "guardada":
          dispatch(actualizarGuia(res.actualizar, res.id_heka, res.id_doc));
          break;
        case "no guardada":
          dispatch(guiasHistorial(res.guia));
          break;
        default:
          const swRes = await Swal.fire(res.swal);
          if(swRes.isConfirmed) {
            dispatch(guiasHistorial(res.guia));
          } else {
            setGuia(false)
          }
      }
        
      setnumGuia("");
      setModalShow(true);
      actualizaEstadoGuiaUsuario(res.id_heka, res.guia.user_id, {
        estado: "Recibido oficina",
        seguimiento_finalizado: true
      });
      
    } catch (error) {
      console.log(`ERROR en Recibir.jsx en action: ${error}`)
    }
  };

  useEffect(() => {
    dispatch(getAllGuias());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Recibir Paquete</h1>
      <form onSubmit={action} className="boxCard p-5 my-4">
        <div className="row pe-1">
          <label className="form-label col-12">Numero Guia </label>
          <div className="col-6">
            <input
              type="number"
              required
              className=" form-control "
              value={numGuia}
              placeholder="Numero de guia"
              onChange={(e) => setnumGuia(e.target.value)}
            />
          </div>
          <Button type="submit" className="col-6" variant="dark">
            Ingresar
          </Button>
        </div>
      </form>

      {
        guia && <ModalInfo 
        show={modalShow}
        setModalShow={setModalShow}
        data={guia}
        />
      }
    </div>
  );
};

export default RecibirPaquete;
