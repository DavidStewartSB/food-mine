import { Router} from 'express';
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from '../../constants/http_status';
import { OrderModel } from '../../models/orders/Order.model';
import { OrderStatus } from '../../constants/order_status';
import authMid from '../../middlewares/auth.mid';

const router = Router();
router.use(authMid)

router.post('/create', asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body

    if(requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Carrinho está vazio') 
        return;
    }
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    })

    const newOrder = new OrderModel(({...requestOrder, user: req.user.id}))
    await newOrder.save()
    res.send(newOrder);
}))

router.get('/novoPedido', asyncHandler(async (req: any, res: any) => {
    const order = await OrderModel.findOne({
        user: req.user.id, status: OrderStatus.NEW
    })

    if(order) res.send(order)
    else res.status(HTTP_BAD_REQUEST).send()
}))
router.post('/pay', asyncHandler(async (req: any, res: any) => {
    const {paymentId} = req.body;
    const order = await (getNewOrderForCurrentUser(req));

    if(!order) {
        res.status(HTTP_BAD_REQUEST).send('Falha no pedido')
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id)

}))

router.get('/track/:id', asyncHandler(async (req: any, res: any) => {
    const order = await OrderModel.findById(req.params.id)

    res.send(order);
}))


export default router;

async function getNewOrderForCurrentUser(req: any) {
    return OrderModel.findOne({
        user: req.user.id, status: OrderStatus.NEW
    })
}