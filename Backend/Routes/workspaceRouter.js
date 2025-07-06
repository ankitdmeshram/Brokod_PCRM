

const express = require('express');
const router = express.Router();
const { createWorkSpace, getWorkSpaces, updateWorkspace, deleteWorkspace } = require('../Controllers/workpaceController');
const auth = require('../Middlewares/auth');

router.post('/create', auth, createWorkSpace);
router.post('/all', auth, getWorkSpaces);
router.post('/update', auth, updateWorkspace);
router.post('/delete', auth, deleteWorkspace);

module.exports = router;