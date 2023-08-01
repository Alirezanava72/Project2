// if user loged out, user should not have access to the dashboard page 

exports.isLoggedIn = function (req, res, next) {
    if(req.user) {
        next();
    } else {
        return res.status(401).send('Access Denied, You need to Log-In from Home page!');
    }
}