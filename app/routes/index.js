const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const UrlVisit = require('../models/UrlVisit');
const { lookup } = require('geoip-lite');

// @route   GET /:code
// @desc    Redirect to longUrl

router.get('/:code', async (req,res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code});
        
        if (url) {
           
            try {
                const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                const visit = UrlVisit.create({
                    urlCode: url.urlCode,
                    longUrl: url.longUrl,
                    ipAddress: ipAddress,
                    country: lookup(ipAddress),
                    referrer: req.headers.referrer || req.headers.referer
                });
            } catch (err) {
                console.error(err);
            }

            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});

// @route DELETE /:code
// @desc Remove URL if found

router.delete('/:code', async (req,res) => {
    try {
        const code = req.params.code;
        const url = await Url.deleteOne({urlCode: code});

        if (url.deletedCount != 1) {
            res.status(404).json(`No url found for /${code}`)
        }

        return res.status(200).json(`Successfully removed /${code}`);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(`Error while trying to remove /${code}`);
    }
})

module.exports = router;