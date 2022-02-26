import React, { createRef } from "react";
import ReactDOM from "react-dom";
import { FaAsterisk } from "react-icons/fa";
import Pdf from "react-to-pdf";
import "./pdf.css";

const ReactTopPdf = () => {
  const ref = createRef();
  // const options = {
  //     orientation: 'landscape',
  //     unit: 'in',
  //     format: [4, 2]
  // }
  return (
    <div className="container">
      <div className="text-center mb-4">
        <Pdf
          targetRef={ref}
          filename="Guia-Heka.pdf"
          x={1.8}
          y={0.7}
          scale={0.7}
        >
          {({ toPdf }) => (
            <button className="btn btn-primary" onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf>
      </div>
      <div ref={ref}>
        <div className="padre card ">
          <div className="encabezado d-flex justify-content-between card-header">
            <FaAsterisk />
            <div className="">
              <h6>Contenido</h6>
              <p>algo</p>
            </div>
            <div className="">
              <h6>Numero de pedido</h6>
              <p>6</p>
            </div>
            <div className="">
              <h6>Guia de Envio No</h6>
              <p>132456789</p>
            </div>
          </div>
          <div className="card-body d-flex">
            <div className="cuerpo">
              <h3>Remitente:</h3>
              <ul>
                <li>
                  Tienda
                  <span>Heka</span>
                </li>
                <li>
                  Direccion:
                  <span>Cll 123 N#12-34</span>
                </li>
                <li>
                  Telefono:
                  <span>123456789</span>
                </li>
              </ul>
            </div>
            <div className="cuerpo">
              <h3>Destinatario:</h3>
              <ul>
                <li>
                  Nombre
                  <span>Raul</span>
                </li>
                <li>
                  Direccion:
                  <span>Cll 123 N#12-34</span>
                </li>
                <li>
                  Telefono:
                  <span>123456789</span>
                </li>
              </ul>
            </div>
            <div className="cuerpo">
              <h1>Codigo qr</h1>
            </div>
          </div>
          <div className="pie"></div>
        </div>
      </div>
    </div>
  );
};

export default ReactTopPdf;
