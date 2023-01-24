import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = Router();

router.get('/', OrderController.index);
router.post('/newOrder', OrderController.create);
router.delete('/deleteOrder/:id', OrderController.deleted);
router.get('/:id', OrderController.findById);
router.put('/update', OrderController.updated);
router.patch('/update', OrderController.updatedDelivered);
router.get('/total/:client', OrderController.findClientSumOrders);

export default router;