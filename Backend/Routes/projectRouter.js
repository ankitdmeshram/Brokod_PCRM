

const express = require('express');
const router = express.Router();
const { createProject, getProjects, deleteProject, updateProject } = require("../Controllers/projectController")

const auth = require('../Middlewares/auth');

router.post('/create', auth, createProject);
router.post('/all', auth, getProjects);
router.post('/delete', auth, deleteProject);
router.post('/update', auth, updateProject);

module.exports = router;