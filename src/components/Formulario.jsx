import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El Nombre del Cliente es Obligatorio"),
    empresa: Yup.string().required("El nombre de la Empresa es Obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es Obligatorio"),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("Numero no valido"),
  });

  const handleSubmit = async (valores) => {
    try {

      let respuesta 
      if (cliente.id) {
        // Editando Cliente
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } else {
        // Nuevo Cliente
        const url = "http://localhost:4000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();

      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label htmlFor="nombre" className="text-gray-800">
                Nombre:
              </label>
              <Field
                id="nombre"
                type="text"
                className="bg-gray-50 mt-2 block w-full p-3"
                placeholder="Nombre del Cliente"
                name="nombre"
              />

              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="empresa" className="text-gray-800">
                Empresa:
              </label>
              <Field
                id="empresa"
                type="text"
                className="bg-gray-50 mt-2 block w-full p-3"
                placeholder="Empresa del Cliente"
                name="empresa"
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-800">
                E-mail:
              </label>
              <Field
                id="email"
                type="email"
                className="bg-gray-50 mt-2 block w-full p-3"
                placeholder="Email del Cliente"
                name="email"
              />
              {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="telefono" className="text-gray-800">
                Telefono:
              </label>
              <Field
                id="telefono"
                type="tel"
                className="bg-gray-50 mt-2 block w-full p-3"
                placeholder="Telefono del Cliente"
                name="telefono"
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="notas" className="text-gray-800">
                Notas:
              </label>
              <Field
                as="textarea"
                id="notas"
                type="text"
                className="bg-gray-50 mt-2 block w-full p-3 h-40"
                placeholder="Notas del Cliente"
                name="notas"
              />
            </div>

            <input
              type="submit"
              value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
              className="bg-blue-800 mt-5 w-full text-white p-3 text-xl font-bold uppercase"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
