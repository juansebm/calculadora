import React from "react";
import "./App.css";
import "./calculadora.css";
import {
  agregarDigito,
  borrar,
  operacion,
  enviarSolicitud,
} from "./script";


function handleKeyDown(event) {
  if (event.key === "Enter" || event.key === "=") {
    // Obtener el operador del visor
    const operator = event.key;

    // Enviar la solicitud al servidor y mostrar el resultado en el visor
    enviarSolicitud(operator)
      .then((resultado) => {
        document.getElementById("visor").value = resultado; // Actualizar el visor con el resultado
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("visor").value = "Error: " + error; // Mostrar el error en el visor
      });
  } else if (/[-+*/0-9]/.test(event.key)) {
    // Permitir solo caracteres numéricos, operadores y "-"
    // Borrar el visor para ingresar una nueva operación
    document.getElementById("visor").value = "";
  } else {
    // Bloquear cualquier otro carácter
    event.preventDefault();
  }
}

function App() {
  return (
    <div>
      <title>Calculadora</title>
      <link rel="stylesheet" type="text/css" href="calculadora.css" />
      <div className="calculator">
        <div className="history" id="historial" />
        <input type="text" id="visor" disabled onKeyDown={handleKeyDown} />
        <div className="buttons">
          <div className="row">
            <button onClick={() => agregarDigito(7)}>7</button>
            <button onClick={() => agregarDigito(8)}>8</button>
            <button onClick={() => agregarDigito(9)}>9</button>
            <button onClick={() => operacion("*")}>*</button>
          </div>
          <div className="row">
            <button onClick={() => agregarDigito(4)}>4</button>
            <button onClick={() => agregarDigito(5)}>5</button>
            <button onClick={() => agregarDigito(6)}>6</button>
            <button onClick={() => operacion("+")}>+</button>
          </div>
          <div className="row">
            <button onClick={() => agregarDigito(1)}>1</button>
            <button onClick={() => agregarDigito(2)}>2</button>
            <button onClick={() => agregarDigito(3)}>3</button>
            <button onClick={() => operacion("-")}>-</button>
          </div>
          <div className="row">
            <button onClick={() => agregarDigito(0)}>0</button>
            <button onClick={() => borrar()}>C</button>
            <button onClick={() => operacion("/")}>/</button>
            <button className="big-button" onClick={() => enviarSolicitud("=")}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
