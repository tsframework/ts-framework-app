/// <reference path="../typings/index.d.ts" />

import * as assert from "assert";
import * as chai from "chai";
import * as http from "http";
var expect = chai.expect;


describe('Test application homepage:', () => {
    it('should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});

describe('Test application download:', () => {
    it('should return 200', function (done) {
        http.get('http://localhost:3000/download', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});