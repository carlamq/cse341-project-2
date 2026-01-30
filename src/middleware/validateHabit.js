const validateHabit = (req, res, next) => {
    const {
        date,
        sleepHours,
        exerciseMinutes,
        waterIntake,
        energyLevel,
        mood,
        stressLevel
    } = req.body;

    if (!date || !mood) {
        return res.status(400).json({ message: 'date and mood are required' });
    }

    if (sleepHours < 0 || sleepHours > 24) {
        return res.status(400).json({ message: 'sleepHours must be between 0 and 24' });
    }
    if (energyLevel < 1 || energyLevel > 5) {
        return res.status(400).json({ message: 'energyLevel must be between 1 and 5' });
    }
    if (stressLevel < 1 || stressLevel > 5) {
        return res.status(400).json({ message: 'stressLevel must be between 1 and 5' });
    }
  
    next();
};


module.exports = { validateHabit };
