const router = require("express").Router();

router.use((req, res, next) => {
    console.log("This is a product middleware")
})

// router.get("/", (req, res,) => {
//     res.send("This is the products home page function");
//     next();
// })

const {someProductMiddleware} = require("./product.middleware");
router.use(someProductMiddleware);


router.get("/widgets", (req, res) => {
    res.send("This is the widgets page");
})

module.exports = router;