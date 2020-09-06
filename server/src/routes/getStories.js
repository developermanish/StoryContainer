const epxress = require("express");
const router = epxress.Router();
const resStatus =require('../constants/responseStatus')
const contact = require("../controllers/getStoryController");


router.get("/storyCount", async (req, res) => {
    try {
        const result = await contact.getContactCount();
        console.log(result);
        if (!result) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to count the contacts" });
        }

        return res
            .status(resStatus.SUCCESS_OK)
            .send({ count: result });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ message: error.message });
        }
        return res.status(resStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
})

router.post("/all_stories", async (req, res) => {
    pageNum = { ...req.body };
    console.log(pageNum);
    console.log(req.body);
    try {
        const result = await contact.getPaginatedContact(pageNum);
        console.log(result);
        if (!result) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to fetch the details" });
        }

        return res
            .status(resStatus.SUCCESS_OK)
            .send({ data: result });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ message: error.message });
        }
        return res.status(resStatus.INTERNAL_SERVER_ERROR).send(error.message);

    }
});

router.put("/single_story", async (req, res) => {
    try {
        const result = await contact.getSpecificStory(req.query.id,req.body.count);
        console.log(result);
        if (!result) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to fetch the details" });
        }

        return res
            .status(resStatus.SUCCESS_OK)
            .send({ data: result });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ message: error.message });
        }
        return res.status(resStatus.INTERNAL_SERVER_ERROR).send(error.message);

    }
});


module.exports = router;