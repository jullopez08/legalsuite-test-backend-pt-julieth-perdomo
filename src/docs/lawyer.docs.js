/**
 * @swagger
 * tags:
 *   name: Lawyers
 *   description: Gestión de abogados
 */

/**
 * @swagger
 * /api/lawyers:
 *   post:
 *     summary: Crear un abogado
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - specialization
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               specialization:
 *                 type: string
 *                 example: Penal
 *     responses:
 *       201:
 *         description: Abogado creado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos
 */

/**
 * @swagger
 * /api/lawyers:
 *   get:
 *     summary: Obtener todos los abogados
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de abogados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   specialization:
 *                     type: string
 */

/**
 * @swagger
 * /api/lawyers/{id}:
 *   get:
 *     summary: Obtener un abogado por ID
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del abogado
 *     responses:
 *       200:
 *         description: Abogado encontrado
 *       404:
 *         description: Abogado no encontrado
 */
