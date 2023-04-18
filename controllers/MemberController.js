const memberService = require("../services/MemberService");

exports.addMember = async (req, res) => {
    try {
        const client = await memberService.addMember(req.body);
        res.json({ data: client, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const client = await memberService.updateMember(req.params.id, req.body);
        res.json({ data: client, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        const client = await memberService.deleteMember(req.params.id);
        res.json({ data: client, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addNoteToMember = async (req, res) => {
    try {
      const { note } = req.body;
      const member = await memberService.addNoteToMember(req.params.id, note);
      res.json({ data: member, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
