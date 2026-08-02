const { getAll, getById, insert, update, remove } = require("./ingredient.data.service");
const Ingredient = require("./ingredient.model");

// GET /ingredients
exports.getAllIngredients = async (req, res, next) => {
    try{
        const all = await getAll();
        res.json(all);
    }catch(err){
        next(err);
    }
};

// GET /ingredients/:id
exports.getIngredientById = async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        
        if(!Number.isInteger(id) || id <= 0){
            res.status(400).json({ message: "failed - invalid ingredient id - must be a number greater than 0" });
            return;
        }

        const ingredient = await getById(id);

        if(ingredient){
            res.status(200).json(ingredient);
        }else{
            res.status(404).json({ message: "failed - resource not found" });
        }
    }catch(err){
        next(err);
    }
};

// POST /ingredients
exports.insertIngredient = async (req, res, next) => {
    try{
        const ingredient = new Ingredient(req.body);

        const [isValid, errors] = ingredient.validate();

        if(!isValid){
            res.status(400).json({ message: "failed - invalid", errors });
            return;
        }

        const newId = await insert(ingredient);
       
        res.status(201).json({ message: "success", id: newId });

    }catch(err){
        next(err);
    }
};

// PUT /ingredients/:id
exports.updateIngredient = async (req, res, next) => {
    try{
        const idParam = Number(req.params.id);
        const bodyId = Number(req.body?.ingredient_id);

        if(!Number.isInteger(idParam) || idParam <= 0){
            res.status(400).json({ message: "failed - invalid ingredient id - must be a number greater than 0" });
            return;
        }

        if(idParam !== bodyId){
            res.status(400).json({ message: "failed - id mismatch" });
            return;
        }

        const ingredient = new Ingredient(req.body);
        const [isValid, errors] = ingredient.validate();

        if(!isValid){
            res.status(400).json({ message: "failed - invalid", errors });
            return;
        }

        const result = await update(ingredient);
        if(result === true){
            res.status(200).json({ message: "success" });
        }else {
            res.status(400).json({ message: "failed to update" });
        }

    }catch(err){
        next(err);
    }
};

// DELETE /ingredients/:id
exports.removeIngredient = async (req, res, next) => {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            res.status(400).json({ message: "failed - invalid ingredient id - must be a number greater than 0" });
            return;
        }

        const result = await remove(id);

        if (result === true) {
            res.status(200).json({ message: "success" });
        }else{
            res.status(400).json({ message: "failed" });
        }
        
    }catch(err){
        next(err);
    }
};