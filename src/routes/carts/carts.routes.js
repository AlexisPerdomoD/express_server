import { Router } from "express"
import CartMannagerM from "../../dao/db/CartMannagerM.js"

const cartRouter = Router()
const cM = new CartMannagerM()

//get cart by id
cartRouter.get("/", async(req, res) =>{
    if(!req.session.cart) return false
    const response = await cM.getCartById(req.session.cart)
    if(!response) return res.status(404).send({error:"no cart found"})
    response.error
    ? res.status(500).send(false)
    : res.send(response)
})

//update one product in the cart {quantity: Number} if quantity < 1 the product i'll be delete form cart
cartRouter.put("/product/:pid", async(req, res) => {
    const response = await cM.updateCartProduct(req.session.cart, req.params.pid, req.body.quantity)
    response.error
    ? res.status(404).send(response)
    : res.send(response)
})

//delete product directly
cartRouter.delete("/product/:pid", async (req, res) => {
    const response = await cM.deleteProductfromCart(req.session.cart, req.params.pid)
    response.error
    ? res.status(404).send(response)
    : res.send(response)
})

//delete cart
cartRouter.delete("/delete/:cid", async(req, res) =>{
    const response = await cM.deleteCartById(req.params.cid)
    response.error
    ? res.status(404).send(response)
    : res.send(response)
})

//get all carts
// cartRouter.get("/all", async (req, res) =>{
//     let response = await cM.getCarts()
//     response.error 
//     ? res.status(500).send(response)
//     : res.send(response)
// })

// // create a new cart with or without products ()
// cartRouter.post("/", async (req, res) =>{
//     const cartToAdd = req.body.cart
//     const response = await cM.addCart(cartToAdd)
//     response.error
//     ? res.status(400).send(response)
//     : res.send(response)
// })

export default cartRouter