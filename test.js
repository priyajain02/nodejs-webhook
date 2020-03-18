import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

//Configure chai
chai.use(chaiHttp);
chai.should();

describe("status", () => {
    describe("GET /", () => {
        // Test to check the status of the call
        it("Get call succeded", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

