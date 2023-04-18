const ClientModel = require("../database/models/ClientModel");
const MemberModel = require("../database/models/MemberModel");

exports.getAllClients = async () => {
  return await ClientModel.find();
};

exports.createClient = async (clientData) => {
  return await ClientModel.create(clientData);
};

exports.getClientById = async (id) => {
  return await ClientModel.findById(id);
};

exports.getClientByFilter = async (state, name) => {
    const filters = {};
    if (state) filters.state = state;
    if (name) filters.companyName = { $regex: name, $options: "i" };
    return await ClientModel.find(filters);
};  

exports.updateClient = async (id, clientData) => {
  return await ClientModel.findByIdAndUpdate(id, clientData);
};

exports.deleteClient = async (id) => {
  return await ClientModel.findByIdAndDelete(id);
};
