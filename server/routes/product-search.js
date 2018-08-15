const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('FX1TQ4WVWW', 'f341fef78bc3f48c149fe9c7e1b6b0aa');
const index = client.initIndex('amazonov1');

router.get('/', (req, res, next) => {
    
    if (req.query.query){
        index.search({
            query: req.query.query,
            page: req.query.page,
        }, (err, content) => {
            res.json({
                success: true,
                message: "Here is your search",
                status: 200,
                content,
                search_result: req.query.query
            });
        });
    }
});

module.exports = router;
