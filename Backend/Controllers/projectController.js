const sqlDB = require("../Configs/SQL.js");

exports.createProject = async (req, res) => {
    try {
        const { project_name, project_description, project_privacy, project_status, owner, workspace } = req.body;

        if (!project_name || !workspace) {
            return res.status(400).json({ success: false, message: "Project name, and workspace are required." });
        }

        sqlDB.query("SELECT * FROM workspaces WHERE workspace_slug = ?", [workspace], async (err, workspaceCheck) => {
            if (err) {
                console.error("Error checking workspace:", err);
                return res.status(500).json({ success: false, message: "Internal server error." });
            }
            if (workspaceCheck.length === 0) {
                return res.status(404).json({ success: false, message: "Workspace not found." });
            }

            // Generate a slug for the project
            let project_slug = project_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            sqlDB.query("SELECT COUNT(*) AS count FROM projects WHERE project_slug = ?", [project_slug], (slugErr, slugCheck) => {
                if (slugErr) {
                    console.error("Error checking project slug:", slugErr);
                    return res.status(500).json({ success: false, message: "Internal server error." });
                }

                if (slugCheck[0].count > 0) {
                    // If slug exists, append a number to make it unique
                    project_slug = `${project_slug}-${Date.now()}`;
                }

                // Insert the new project into the database
                sqlDB.query(
                    "INSERT INTO projects (project_name, project_description, project_privacy, project_status, owner, workspace_id, project_slug) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [project_name, project_description, project_privacy, project_status, owner, workspaceCheck[0]?.id, project_slug],
                    (insertErr, projectInsert) => {
                        if (insertErr) {
                            console.error("Error inserting project:", insertErr);
                            return res.status(500).json({ success: false, message: "Failed to create project." });
                        }
                        // Return the newly created project ID
                        const projectId = projectInsert.insertId;
                        return res.status(201).json({ success: true, message: "Project created successfully.", projectId });
                    }
                );

            });
        });
    } catch (error) {
        console.error("Error creating workspace:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const { workspace } = req.body;

        if (!workspace) {
            return res.status(400).json({ success: false, message: "Workspace is required." });
        }

        sqlDB.query("SELECT * FROM workspaces WHERE workspace_slug = ?", [workspace], (err, workspaceCheck) => {
            if (err) {
                console.error("Error checking workspace:", err);
                return res.status(500).json({ success: false, message: "Internal server error." });
            }

            if (workspaceCheck.length === 0) {
                return res.status(404).json({ success: false, message: "Workspace not found." });
            }

            sqlDB.query("SELECT * FROM workspace_users WHERE workspace_id = ? AND user_id = ?", [workspaceCheck[0].id, req?.user?.userId], (err, workspaceUser) => {
                if (err) {
                    console.error("Error checking workspace user:", err);
                    return res.status(500).json({ success: false, message: "Internal server error." });
                }
                if (workspaceUser.length === 0) {
                    return res.status(403).json({ success: false, message: "You do not have access to this workspace." });
                }

                sqlDB.query("SELECT * FROM projects WHERE workspace_id = ?", [workspaceCheck[0].id], (err, projects) => {
                    if (err) {
                        console.error("Error fetching projects:", err);
                        return res.status(500).json({ success: false, message: "Internal server error." });
                    }

                    if (projects.length === 0) {
                        return res.status(404).json({ success: false, message: "No projects found in this workspace." });
                    }

                    const userIds = projects.map(project => project.owner);

                    sqlDB.query("SELECT * FROM users WHERE id IN (?)", [userIds], (err, users) => {
                        if (err) {
                            console.error("Error fetching users:", err);
                            return res.status(500).json({ success: false, message: "Internal server error." });
                        }

                        // Map user details to projects
                        projects = projects.map(project => {
                            const owner = users.find(user => user.id === project.owner);
                            return {
                                ...project,
                                owner: owner ? { id: owner?.id, fname: owner?.fname, lname: owner?.lname, email: owner?.email } : null
                            };
                        })
                        return res.status(200).json({ success: true, projects });
                    });
                });
            });
        });
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const { id, workspace } = req.body;

        if (!id || !workspace) {
            return res.status(400).json({ success: false, message: "Project ID and Workspace is required." });
        }

        // fetch the workspace ID from the workspace 
        sqlDB.query("SELECT * FROM workspaces WHERE workspace_slug = ?", [workspace], (err, workspaceCheck) => {
            if (err) {
                console.error("Error checking workspace:", err);
                return res.status(500).json({ success: false, message: "Internal server error." });
            }

            if (workspaceCheck.length === 0) {
                return res.status(404).json({ success: false, message: "Workspace not found." });
            }

            let workspace_id = workspaceCheck[0].id;

            // check if the user is admin of the workspace or not
            sqlDB.query("SELECT * FROM workspace_users WHERE workspace_id = ? AND user_id = ? AND role = 'admin'", [workspace_id, req?.user?.userId], (err, workspaceUser) => {
                if (err) {
                    console.error("Error checking workspace user:", err);
                    return res.status(500).json({ success: false, message: "Internal server error." });
                }

                if (workspaceUser.length === 0) {
                    return res.status(403).json({ success: false, message: "You do not have permission to delete this project." });
                }

                sqlDB.query("SELECT * FROM projects WHERE id = ?", [id], (err, projectCheck) => {
                    if (err) {
                        console.error("Error checking project:", err);
                        return res.status(500).json({ success: false, message: "Internal server error." });
                    }

                    if (projectCheck.length === 0) {
                        return res.status(404).json({ success: false, message: "Project not found." });
                    }

                    sqlDB.query("DELETE FROM projects WHERE id = ?", [id], (err, deleteResult) => {
                        if (err) {
                            console.error("Error deleting project:", err);
                            return res.status(500).json({ success: false, message: "Failed to delete project." });
                        }

                        return res.status(200).json({ success: true, message: "Project deleted successfully." });
                    });
                });
            });
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const { id, project_name, project_description, project_privacy, project_status, owner, workspace } = req.body;

        if (!id || !project_name) {
            return res.status(400).json({ success: false, message: "Project ID and Project name are required." });
        }

        sqlDB.query("SELECT * FROM workspaces WHERE workspace_slug = ?", [workspace], async (err, workspaceCheck) => {
            if (err) {
                console.error("Error checking workspace:", err);
                return res.status(500).json({ success: false, message: "Internal server error." });
            }
            if (workspaceCheck.length === 0) {
                return res.status(404).json({ success: false, message: "Workspace not found." });
            }

            // Check if the user is admin of the workspace
            sqlDB.query("SELECT * FROM workspace_users WHERE workspace_id = ? AND user_id = ? AND role = 'admin'", [workspaceCheck[0].id, req?.user?.userId], (err, workspaceUser) => {
                if (err) {
                    console.error("Error checking workspace user:", err);
                    return res.status(500).json({ success: false, message: "Internal server error." });
                }

                if (workspaceUser.length === 0) {
                    return res.status(403).json({ success: false, message: "You do not have permission to update this project." });
                }

                sqlDB.query("SELECT * FROM projects WHERE id = ? AND workspace_id = ?", [id, workspaceCheck[0].id], (err, projectCheck) => {
                    if (err) {
                        console.error("Error checking project:", err);
                        return res.status(500).json({ success: false, message: "Internal server error." });
                    }
                    if (projectCheck.length === 0) {
                        return res.status(404).json({ success: false, message: "Project not found." });
                    }

                    sqlDB.query(
                        "UPDATE projects SET project_name = ?, project_description = ?, project_privacy = ?, project_status = ?, owner = ? WHERE id = ?",
                        [project_name, project_description, project_privacy, project_status, owner, id],
                        (updateErr) => {
                            if (updateErr) {
                                console.error("Error updating project:", updateErr);
                                return res.status(500).json({ success: false, message: "Failed to update project." });
                            }
                            return res.status(200).json({ success: true, message: "Project updated successfully." });
                        }
                    );
                });
            });
        });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}