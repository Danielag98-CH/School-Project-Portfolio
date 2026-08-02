const express = require("express");
const router = express.Router();

const {
    getAllIngredients,
    getIngredientById,
    insertIngredient,
    updateIngredient,
    removeIngredient
} = require("./ingredient.controller");


router.get("/", getAllIngredients);

router.get("/:id", getIngredientById);

router.post("/", insertIngredient);

router.put("/:id", updateIngredient);

router.delete("/:id", removeIngredient);

module.exports = router;