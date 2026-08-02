const { getAll, getBySoap, getOne, insert, update, remove } = require('./soap.ingredient.data.service');
const SoapIngredient = require('./soap.ingredient.model');

const isPosInt = (n) => Number.isInteger(n) && n > 0; //validating - "is the number a positive integer" | used in URL params

// GET /soap-ingredient
exports.getAllSoapIngredient = async (req, res, next) => {
    try{
      const list = await getAll();
      return res.json(list);
    }catch(e){ return next(e); }
};

// GET /soap-ingredient/soap/:soapId
exports.getSoapIngredientForSoap = async (req, res, next) => {
    try{
      const soapId = Number(req.params.soapId);
      if(!isPosInt(soapId)){
        return res.status(400).json({ message: "failed - invalid soap id" });
      }
      const list = await getBySoap(soapId);
      return res.json(list);
    }catch(e){ return next(e); }  //reads the soap id and retrieves the data of ingredients linked to that soap, can return an empty array
};

// GET /soap-ingredient/:soapId/:ingredientId
exports.getSoapIngredientOne = async (req, res, next) => {
    try{
      const soapId = Number(req.params.soapId);
      const ingredientId = Number(req.params.ingredientId);

      if(!isPosInt(soapId) || !isPosInt(ingredientId)) {
        return res.status(400).json({ message: "failed - invalid ids" });
      }

      const row = await getOne(soapId, ingredientId);
      if(!row){
        return res.status(404).json({ message: "failed - resource not found" });
      }
      return res.json(row);
    }catch(e){ return next(e); }  //validates both id paths, retrieves the exact pair of soap-ingredient listed
};

// POST /soap-ingredient
exports.insertSoapIngredient = async (req, res, next) => {
    try{
      const si = new SoapIngredient(req.body);
      const [ok, errors] = si.validate();
      if(!ok){
        return res.status(400).json({ message: "failed - invalid", errors });
      }

      await insert(si);
      return res.status(201).json({ message: "success" });
    }catch(e){
      if(e && e.code === 'ER_DUP_ENTRY'){ //indentifies error involving duplicate entries
        return res.status(409).json({ message: "failed - duplicate pair (soap_id, ingredient_id)" });
      }
      if(e && e.code === 'ER_NO_REFERENCED_ROW_2') { // test to catch a bad request
        return res.status(400).json({ message: "failed - unknown soap_id or ingredient_id" });
      }
      return next(e);
    }  //unknown errors go to the middleware error handler
};

// PUT /soap-ingredient/:soapId/:ingredientId
exports.updateSoapIngredient = async (req, res, next) => {
    try{
      const soapId = Number(req.params.soapId);
      const ingredientId = Number(req.params.ingredientId);
      if(!isPosInt(soapId) || !isPosInt(ingredientId)){
        return res.status(400).json({ message: "failed - invalid ids" });
      }

      // enforce path/body identity
      const bodySoapId = Number(req.body?.soap_id);
      const bodyIngredientId = Number(req.body?.ingredient_id);
      if(soapId !== bodySoapId || ingredientId !== bodyIngredientId){
        return res.status(400).json({ message: "failed - id mismatch" });
      }

      const si = new SoapIngredient(req.body);
      const [ok, errors] = si.validate();
      if(!ok){
        return res.status(400).json({ message: "failed - invalid", errors });
      }

      const result = await update(si);
      return res.status(result ? 200 : 400).json({ message: result ? "success" : "failed to update" });
    }catch(e){
      if(e && /not found/i.test(e.message)){
        return res.status(404).json({ message: "failed - resource not found" });
      }
      return next(e);
    }
};

// DELETE /soap-ingredient/:soapId/:ingredientId
exports.removeSoapIngredient = async (req, res, next) => {
    try{
      const soapId = Number(req.params.soapId);
      const ingredientId = Number(req.params.ingredientId);
      if(!isPosInt(soapId) || !isPosInt(ingredientId)){
        return res.status(400).json({ message: "failed - invalid ids" });
      }

      const ok = await remove(soapId, ingredientId);
      return res.status(ok ? 200 : 400).json({ message: ok ? "success" : "failed" });
    }catch(e){ return next(e); }
};