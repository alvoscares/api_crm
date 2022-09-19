import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";


const VerCliente = () => {
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
    <div>
      {cargando ? (
        <Spinner/>
      ) : Object.keys(cliente).length === 0 ? (
        <h1 className="font-black text-4xl text-blue-900">No hay Resultados</h1>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">Ver Cliente</h1>

          <p className="mt-3">Informacion del Cliente</p>

          <p className="text-4xl text-gray-600 mt-10">
            <span className="uppercase font-bold text-gray-800">Cliente: </span>
            {cliente.nombre}
          </p>

          <p className="text-2xl text-gray-600 mt-4">
            <span className="uppercase font-bold text-gray-800">Email: </span>
            {cliente.email}
          </p>

          <p className="text-2xl text-gray-600 mt-4">
            <span className="uppercase font-bold text-gray-800">
              Telefono:{" "}
            </span>
            {cliente.telefono}
          </p>
          <p className="text-2xl text-gray-600 mt-4">
            <span className="uppercase font-bold text-gray-800">Empresa: </span>
            {cliente.empresa}
          </p>
          {cliente.notas && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="uppercase font-bold text-gray-800">Notas: </span>
              {cliente.notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default VerCliente;
