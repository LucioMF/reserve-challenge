const express = require("express");
const {
  addMember,
  updateMember,
  deleteMember,
  addNoteToMember,
} = require("../controllers/MemberController");

const router = express.Router();

router.route("/").post(addMember);
router.route("/:id").put(updateMember).delete(deleteMember);
router.route("/:id/notes").post(addNoteToMember);

module.exports = router;