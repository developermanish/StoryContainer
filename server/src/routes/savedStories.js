const epxress = require("express");
const router = epxress.Router();
const storyController = require("../controllers/storyController");
const resStatus =require('../constants/responseStatus')

router.route('/story_data').post(async (req, res) => {

    try {
        const data = await storyController.saveData(req.body);
        console.log(data)
        if (!data) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to get the details" });
        }
        return res
            .status(resStatus.SUCCESS_OK)
            .send({ data: data });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ message: error.message });
        }
        return res.status(resStatus.INTERNAL_SERVER_ERROR).send(error.message);

    }  
})
module.exports = router;