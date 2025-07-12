

const express = require('express');
const router = express.Router();
const { createWorkSpace, getWorkSpaces, updateWorkspace, deleteWorkspace, getWorkspaceUsers, addWorkspaceUser } = require('../Controllers/workpaceController');
const auth = require('../Middlewares/auth');

router.post('/create', auth, createWorkSpace);
router.post('/all', auth, getWorkSpaces);
router.post('/update', auth, updateWorkspace);
router.post('/delete', auth, deleteWorkspace);

router.post('/users', auth, getWorkspaceUsers);
router.post('/user/add', auth, addWorkspaceUser);

module.exports = router;