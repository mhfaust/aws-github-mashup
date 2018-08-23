const knownIssue = helpText => e => {
    err.helpText = helpText;
    console.log(err);
    //throw( err );
    return err;
}

const handler = (err, req, res, next) => {

    console.log('Uncaught error bubbled up to error catcher configured for Express (error.js).')
    console.log('Dashboard api url: ' + req.originalUrl)
    console.log(err);

// console.log(JSON.stringify(err))
//console.log('err', JSON.parse(err.message).documentation_url)
    // let error = { message: JSON.stringify(err) }
    // if(err.helpText)
    //     err.helpText = helpText;

    res.status(err.status || 500).send({ err });
}

module.exports = {
    handler,
    knownIssue
}
