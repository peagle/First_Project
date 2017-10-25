const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const server = require('../../server');

describe('API endpoint /users', () => {

    //GET -  of users
    it('should return user home page', () => {
        return chai.request(server)
            .get('/')
            .then((res) => {
                     expect(res).to.have.status(200);
                     expect(res.body).to.be.an('object');
            });
    });


    //GET - Invalid path
    it('should return Not Found', () => {
        return chai.request(server)
            .get('/users/DFLKJSDIR')
            .then((res) => {
                throw new Error('Path exists!');
            })
            .catch((err) => {
                expect(err).to.have.status(404);
            });
    });

});