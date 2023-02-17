var express = require('express');
var router = express.Router();
var os = require('os');

router.get('/', (req, res, next)=> {res.json({
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
})});
router.get('/cpus/:id', (req, res, next)=> {res.json({
    cpu: os.cpus()[req.params.id],
})});

router.get('/cpus', (req, res, next)=> {res.json({
    cpus: os.cpus(),
})});



module.exports = router;