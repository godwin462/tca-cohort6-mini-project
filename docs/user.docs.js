/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "All users available and the total is: 10"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The user ID.
 *                         example: "5f8f8f8f8f8f8f8f8f8f8f8f"
 *                       fullName:
 *                         type: string
 *                         description: The user's full name.
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         description: The user's email address.
 *                         example: "j8h4g@example.com"
 *                       phoneNumber:
 *                         type: string
 *                         description: The user's phone number.
 *                         example: "+2348012345678"
 *                       age:
 *                         type: number
 *                         description: The user's age.
 *                         example: 30
 *                       isVerified:
 *                         type: boolean
 *                         description: The user's verification status.
 *                         example: true
 *                       isAdmin:
 *                         type: boolean
 *                         description: The user's admin status.
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         description: The user's creation date.
 *                         example: "2020-01-01T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         description: The user's last update date.
 *                         example: "2020-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Promote a user to admin
 *     description: Allows an authenticated admin to grant admin privileges to a user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to promote
 *         schema:
 *           type: string
 *           example: 652f4c9c1b2e4e001f8a2e6c
 *     responses:
 *       200:
 *         description: User successfully promoted to admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User has been promoted to admin successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 652f4c9c1b2e4e001f8a2e6c
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-17T11:45:32.451Z
 */
