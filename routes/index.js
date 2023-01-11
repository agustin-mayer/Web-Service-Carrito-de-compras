const { Router } = require('express');
const router = Router();


const {
    getProductsFromCategory, getCategories, getImageFromCategory,
    getImageFromProduct, getProducts, getProduct, getCategoryNames, getProductPagination,
    getCart, addNewToCart, modifyCuantityOfExistingInCart, removeFromCart
} = require('../controllers/index.controller');

const webpush = require('./webpush')
let pushSubscription

//para subscribir al usuario (escucha la primer subscripcion con el usuario)
router.post('/subscription', async (req,res) => {
   
})
/**
 * @swagger
 * /categorias:
 *  get:
 *    description: Obtiene todas las categorias
 *    tags:
 *      - Categorias
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '404':
 *        description: No encontrado
 *      default:
 *        description: Error inesperado
 *
 */
router.get('/categorias', getCategories);

/**
 * @swagger
 * /categoria/{id}:
 *  get:
 *    description: Obtiene una categoria especifica por su id
 *    tags:
 *      - Categoria
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de la categoria
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID de la categoria
 *      default:
 *        description: Error inesperado
 */
router.get('/categoria/:id', getProductsFromCategory);

/**
 * @swagger
 * /categoria/imagen/{id}:
 *  get:
 *    description: Obtiene la imagen de la categoria especificada por su id
 *    tags:
 *      - Imagen
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de la categoria
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID de la categoria
 *      default:
 *        description: Error inesperado
 */
router.get('/categoria/imagen/:id', getImageFromCategory);

/**
 * @swagger
 * /carrito/{carrito_id}:
 *  get:
 *    description: Obtiene un carrito especificado por su ID
 *    tags:
 *      - Carrito
 *    parameters:
 *      - in: path
 *        name: carrito_id
 *        description: id del carrito
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID del carrito
 *      default:
 *        description: Error inesperado
 */
router.get('/carrito/:carrito_id', getCart);

/**
 * @swagger
 * /addnewtocart/{carrito_id}/{producto_id}/{cantidad}:
 *  get:
 *    description: Agrega cierta cantidad de un producto al carrito
 *    tags:
 *      - Agregar
 *    parameters:
 *      - in: path
 *        name: carrito_id
 *        description: id del carrito
 *        required: true
 *        schema:
 *          type: integer
 *      - in: path
 *        name: producto_id
 *        description: id del producto
 *        required: true
 *        schema:
 *          type: integer
 *      - in: path
 *        name: cantidad
 *        description: cantidad del producto especificado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID de la categoria
 *      default:
 *        description: Error inesperado
 */
router.get('/addnewtocart/:carrito_id/:producto_id/:cantidad', addNewToCart);

/**
 * @swagger
 * /modifyincart/{carrito_id}/{producto_id}/{cantidad}:
 *  get:
 *    description: Modifica la cantidad de un producto al carrito
 *    tags:
 *      - Modificar
 *    parameters:
 *      - in: path
 *        name: carrito_id
 *        description: id del carrito
 *        required: true
 *        schema:
 *          type: integer
 *      - in: path
 *        name: producto_id
 *        description: id del producto
 *        required: true
 *        schema:
 *          type: integer
 *      - in: path
 *        name: cantidad
 *        description: cantidad del producto especificado
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID de la categoria
 *      default:
 *        description: Error inesperado
 */
router.get('/modifyincart/:carrito_id/:producto_id/:cantidad', modifyCuantityOfExistingInCart);

/**
 * @swagger
 * /removefromcart/{carrito_id}/{producto_id}:
 *  get:
 *    description: Elimina un producto del carrito
 *    tags:
 *      - Eliminar
 *    parameters:
 *      - in: path
 *        name: carrito_id
 *        description: id del carrito
 *        required: true
 *        schema:
 *          type: integer
 *      - in: path
 *        name: producto_id
 *        description: id del producto
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID de la categoria
 *      default:
 *        description: Error inesperado
 */
router.delete('/removefromcart/:carrito_id/:producto_id', removeFromCart);




/**
 * @swagger
 * /producto/imagen/{id}:
 *  get:
 *    description: Obtiene la imagen del producto especificada por su id
 *    tags:
 *      - Imagen
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del producto
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID del producto
 *      default:
 *        description: Error inesperado
 */
router.get('/producto/imagen/:id', getImageFromProduct);

/**
* @swagger
* /productos:
*  get:
*    description: Obtiene todos los productos
*    tags:
*      - productos
*    responses:
*      '200':
*        description: Respuesta exitosa
*      '404':
*        description: No encontrado
*      default:
*        description: Error inesperado
*
*/
router.get('/productos', getProducts);
/**
 * @swagger
 * /producto/{id}:
 *  get:
 *    description: Obtiene el producto especificado por su id
 *    tags:
 *      - Producto
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del producto
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: ID invalido
 *      '404':
 *        description: No se encuentra el ID del producto
 *      default:
 *        description: Error inesperado
 */
router.get('/producto/:id', getProduct);

/**
* @swagger
* /categorias/nombres:
*  get:
*    description: Obtiene los nombres de las categorias
*    tags:
*      - nombres
*    responses:
*      '200':
*        description: Respuesta exitosa
*      '404':
*        description: No encontrado
*      default:
*        description: Error inesperado
*
*/
router.get('/categorias/nombres', getCategoryNames);

/**
 * @swagger
 * /paginaton:
 *  get:
 *    description: Obtiene todos los productos en paginas
 *    tags:
 *      - productos
 *    parameters:
 *      - in: query
 *        name: page
 *        description: pagina
 *        required: true
 *        schema:
 *          type: integer
 *      - in: query
 *        name: cant
 *        description: cantidad de productos
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '404':
 *        description: No encontrado
 *      default:
 *        description: Error inesperado
 *
 */
router.get('/pagination', getProductPagination);
module.exports = router;
