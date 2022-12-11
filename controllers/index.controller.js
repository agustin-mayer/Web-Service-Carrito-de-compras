const { Pool } = require('pg');
const connectionString = 'postgres://mjfuexfu:v4WPYbmE_ox7wNWCct0loCHhh1O8CMmA@mel.db.elephantsql.com/mjfuexfu'

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const getProductsFromCategory = async (req, res) => {
    try {
        const categoria_id = req.params.id;
        if (!isNaN(categoria_id)) {
            const response = await pool.query('SELECT * FROM "Producto" WHERE "categoria_id" = $1', [categoria_id]);
            console.log(response.rows);
            res.json(response.rows);
        }
        else
            res.status(400).send("Debe insertar un valor entero para el ID")
    } catch (err) {
        res.status(404).send({
            "name": "Not Found qweqException",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getCategories = async (req, res) => {
    try {
        const response = await pool.query('SELECT "Nombre", "id" FROM "Categoria"');
        console.log(response.rows);
        res.json(response.rows);
    } catch (err) {
        res.status(404).send({
            "name": "eqwe",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getCart = async (req, res) => {
    try {
        const carrito_id = req.params.carrito_id;
        if (!isNaN(carrito_id)) {
            const response = await pool.query('SELECT * FROM "productos_en_carrito" WHERE "carrito_id" = $1', [carrito_id]);
            console.log(response.rows);
            res.json(response.rows);
        }
        else
            res.status(400).send("Debe insertar un valor entero para el ID")
    } catch (err) {
        res.status(404).send({
            "name": "qwe",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const addNewToCart = async (req, res) => {
    try {
        const producto_id = req.params.producto_id;
        const carrito_id = req.params.carrito_id;
        const cantidad = req.params.cantidad;
        const time = new Date();
        if (!isNaN(producto_id) && !isNaN(carrito_id) && !isNaN(cantidad)) {
            const existe = await pool.query('SELECT * FROM "productos_en_carrito" WHERE "producto_id" = $1', [producto_id]);
            console.log(existe.rows);
            if (existe.rowCount == 0) {
                await pool.query('INSERT INTO "productos_en_carrito" ("carrito_id","producto_id","cantidad","subtotal","created_at","updated_at") VALUES ($1, $2, $3, $3*(SELECT "Precio" FROM "Producto" WHERE "Codigo" = $2), $4, $4)', [carrito_id, producto_id, cantidad, time]);
                res.json(`Producto ${producto_id} agregado con exito`);
            }
            else {
                await pool.query('UPDATE "productos_en_carrito" SET "cantidad" = "cantidad" + $3, "subtotal" = ("cantidad" + $3) *(SELECT "Precio" FROM "Producto" WHERE "Codigo" = $2), "updated_at" = $4 WHERE ("carrito_id"= $1 AND "producto_id" = $2)', [carrito_id, producto_id, cantidad, time]);
                res.json(`Producto ${producto_id} actualizado en el carrito`);
            }
        }
        else
            res.status(400).send("Debe insertar un valor entero para los ID y la cantidad")
    } catch (err) {
        res.status(404).send({
            "name": "Not Fouqqnd Exception",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const modifyCuantityOfExistingInCart = async (req, res) => {
    try {
        const producto_id = req.params.producto_id;
        const carrito_id = req.params.carrito_id;
        const cantidad = req.params.cantidad;
        const time = new Date();
        if (!isNaN(producto_id) && !isNaN(carrito_id) && !isNaN(cantidad)) {
            const response = await pool.query('UPDATE "productos_en_carrito" SET "cantidad" = $3, "subtotal" = $3*(SELECT "Precio" FROM "Producto" WHERE "Codigo" = $2), "updated_at" = $4 WHERE ("carrito_id"= $1 AND "producto_id" = $2)', [carrito_id, producto_id, cantidad, time]);
            console.log(response);
            res.json(`Cantidad del producto: ${producto_id} modificada con exito`);
        }
        else
            res.status(400).send("Debe insertar un valor entero para los ID y la cantidad")
    } catch (err) {
        res.status(404).send({
            "name": "rte",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const producto_id = req.params.producto_id;
        const carrito_id = req.params.carrito_id;
        if (!isNaN(producto_id) && !isNaN(carrito_id)) {
            const response = await pool.query('DELETE FROM "productos_en_carrito" WHERE ("carrito_id"= $1 AND "producto_id" = $2)', [carrito_id, producto_id]);
            console.log(response);
            res.json(`Producto ${producto_id} eliminado con exito`);
        }
        else
            res.status(400).send("Debe insertar un valor entero para los ID")
    } catch (err) {
        res.status(404).send({
            "name": "qwe",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getImageFromCategory = async (req, res) => {
    try {
        const categoria_id = req.params.id;
        const base_64 = 'base64';
        const fs = require('fs');
        if (!isNaN(categoria_id)) {
            const response = await pool.query('SELECT encode("imagen",$2) FROM "Categoria" WHERE "id" = $1', [categoria_id, base_64]);
            var respuesta = Buffer.from(response.rows[0].encode, 'base64');
            var image = respuesta.toString('utf-8');
            let buffer = Buffer.from(image, 'base64');
            fs.writeFileSync('imagen.jpg', buffer, function (err) {
                console.log('File created');
            });
            const mimeType = 'image/jpg';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.write(buffer);
            res.end();
        }
        else
            res.status(400).send("Debe insertar un valor entero para los ID")
    } catch (err) {
        res.status(404).send({
            "name": "rw",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getImageFromProduct = async (req, res) => {
    try {
        const producto_id = req.params.id;
        const base_64 = 'base64';
        const fs = require('fs');
        if (!isNaN(producto_id)) {
            const response = await pool.query('SELECT encode("imagen",$2) FROM "Producto" WHERE "Codigo" = $1', [producto_id, base_64]);
            var respuesta = Buffer.from(response.rows[0].encode, 'base64');
            var image = respuesta.toString('utf-8');
            let buffer = Buffer.from(image, 'base64');
            fs.writeFileSync('imagen.jpg', buffer, function (err) {
                console.log('File created');
            });
            const mimeType = 'image/jpg';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.write(buffer);
            res.end();
        }
        else
            res.status(400).send("Debe insertar un valor entero para los ID")
    } catch (err) {
        res.status(404).send({
            "name": "Not Founewwd Exception",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}



const getProducts = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM "Producto"');
        response.rows = response.rows.map((row) => {
            if (row.imagen) {
                row.imagen = 'https://promo-iaw-web-service.vercel.app/producto/imagen/' + row.Codigo
            }
            return row
        })
        console.log(response.rows);
        res.json(response.rows);
    } catch (err) {
        res.status(404).send({
            "name": "tre",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getProduct = async (req, res) => {
    try {
        producto_id = req.params.id;
        if (!isNaN(producto_id)) {
            const response = await pool.query('SELECT * FROM "Producto" WHERE "Codigo"=$1', [producto_id]);
            response.rows = response.rows.map((row) => {
               /* if (row.imagen) {
                    row.imagen = 'https://promo-iaw-web-service.vercel.app/producto/imagen/' + row.Codigo
                }*/
                return row
            })
            console.log(response.rows);
            res.json(response.rows);
        }
        else
            res.status(400).send("No es valido el identificador, debe ser de tipo numerico");
    } catch (err) {
        res.status(404).send({
            "name": "rer",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getCategoryNames = async (req, res) => {
    try {
        const response = await pool.query('SELECT "Nombre" FROM "Categoria"');
        console.log(response.rows);
        res.json(response.rows);
    } catch (err) {
        res.status(404).send({
            "name": "wwer",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}

const getProductPagination = async (req, res) => {
        let cant = req.query.cant;
        let page = req.query.page;
        cant = cant || 4;
        page = page || 1;
        const offset = (page - 1) * cant;
        const response = await pool.query('SELECT * FROM "Producto" LIMIT $1 OFFSET $2', [cant, offset]);
        response.rows = response.rows.map((row) => {
            if (row.imagen) {
                row.imagen = 'https://promo-iaw-web-service.vercel.app/producto/imagen/' + row.Codigo
            }
            return row
        })
        const responseCant = await pool.query('SELECT COUNT("Nombre") FROM "Producto"');
        let count = parseInt(responseCant.rows[0].count);
        res.json({
            items : response.rows,
            cant : count
        });
   
}
module.exports = {
    getProductsFromCategory, getCategories, getImageFromCategory,
    getImageFromProduct, getProducts, getProduct, getCategoryNames, getProductPagination,
    getCart, addNewToCart, modifyCuantityOfExistingInCart, removeFromCart
}