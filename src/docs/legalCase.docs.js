/**
 * @swagger
 * tags:
 *   name: LegalCases
 *   description: Gestión de casos legales
 */

/**
 * @swagger
 * /api/legal-cases:
 *   post:
 *     summary: Crear un caso legal
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Caso de fraude
 *               description:
 *                 type: string
 *                 example: Investigación por fraude financiero
 *     responses:
 *       201:
 *         description: Caso creado correctamente
 */

/**
 * @swagger
 * /api/legal-cases:
 *   get:
 *     summary: Obtener todos los casos
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos
 */

/**
 * @swagger
 * /api/legal-cases/{id}:
 *   get:
 *     summary: Obtener un caso por ID
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso no encontrado
 */

/**
 * @swagger
 * /api/legal-cases/{id}/assign:
 *   patch:
 *     summary: Asignar abogado a un caso
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lawyerId
 *             properties:
 *               lawyerId:
 *                 type: string
 *                 example: 123e4567
 *     responses:
 *       200:
 *         description: Abogado asignado
 */

/**
 * @swagger
 * /api/legal-cases/{id}/transfer:
 *   put:
 *     summary: Transferir caso a otro abogado
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newLawyerId
 *             properties:
 *               newLawyerId:
 *                 type: string
 *                 example: 987e6543
 *     responses:
 *       200:
 *         description: Caso transferido
 */
