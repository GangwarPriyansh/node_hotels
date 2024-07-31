const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const response = await Person.create(data);
        console.log("data saved successfully");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log("data fatched");
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log("error");
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("data updated");
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            res.status(404).json({ error: "Person not found" });
        }
        console.log("data deleted");
        res.status(200).json({ message: "data deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})



//parameterize api call
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType })
            console.log(response)
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: "invalid field" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" })
    }
});
//comment added for testing purpose
module.exports = router;