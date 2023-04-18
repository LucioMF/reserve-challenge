const MemberModel = require("../database/models/MemberModel");
const ClientModel = require("../database/models/ClientModel");

exports.addMember = async (memberData) => {
  const client = await ClientModel.findById(memberData.clientId);
  if (!client) {
    throw new Error("Client not found");
  }

  return await MemberModel.create(memberData);
};

exports.updateMember = async (memberId, memberData) => {
  if (memberData.clientId){
    const client = await ClientModel.findById(memberData.clientId);
    if (!client) {
      throw new Error("Client not found");
    }
  }

  return await MemberModel.findByIdAndUpdate(memberId, memberData, {new: true});
};

exports.deleteMember = async (memberId) => {
  return await MemberModel.findByIdAndDelete(memberId);
};

exports.addNoteToMember = async (memberId, note) => {
  const member = await MemberModel.findById(memberId);
  if (!member) {
    throw new Error("Member not found");
  }

  member.notes.push({note, timestamp: new Date()});
  await member.save();

  return member;
};
