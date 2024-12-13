const { Router } = require("express");
const router = Router();
const convert = require("xml-js");
const xmlbuilder = require('xmlbuilder');

const mysqlConnection = require("../database");

// Arbol XML de todos los empleados
router.get("/", (req, res) => {
  mysqlConnection.query("select * from empleados;", (err, rows, fields) => {

    if (!err) {
      data = rows.rows //Determinamos los datos despues de la consulta
      
      if (data.length > 0) {

        //Empezamos a construir el XML
        const root = xmlbuilder.create('empleados');

       data.forEach(row => {
        const empleado = root.element('empleado')
          empleado.ele('idEmpleado', row.idempleado)
          empleado.ele('nameEmpleado', row.nameempleado)
          empleado.ele('salarioEmpleado', row.salarioempleado)
          empleado.ele('cargoEmpleado', row.cargoempleado);
      });

              // Convert the XML to a string
      const xmlString = root.end({ pretty: true });
       res.header("Content-Type", "application/xml");
       res.send(xmlString);

      }
      else{

        res.send(convert.json2xml({ message: "No se encontraron empleados" }, { compact: true }));
      }
      
    } else {
      console.log(err);
    }
  });
});

// Arbol XML de los cargos de la tienda
router.get("/cargo", (req, res) => {
  mysqlConnection.query("Select * from empleados;", (err, rows, fields) => {
    if (!err) {
      const data = rows.rows
      const cargosAgrupados = {
        cargos: data.reduce((acc, empleado) => {
          let cargo = acc.find(
            (car) => car.nombreCargo === empleado.cargoempleado
          );

          if (!cargo) {
            acc.push({
            nombreCargo: empleado.cargoempleado,
            });
          } 

          return acc;
        }, []),
      };

      res.header("Content-Type", "application/xml");
      result = convert.js2xml(cargosAgrupados, { compact: true });
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

//Muestra el empleado por el id
router.get("/:id", (req, res) => {
  const { id } = req.params
  const sql =  `SELECT * FROM empleados WHERE idempleado = $1`
  mysqlConnection.query(
   sql,
    [id],
    (err, rows, fields) => {

        if (!err) {

        const data =  rows.rows
        //res.send(rows) 
        res.header("Content-Type", "application/xml");
        result = convert.json2xml(data, { compact: true });
        res.send(result);

        } else {
            console.error("Error en la consulta:", err);
            res.status(500).send("Error en el servidor");
        }
    }
);

});


//Creación o edición de un registro
router.post("/", (req, res) => {
  const { id, name, salary, cargo } = req.body;

  const query = `
        SELECT empleado_add_or_edit($1,$2,$3,$4)
            `;
  mysqlConnection.query(
    query,
    [id, name, salary, cargo],
    (err, rows, fields) => {
      if (!err) {
        res.send(
          convert.json2xml({ Status: "Empleado guardado" }, { compact: true })
        );
      } else {
        console.log(err);
      }
    }
  );
});


//Actualización de un registro
router.put("/:id", (req, res) => {
  const { name, salary, cargo } = req.body;
  const { id } = req.params;
  const query = `
        SELECT empleado_add_or_edit($1,$2,$3,$4);
          `;
  mysqlConnection.query(
    query,
    [id, name, salary, cargo],
    (err, rows, fields) => {
      if (!err) {
        res.send(
          convert.json2xml(
            { Status: "Empleado actualizado" },
            { compact: true }
          )
        );
      } else {
        console.log(err);
      }
    }
  );
});

// Eliminacion de un resgistro

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE from empleados where idempleado = $1",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.send(
          convert.json2xml({ Status: "Empleado Eliminado" }, { compact: true })
        );
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
