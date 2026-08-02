const express = require('express');
const {
  getAllSoapIngredient,
  getSoapIngredientForSoap,
  getSoapIngredientOne,
  insertSoapIngredient,
  updateSoapIngredient,
  removeSoapIngredient
} = require('./soap.ingredient.controller');

const router = express.Router();

// collection
router.get('/', getAllSoapIngredient);

// all ingredients for a single soap
router.get('/soap/:soapId', getSoapIngredientForSoap);

// a single soap and ingredient pair
router.get('/:soapId/:ingredientId', getSoapIngredientOne);

// create / update / delete a pair
router.post('/', insertSoapIngredient);
router.put('/:soapId/:ingredientId', updateSoapIngredient);
router.delete('/:soapId/:ingredientId', removeSoapIngredient);

module.exports = router;