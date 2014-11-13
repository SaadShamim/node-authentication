module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/login', function(req,res) {
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	
	app.post('/login', passport.authenticate('local-signin', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling for custom callback
	app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/profile', isLoggedIn, function(req,res) {
		res.render('profile.ejs', {
			user:req.user
		});
	});

	app.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}