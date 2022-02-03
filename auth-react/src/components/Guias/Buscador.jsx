import React from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Buscador = () => {
  return (
    <div className="row text-center">
      <div className="col-7">
        <Form>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                inline
                label="Fecha"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Transportadora"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
              />
              <Form.Check
                inline
                label="Id-Heka"
                name="group1"
                type={type}
                id={`inline-${type}-3`}
              />
              <Form.Check
                inline
                name="group1"
                label="Guia"
                type={type}
                id={`inline-${type}-4`}
              />
            </div>
          ))}
        </Form>
      </div>
      <div className="col-5 buscador ">
        <input type="search" placeholder="Search.." />
        <button type="submit" className="buscador-icono">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Buscador;
