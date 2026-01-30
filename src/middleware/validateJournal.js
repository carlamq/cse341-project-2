const validateJournal = (req, res, next) => {  
    const {    
        title,
        content,
        emotion,
        intensity,
        visibility
    } = req.body;
  
    if (!title || !content || !emotion) {
        return res.status(400).json({
            message: 'title, content and emotion are required'
        });
    }

    if (intensity != null && (intensity < 1 || intensity > 5)) {
        return res.status(400).json({
            message: 'intensity must be between 1 and 5'
        });
    }

    if (visibility && !['private', 'public'].includes(visibility)) {
        return res.status(400).json({
            message: 'visibility must be private or public'
        });
    }
    next();
};

module.exports = { validateJournal };
