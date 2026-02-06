const router = require('express').Router();
const passport = require('passport');

// Status
router.get('/status', (req, res) => {
    res.send(
        req.session.user
            ? `Logged in as ${req.session.user.username}`
            : 'Logged out'
    );
});

// Start GitHub OAuth login
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth callback
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs' }),
    (req, res) => {
       // Passport put the user in req.user  
        eq.session.user = req.user;
        res.redirect('/auth/status');
    }
);

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: 'Logged out' });
    });
});

module.exports = router;
