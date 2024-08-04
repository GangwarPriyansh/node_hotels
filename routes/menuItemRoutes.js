const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu');

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const response = await MenuItem.create(data)
        console.log("data saved successfully")
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log("data fatched")
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType
        if (tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy') {
            const response = await MenuItem.find({ taste: tasteType })
            console.log(response)
            res.status(200).json(response)
        }
        else {
            console.log("error has been occured");
            res.status(404).json({ error: "invalid field" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

module.exports = router;