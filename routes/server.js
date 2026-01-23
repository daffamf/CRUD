var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function (pool) {

router.get('/server/index', (req, res) => {
        var sql = "SELECT * FROM karyawan";
        pool.query(sql, (err, result) => {
            if (err) {
                res.send('Gagal')
            } else {
                res.json({
                    data: result.rows
                })
            }
        })
    })

        return router;
}