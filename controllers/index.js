const router = require('express').Router();

router.get('/', (req, res) => {
	res.send("Main page");
});

module.exports = router;