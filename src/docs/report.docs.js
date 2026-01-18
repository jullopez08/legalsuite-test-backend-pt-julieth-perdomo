/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reportes del sistema
 */

/**
 * @swagger
 * /api/reports/lawyer/{lawyerId}/cases:
 *   get:
 *     summary: Obtener casos asignados a un abogado
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lawyerId
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567
 *     responses:
 *       200:
 *         description: Lista de casos del abogado
 *       404:
 *         description: Abogado no encontrado
 */
