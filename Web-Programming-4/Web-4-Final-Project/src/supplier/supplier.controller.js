const { getAll, getById, insert, update, remove } = require("./supplier.data.service");
const Supplier = require("./supplier.model");

exports.getAllSuppliers = async (req, res, next) => {
    try{
        const allSuppliers = await getAll();
        res.json(allSuppliers);
    }catch(err){
        next(err);
    }
};

exports.getSupplierById = async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ message: "failed - invalid supplier id - must be a number greater than 0" });
            return;
        }

        const supplier = await getById(id);
        if(supplier){
            res.status(200).json(supplier);
        }else{
            res.status(404).json({ message: "failed - resource not found" });
        }
    }catch(err){
        next(err);
    }
};

exports.insertSupplier = async (req, res, next) => {
    try{
        const supplier = new Supplier(req.body);

        const [isValid, errors] = supplier.validate();
        if(!isValid){
            res.status(400).json({ message: "failed - invalid", errors });
            return;
        }

        const supplierId = await insert(supplier);
        res.status(201).json({ message: "success", id: supplierId });
    }catch(err){
    next(err);
    }
};

exports. updateSupplier = async (req, res, next) => {
    try{
        const id = req.params.id;

        if(id != req.body?.id) {
            res.status(400).json({ message: "failed - id mismatch" });
            return;
        }

        const supplier = new Supplier(req.body);
        const [isValid, errors] = supplier.validate();
        if(!isValid){
            res.status(400).json({ message: "failed - invalid", errors });
            return;
        }

        const result = await update(supplier);
        if(result === true){
            res.status(200).json({ message: "success" });
        }else{
            res.status(400).json({ message: "failed to update" });
        }
    }catch(err){
        next(err);
    }
};

exports.removeSupplier = async (req, res, next) => {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            res.status(400).json({ message: "failed - invalid supplier id - must be a number greater than 0" });
            return;
        }

        const result = await remove(id);
        if(result === true){
            res.status(200).json({ message: "success" });
        }else{
            res.status(400).json({ message: "failed" });
        }
    }catch(err){
        next(err);
    }
};
