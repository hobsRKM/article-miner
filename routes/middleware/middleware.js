function isLoggedIn(req ,res, next){
    if(req.isAuthenticated()){
    return next();
    }else{
    return res.redirect('/login');
    }
    }
    

    exports.isLoggedIn = isLoggedIn;