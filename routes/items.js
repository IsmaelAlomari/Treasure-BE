const express = require("express");
const router = express.Router();
const { trashList, treasureList } = require("../Controllers/itemsController");
const passport = require("passport");

router.param("itemId", async (req, res, next, itemId) => {
  const item = await fetchitem(itemId, next);
  if (item) {
    req.item = item;
    next();
  } else {
    const err = new Error("item Not Found");
    err.status = 404;
    next(err);
  }
});
router.get("/trash", trashList);

router.get(
  "/tresaure",
  passport.authenticate("jwt", { session: false }),
  treasureList
);

module.exports = router;
