import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Formulario from "../components/Formulario";

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
 
      setCargando(false);        
      
    };

    obtenerClienteAPI();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>

      <p className="mt-3">
        Utiliza este formulario para editar los datos de un cliente
      </p>

      {cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p>Cliente id no valido</p>}
    </>
  );
};
export default EditarCliente;
