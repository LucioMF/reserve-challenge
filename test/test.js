const Client = require("../database/models/ClientModel");
const Member = require("../database/models/MemberModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Clients", () => {
    beforeEach((done) => {
        Client.deleteMany({})
          .then(() => {
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
        });
    });

    after(async () => {
        await Client.deleteMany({});
    });

  describe("/GET client", () => {
    it("it should GET all the clients", (done) => {
      chai
        .request(app)
        .get("/api/clients")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST client", () => {
    it("it should new POST a client", (done) => {
      let client = {
        companyName: "Acme Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      };
      chai
        .request(app)
        .post("/api/clients")
        .send(client)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });

  describe("/GET/:id client", () => {
    it("it should GET a client by the id", async () => {
      let client = new Client({
        companyName: "Acme Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      });
  
      const savedClient = await client.save();
  
      const response = await chai
        .request(app)
        .get("/api/clients/" + savedClient.id)
        .send(savedClient);
  
      response.should.have.status(200);
      response.body.data.should.be.a("object");
      response.body.status.should.be.eql("success");
    });
  });

describe("/GET/:id client", () => {
    it("it should GET a client by the id", async () => {
      let client = new Client({
        companyName: "Acme Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      });
  
      const savedClient = await client.save();
  
      const response = await chai
        .request(app)
        .get("/api/clients/" + savedClient.id)
        .send(savedClient);
  
      response.should.have.status(200);
      response.body.data.should.be.a("object");
      response.body.status.should.be.eql("success");
    });
  });

  describe("/PUT/:id client", () => {
    it("it should UPDATE a client given the id", async () => {
      const client = new Client({
        companyName: "Acme Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      });
  
      const savedClient = await client.save();
  
      const response = await chai
        .request(app)
        .put("/api/clients/" + savedClient.id)
        .send({
          companyName: "New Company Name",
          dateCreated: "2022-04-15",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          headcount: 50,
        });
  
      response.should.have.status(200);
      response.body.data.should.be.a("object");
      response.body.status.should.be.eql("success");
    });
  });
  
  describe("/DELETE/:id client", () => {
    it("it should DELETE a client given the id", async () => {
      const client = new Client({
        companyName: "New Company Name",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      });
  
      const savedClient = await client.save();
  
      const response = await chai
        .request(app)
        .delete("/api/clients/" + savedClient.id);
  
      response.should.have.status(200);
      response.body.data.should.be.a("object");
      response.body.status.should.be.eql("success");
    });
  });

  describe("GET /api/clients", () => {
    it("it should GET clients by state filter", async () => {
      const client1 = new Client({
        companyName: "Acme Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "TX",
        zip: "12345",
        headcount: 50,
      });
  
      const client2 = new Client({
        companyName: "XYZ Corp",
        dateCreated: "2022-03-20",
        address: "456 Broadway Ave",
        city: "Somewhere",
        state: "NY",
        zip: "56789",
        headcount: 100,
      });
  
      await client1.save();
      await client2.save();
  
      const response = await chai
        .request(app)
        .get("/api/clients/filter?state=TX")
        .send();
  
      response.should.have.status(200);
      response.body.data.should.be.a("array");
      response.body.data.length.should.be.eql(1);
      response.body.data[0].should.have.property("companyName").eql("Acme Corporation");
      response.body.status.should.be.eql("success");
    });
  
    it("it should GET clients by name filter", async () => {
      const client1 = new Client({
        companyName: "Random Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      });
  
      const client2 = new Client({
        companyName: "XYZ Corp",
        dateCreated: "2022-03-20",
        address: "456 Broadway Ave",
        city: "Somewhere",
        state: "NY",
        zip: "56789",
        headcount: 100,
      });
  
      await client1.save();
      await client2.save();
  
      const response = await chai
        .request(app)
        .get("/api/clients/filter?name=Random")
        .send();
  
      response.should.have.status(200);
      response.body.data.should.be.a("array");
      response.body.data.length.should.be.eql(1);
      response.body.data[0].should.have.property("companyName").eql("Random Corporation");
      response.body.status.should.be.eql("success");
    });
  });  
 
});


///////////Members/////////////////////////////////////////

describe("Client Members API", () => {
    let savedClient;
    let savedClient2;
    let savedMember;
  
    before(async () => {
 
      const client = new Client({
        companyName: "Acme Corporation",
        dateCreated: "2022-04-15",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        headcount: 50,
      });

      const client2 = new Client({
        companyName: "Random Corporation",
        dateCreated: "2023-02-10",
        address: "123 Blvd",
        city: "Imaginary Town",
        state: "TX",
        zip: "12345",
        headcount: 50,
      });
  
      savedClient = await client.save();
      savedClient2 = await client2.save();
  
      const member = new Member({
        name: "John Doe",
        phoneNumber: "555-1234",
        email: "john.doe@example.com",
        clientId: savedClient._id,
      });
  
      savedMember = await member.save();
    });
  
    after(async () => {
      await Member.deleteMany({});
      await Client.deleteMany({});
    });
  
    describe("POST /api/members", () => {
      it("should add a new member to the client", async () => {
        const newMember = {
          name: "Jane Doe",
          phoneNumber: "555-5678",
          email: "jane.doe@example.com",
          clientId: savedClient._id
        };
  
        const res = await chai
          .request(app)
          .post("/api/members")
          .send(newMember);
  
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name").eq(newMember.name);
        res.body.data.should.have.property("phoneNumber").eq(newMember.phoneNumber);
        res.body.data.should.have.property("email").eq(newMember.email);
        res.body.data.should.have.property("clientId").eq(savedClient._id.toString());
      });
    });
  
    describe("PUT /api/members/:id", () => {
      it("should update an existing member of the client", async () => {
        const updatedMember = {
          name: "John Smith",
          phoneNumber: "555-4321",
          email: "john.smith@example.com",
        };
  
        const res = await chai
          .request(app)
          .put(`/api/members/${savedMember._id}`)
          .send(updatedMember);
  
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name").eq(updatedMember.name);
        res.body.data.should.have.property("phoneNumber").eq(updatedMember.phoneNumber);
        res.body.data.should.have.property("email").eq(updatedMember.email);
        res.body.data.should.have.property("clientId").eq(savedClient._id.toString());
      });
    });

    describe("PUT /api/members/:id", () => {
        it("should move an existing member to another client", async () => {
          const updatedMember = {
            clientId: savedClient2._id
          };
    
          const res = await chai
            .request(app)
            .put(`/api/members/${savedMember._id}`)
            .send(updatedMember);
    
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("clientId").eq(savedClient2._id.toString());
        });
      });

      describe("POST /api/members/:id/notes", () => {
        it("should add a note to a member", async () => {      
          const note = "Follow up with John next week";
          const res = await chai
            .request(app)
            .post(`/api/members/${savedMember._id}/notes`)
            .send({ note });
      
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("notes").that.is.an("array").with.lengthOf(1);
          res.body.data.notes[0].should.have.property("note").eq(note);
        });
      });

      describe("DELETE /api/members/:id", () => {
        it("should delete an existing member of the client", async () => {
          const res = await chai
            .request(app)
            .delete(`/api/members/${savedMember._id}`);
      
          res.should.have.status(200);
      
          const deletedMember = await Member.findById(savedMember._id);
          chai.assert.isNull(deletedMember);
        });
      });
      
  });



