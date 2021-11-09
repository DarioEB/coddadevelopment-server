const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get(
    '/',
    projectController.getProjects
);

router.get(
    '/:id',
    projectController.getProject
);

router.get(
    '/get-image/:image',
    projectController.getImageProject
);

router.post(
    '/',
    projectController.createProject
)

module.exports = router;