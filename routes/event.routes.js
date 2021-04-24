const router = require("express").Router();
const eventController = require("../controllers/event.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

router.get("/", eventController.readEvent);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/participate/:id", eventController.participateEvent);
router.patch("/unparticipate/:id", eventController.unparticipateEvent);

router.post("/upload", upload.single("file"), uploadController.uploadImgEvent);

module.exports = router;
