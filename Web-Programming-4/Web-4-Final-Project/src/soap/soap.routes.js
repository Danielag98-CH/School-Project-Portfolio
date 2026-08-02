const express = require('express');
const router = express.Router();

const { getAllSoaps, getSoapById, insertSoap, updateSoap, removeSoap } = require("./soap.controller");

router.get('/', getAllSoaps);

router.get('/:id', getSoapById);

router.post('/', insertSoap);

router.put('/:id', updateSoap);

router.delete('/:id', removeSoap);

module.exports = router;