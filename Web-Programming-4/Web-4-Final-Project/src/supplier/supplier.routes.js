const express = require("express");
const router = express.Router();

const {
    getAllSuppliers,
    getSupplierById,
    insertSupplier,
    updateSupplier,
    removeSupplier
} = require("./supplier.controller");


router.get("/", getAllSuppliers);


router.get("/:id", getSupplierById);


router.post("/", insertSupplier);


router.put("/:id", updateSupplier);


router.delete("/:id", removeSupplier); /// need to update this to be only Admin ability

module.exports = router;
