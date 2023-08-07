import { Router } from "express"
import AsynceHandler from "express-async-handler"
import { FoodModel } from "../../models/foods/Food.model"

const router = Router()

router.get("/", AsynceHandler ( async (req, res) => {
    const foods = await FoodModel.find()
    res.send(foods)
}))

router.get("/search/:searchTerm", AsynceHandler (async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i')
    const foods = await FoodModel.find({name: {$regex: searchRegex}})
    res.send(foods)
}))

router.get("/tags", AsynceHandler ( async (req, res) => {
    const tags = await FoodModel.aggregate([
        {
            $unwind: "$tags" //2 foods 3 tags, unwind tags => 6 foods tags 1
        },
        {
            $group: {
                _id: '$tags',
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count: '$count'
            }
        }
    ]).sort({count: -1}) //do maior para o menor

    const all = {
        name: 'All',
        count: await FoodModel.countDocuments()
    }
    tags.unshift(all)
    res.send(tags)
}))

router.get("/tag/:tagName", AsynceHandler (async (req, res) => {
   const foods = await FoodModel.find({tags: req.params.tagName})

    res.send(foods)
}))

router.get("/:foodId", AsynceHandler( async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId) 
    res.send(food)
}))


export default router;