import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getAllGuias, recibirGuia } from "../../redux/actions/GuiasAction";
import ModalInfo from "./ModalInfo";

const RecibirPaquete = () => {
  const dispatch = useDispatch();
  const [numGuia, setnumGuia] = useState("");
  const { guias } = useSelector((state) => state.guias);
  const [guia, setGuia] = useState({})
  const [modalShow, setModalShow] = useState(false);

  const action = (e) => {
    try {
      e.preventDefault();
      const guia = guias.filter((guia) => guia.id_heka === numGuia);
      if(guia.length === 0){
        setGuia(false)
        Swal.fire(`Guía NO Encontrada`)
        setnumGuia("");
        return 
      }
      dispatch(recibirGuia(numGuia));
      setnumGuia("");
      setGuia(guia[0])
      setModalShow(true) 
    } catch (error) {
      console.log(`ERROR en Recibir.jsx en action: ${error}`)
    }
  };
  useEffect(() => {
    guias.length <= 0 && dispatch(getAllGuias());
    // eslint-disable-next-line
  }, [guias]);

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
