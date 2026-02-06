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
router.get('/github/callback', (req, res, next) => {  
    passport.authenticate('github', (err, user) => {  
        if (err) {     
            console.error('OAuth callback error:', err);     
            return res.status(500).json({ message: 'OAuth callback failed', error: err.message });   
        }   
        if (!user) return res.redirect('/api-docs');  
        req.session.user = user;   
        return res.redirect('/auth/status');
    })(req, res, next);
});


// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: 'Logged out' });
    });
});

module.exports = router;
