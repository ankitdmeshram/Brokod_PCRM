

const express = require('express');
const router = express.Router();
const { createWorkSpace, getWorkSpaces, updateWorkspace, deleteWorkspace, getWorkspaceUsers } = require('../Controllers/workpaceController');
const auth = require('../Middlewares/auth');

router.post('/create', auth, createWorkSpace);
router.post('/all', auth, getWorkSpaces);
router.post('/update', auth, updateWorkspace);
router.post('/delete', auth, deleteWorkspace);

router.post('/users', auth, getWorkspaceUsers);

module.exports = router;