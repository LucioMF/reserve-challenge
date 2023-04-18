const express = require("express");
const {
  getAllClients,
  createClient,
  getClientById,
  getClientByFilter,
  updateClient,
  deleteClient,
} = require("../controllers/ClientController");

const router = express.Router();

router.route("/").get(getAllClients).post(createClient);
router.route("/filter").get(getClientByFilter);
router.route("/:id").get(getClientById).put(updateClient).delete(deleteClient);

module.exports = router;
