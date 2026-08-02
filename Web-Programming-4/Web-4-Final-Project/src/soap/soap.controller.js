const { getAll, getById, insert, update, remove } = require("./soap.data.service");
const Soap = require("./soap.model");

exports.getAllSoaps = async (req, res, next) => {
    try{
        const list = await getAll();
        res.json(list);
    }catch(err){ next(err); }
};

exports.getSoapById = async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0){
            res.status(400).json({ message: 'failed - invalid soap id - must be a number greater than 0' });
            return;
        }
        const row = await getById(id);
            if(row) res.status(200).json(row);
            else res.status(404).json({ message: 'failed - resource not found' });
    }catch(err){ next(err); }
};

exports.insertSoap = async (req, res, next) => {
    try{
        const soap = new Soap(req.body);
        const [isValid, errors] = soap.validate();
        if(!isValid){
            res.status(400).json({ message: 'failed - invalid', errors });
            return;
        }
            const id = await insert(soap);
            res.status(201).json({ message: 'success', id });
    }catch(err){ next(err); }
};

exports.updateSoap = async (req, res, next) => {
    try{
        const idParam = Number(req.params.id);
        const bodyId = Number(req.body?.soap_id);
        if(!Number.isInteger(idParam) || idParam <= 0){
            res.status(400).json({ message: 'failed - invalid soap id - must be a number greater than 0' });
            return;
        }
        if(idParam !== bodyId){
            res.status(400).json({ message: 'failed - id mismatch' });
            return;
        }

        const soap = new Soap(req.body);
        const [isValid, errors] = soap.validate();
        if(!isValid){
            res.status(400).json({ message: 'failed - invalid', errors });
            return;
        }
            const ok = await update(soap);
            res.status(ok ? 200 : 400).json({ message: ok ? 'success' : 'failed to update' });
    }catch(err){ next(err); }
};

exports.removeSoap = async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0){
            res.status(400).json({ message: 'failed - invalid soap id - must be a number greater than 0' });
            return;
        }
            const ok = await remove(id);
            res.status(ok ? 200 : 400).json({ message: ok ? 'success' : 'failed' });
    }catch(err) { next(err); }
};