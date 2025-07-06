const sqlDB = require("../Configs/SQL.js");

exports.createWorkSpace = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ success: false, message: "Workspace Name is required." });
        }

        let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        // Check if slug already exists
        sqlDB.query("SELECT COUNT(*) AS count FROM workspaces WHERE workspace_slug = ?", [slug], (error, results) => {
            if (error) {
                console.error("Error checking slug:", error);
                return res.status(500).json({ success: false, message: "Database error." });
            }
            if (results[0].count > 0) {
                // If slug exists, append a number to make it unique
                slug = `${slug}-${Date.now()}`;
            }

            // insett into workspace table 
            sqlDB.query("INSERT INTO workspaces (workspace_name, workspace_description, workspace_slug) VALUES (?, ?, ?)", [name, description, slug], (error, results) => {
                if (error) {
                    console.error("Error inserting workspace:", error);
                    return res.status(500).json({ success: false, message: "Database error." });
                }

                // insert workspace creator user id into workspace_users table
                const workspaceId = results.insertId;
                sqlDB.query("INSERT INTO workspace_users (workspace_id, user_id, role, created_by) VALUES (?, ?, ?, ?)", [workspaceId, req.user.userId, 'admin', req.user.userId], (error) => {
                    if (error) {
                        console.error("Error inserting workspace user:", error);

                        // Rollback the workspace insertion if user insertion fails
                        sqlDB.query("DELETE FROM workspaces WHERE id = ?", [workspaceId], (rollbackError) => {
                            if (rollbackError) {
                                console.error("Error rolling back workspace insertion:", rollbackError);
                            }
                        });

                        return res.status(500).json({ success: false, message: "Database error." });
                    }
                    return res.status(201).json({ success: true, message: "Workspace created successfully.", workspaceId: results.insertId });
                });
            });
        });

    } catch (error) {
        console.error("Error creating workspace:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

exports.getWorkSpaces = async (req, res) => {
    try {
        sqlDB.query("SELECT * FROM workspace_users WHERE user_id = ?", [req.user.userId], (error, results) => {
            if (error) {
                console.error("Error fetching workspaces:", error);
                return res.status(500).json({ success: false, message: "Database error." });
            }
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: "No workspaces found for this user." });
            }
            const workspaceIds = results.map(row => row.workspace_id);
            sqlDB.query("SELECT * FROM workspaces WHERE id IN (?)", [workspaceIds], (error, workspaces) => {
                if (error) {
                    console.error("Error fetching workspace details:", error);
                    return res.status(500).json({ success: false, message: "Database error." });
                }
                if (workspaces.length === 0) {
                    return res.status(404).json({ success: false, message: "No workspaces found." });
                }
                // add user role also with workspaces 
                const updatedData = workspaces.map(wp => ({
                    ...wp,
                    role: results.find(res => res.workspace_id == wp.id)?.role
                }))

                return res.status(200).json({ success: true, workspaces: updatedData });
            });
        });

    } catch (error) {
        console.error("Error in getWorkSpaces:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

exports.updateWorkspace = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        const updatedBy = req.user.userId;

        // Validate input
        if (!id || !name) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID and name are required.",
            });
        }

        if (!updatedBy) {
            return res.status(400).json({
                success: false,
                message: "You don't have access to update workspace."
            })
        }

        // Check if user is admin of this workspace
        sqlDB.query(
            "SELECT role FROM workspace_users WHERE workspace_id = ? AND user_id = ?",
            [id, updatedBy],
            (err, results) => {
                if (err) {
                    console.error("Error checking user role:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Database error while checking access.",
                    });
                }

                if (!results.length || results[0].role !== "admin") {
                    return res.status(403).json({
                        success: false,
                        message: "You do not have permission to update this workspace.",
                    });
                }

                // Generate new slug
                let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

                // Check if slug already exists for other workspaces
                sqlDB.query(
                    "SELECT COUNT(*) AS count FROM workspaces WHERE workspace_slug = ? AND id != ?",
                    [slug, id],
                    (err, result) => {
                        if (err) {
                            console.error("Error checking slug:", err);
                            return res.status(500).json({
                                success: false,
                                message: "Database error while checking slug.",
                            });
                        }

                        if (result[0].count > 0) {
                            slug = `${slug}-${Date.now()}`;
                        }

                        // Perform update
                        sqlDB.query(
                            "UPDATE workspaces SET workspace_name = ?, workspace_description = ?, workspace_slug = ? WHERE id = ?",
                            [name, description, slug, id],
                            (err, result) => {
                                if (err) {
                                    console.error("Error updating workspace:", err);
                                    return res.status(500).json({
                                        success: false,
                                        message: "Database error while updating workspace.",
                                    });
                                }

                                return res.status(200).json({
                                    success: true,
                                    message: "Workspace updated successfully.",
                                });
                            }
                        );
                    }
                );
            }
        );
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

exports.deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedBy = req.user.userId;

        // Validate input
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required.",
            });
        }

        // Check if user is admin of this workspace
        sqlDB.query(
            "SELECT role FROM workspace_users WHERE workspace_id = ? AND user_id = ?",
            [id, deletedBy],
            (err, results) => {
                if (err) {
                    console.error("Error checking admin role:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Database error while checking admin access.",
                    });
                }

                if (!results.length || results[0].role !== "admin") {
                    return res.status(403).json({
                        success: false,
                        message: "You do not have permission to delete this workspace.",
                    });
                }

                // Proceed to delete workspace
                sqlDB.query(
                    "DELETE FROM workspaces WHERE id = ?",
                    [id],
                    (err, result) => {
                        if (err) {
                            console.error("Error deleting workspace:", err);
                            return res.status(500).json({
                                success: false,
                                message: "Database error while deleting workspace.",
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            message: "Workspace deleted successfully.",
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
