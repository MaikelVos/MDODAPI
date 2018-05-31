const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const db = require('../db/databaseConnector');

chai.should();
chai.use(chaiHttp);

function deletePsychologist() {
    db.query('DELETE FROM mdod.Psychologist WHERE email = "stijn@gmail.com"'), function (err) {
        if (err) {
            console.log(err);
        }
    };
}

function deleteClient() {
    db.query('DELETE FROM mdod.Client WHERE email = "stijn@gmail.com"'), function (err) {
        if (err) {
            console.log(err);
        }
    };
}

describe('Update client and psychologist ', function () {
    this.timeout(10000);

    before(function () {
        deletePsychologist();
        deleteClient();
    });

    it('PSYCHOLOGIST: INSERT A PSYCHOLOGIST FOR TESTING', (done) => {
        chai.request(index)
            .post('/api/register/psychologist')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "stijn",
                "infix": "van",
                "lastname": "Veen",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom",
                "email": "stijn@gmail.com",
                "password": "qwerty123"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: invalid token', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKVQiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "van",
                "lastname": "Veen",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(498);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: invalid route', (done) => {
        chai.request(index)
            .put('/api/psychologis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "van",
                "lastname": "Veen",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update firstname with valid information', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "van",
                "lastname": "Veen",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update lastname with valid information', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "van",
                "lastname": "Veentje",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update infix with valid information, (empty infix)', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "",
                "lastname": "Veentje",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update phonenumber with valid information, (with landcode)', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "",
                "lastname": "Veentje",
                "phonenumber": "+220629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update location with valid information', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "",
                "lastname": "Veentje",
                "phonenumber": "+220629456850",
                "location": "Breda"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    //=============================================================================================

    it('PSYCHOLOGIST: update firstname with invalid information', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stijn2",
                "infix": "van",
                "lastname": "Veen",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update lastname with invalid information', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "van",
                "lastname": "Veentjesss3",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update infix with invalid information, (1 letter)', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "a",
                "lastname": "Veentje",
                "phonenumber": "0629456850",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update phonenumber with invalid information, (with landcode)', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "",
                "lastname": "Veentje",
                "phonenumber": "+220",
                "location": "Bergen op Zoom"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PSYCHOLOGIST: update location with invalid information', (done) => {
        chai.request(index)
            .put('/api/psychologist')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NTY5NzcsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5Mjk3N30.DsgHJOkvtIrq7NupsmkVB_YfM9qz-1JGZ3khcEvlOsh-0TTPKd7xG2rjXq6I91Cn2ivBZbZxAqMHUJAneWMRzQ')
            .send({
                "firstname": "stein",
                "infix": "",
                "lastname": "Veentje",
                "phonenumber": "+220629456850",
                "location": "23456"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });


    //============================================================================


    it('CLIENT: INSERT A CLIENT FOR TESTING', (done) => {
        chai.request(index)
            .post('/api/register/client')
            .set('Content-Type', 'application/json')
            .send({
                "firstname": "Stijn",
                "infix": "",
                "lastname": "veen",
                "dob": "1996-11-27",
                "email": "stijn@gmail.com",
                "password": "qwerty123",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: Invalid token', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'yJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(498);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: Invalid route', (done) => {
        chai.request(index)
            .put('/api/cliend')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update firstname with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veen",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update lastname with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });


    it('CLIENT: update dob with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1666-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update phonenumber with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1666-11-27",
                "phonenumber": "+22062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update city with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1666-11-27",
                "phonenumber": "+22062345678",
                "city": "Breda",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update address with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1666-11-27",
                "phonenumber": "+22062345678",
                "city": "Breda",
                "adress": "Noord-Westsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update zipcode with valid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1666-11-27",
                "phonenumber": "+22062345678",
                "city": "Breda",
                "adress": "Noord-Westsingel 8",
                "zipcode": "2020 BH"
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update firstname with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein1",
                "infix": "",
                "lastname": "veen",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update lastname with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes2",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update infix with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "22",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update DOB with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1996-11w-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update phonenumber with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678000000000000000",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update city with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "22",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom 20",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update address with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel8 8 8  8",
                "zipcode": "4611 HB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: update zipcode with invalid information', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "22",
                "lastname": "veentjes",
                "dob": "1996-11-27",
                "phonenumber": "062345678",
                "city": "Bergen op Zoom",
                "adress": "Zuidsingel 8",
                "zipcode": "4611 HBB"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('CLIENT: should return 200 with some with empty fields', (done) => {
        chai.request(index)
            .put('/api/client')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1Mjg0NjA3MzgsInN1YiI6InN0aWpuQGdtYWlsLmNvbSIsImlhdCI6MTUyNzU5NjczOH0.D-YQqf2dVBkIIK6JXMMGbOqKQeAV7LNo-cL0960o23a_UX8H9P-lQVsUA_q0aqaCbKb3D9d4PzUS0trV629bpA')
            .send({
                "firstname": "Stein",
                "infix": "",
                "lastname": "veen",
                "dob": "1996-11-27",
                "phonenumber": "",
                "city": "Bergen op Zoom",
                "adress": "",
                "zipcode": ""
            })
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                done();
            });
    });

    after(function () {
        deletePsychologist();
        deleteClient();
        //process.exit();
    });
});