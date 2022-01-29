const { validationResult } = require('express-validator');
const Category =require('../../models/categorys')



exports.createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name} = req.body;


    const category = new Category ({
        name 
    })

    // save the category
    try {
        await category.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'Category already exists' }]
            });
        }
        return res.status(500).json({ msg: err/*'Internal server error'*/});
    };

    return res.status(200).json(category);

}
