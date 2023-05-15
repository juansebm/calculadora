let operacionActual = "";
let num1 = null;
let num2 = null;

function agregarDigito(digito) {
  const visor = document.getElementById("visor");
  visor.value += digito;
}

function borrar() {
  const visor = document.getElementById("visor");
  visor.value = visor.value.slice(0, -1);
}

function operacion(op) {
  const visor = document.getElementById("visor");
  const operadorValido = /^[+\-*/]$/;

  if (operadorValido.test(op)) {
    if (op === "-" && visor.value === "") {
      visor.value = "-";
    } else {
      num1 = parseFloat(visor.value);
      visor.value += op;
      operacionActual = op;
    }
  }
}

function enviarSolicitud(operator) {
  const visor = document.getElementById("visor");

  if (operacionActual !== "" && visor.value !== "") {
    if (operacionActual === "/" && parseFloat(visor.value.substring(num1.toString().length + 1)) === 0) {
      visor.value = "Error: División por cero";
      return Promise.reject("Error: División por cero");
    }

    let url = "";
    let method = "";

    if (operacionActual === "+" || operacionActual === "*") {
      num2 = parseFloat(visor.value.substring(num1.toString().length + 1));
      url = `http://localhost:3000/suma/${num1}/${num2}`;
      method = "GET";
    } else if (operacionActual === "-" || operacionActual === "/") {
      num2 = parseFloat(visor.value.substring(num1.toString().length + 1));
      url = `http://localhost:3000/resta`;
      method = "POST";
      const numeros = {
        num1: num1,
        num2: num2,
      };
      return fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(numeros),
      })
        .then((response) => response.json())
        .then((data) => {
          visor.value = data.status === "success" ? data.resultado.toString() : `Error: ${data.resultado}`;
          return data.status === "success" ? data.resultado : `Error: ${data.resultado}`;
        })
        .catch((error) => {
          console.error("Error:", error);
          return Promise.reject(error);
        });
    }
  }

  return Promise.reject("No hay operación actual o el visor está vacío");
}

export { agregarDigito, borrar, operacion, enviarSolicitud };
