const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.JWT_SECRET); // Use the same secret for encryption");
const { validateEmail, domain } = require('../Utils/common.js');
const { sendEmail, mailContent } = require('./mailController');
const sqlDB = require("../Configs/SQL.js");

dotenv.config();

// Register User
exports.signup = async (req, res) => {
    try {
        const { fname, lname, email, password, confirmPassword, phone } = req.body;

        if (!fname || !lname || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        if (validateEmail(email) === false) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        // Check if user already exists
        sqlDB.query('SELECT * FROM Users WHERE email = ?', [email.toLowerCase()], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            // Encrypt the password using cryptr
            const encryptedPassword = cryptr.encrypt(password);

            // Insert the new user into the database
            const query = 'INSERT INTO Users (fname, lname, email, password, phone) VALUES (?, ?, ?, ?, ?)';
            const values = [fname, lname, email.toLowerCase(), encryptedPassword, phone];

            sqlDB.query(query, values, (err, results) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error saving user' });
                }

                // Generate JWT token
                const token = jwt.sign(
                    { userId: results.insertId, role: 'user' },  // Assuming roles are stored as 'user' by default
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' }
                );

                // Send welcome email (add logic to send actual email)
                const emailContent = mailContent(`
                    <div class="email-header">
                        <h1>Welcome to PCRM! 🚀</h1>
                    </div>
                    <div class="email-content">
                        <p>Hi <strong>${fname}</strong>,</p>
                        <p>Thank you for joining <strong>PCRM</strong>! We’re thrilled to have you on board.</p>
                        <p>Our platform is designed to simplify project management, boost productivity, and help you achieve your goals effortlessly. Here’s what you can do right away:</p>
                        <ul>
                            <li><strong>Create Projects:</strong> Start managing your tasks and workflows.</li>
                            <li><strong>Collaborate:</strong> Invite your team to work together seamlessly.</li>
                            <li><strong>Track Progress:</strong> Stay on top of deadlines with real-time updates.</li>
                        </ul>
                        <p><strong>Ready to get started?</strong></p>
                        <a href="${domain}/signin" class="cta-button">Log In to Your Account</a>
                        <p>If you have any questions or need assistance, our support team is here to help. Just reply to this email.</p>
                        <p>Welcome to the <strong>PCRM</strong> family! We’re excited to be part of your journey.</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,</p>
                        <p><strong>PCRM Team</strong></p>
                        <p><a href="${domain}">PCRM.BROKOD.COM</a> | <a href="mailto:contact@brokod.com">contact@brokod.com</a></p>
                    </div>
                      `)

                sendEmail(email, 'Welcome to PCRM 🚀', emailContent);

                res.status(200).json({
                    message: 'Signup successful',
                    token,
                    success: true,
                    user: { id: results.insertId, fname, lname, email, phone }
                });
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

// Login User
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter all fields' });
        }

        if (validateEmail(email) === false) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        // Check if user exists
        sqlDB.query('SELECT * FROM Users WHERE email = ?', [email.toLowerCase()], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Decrypt the password using cryptr
            const user = results[0];
            const decryptedString = cryptr.decrypt(user.password);
            console.log(decryptedString)
            // Compare passwords
            if (decryptedString !== password) {
                return res.status(400).json({ success: false, message: 'Password Wrong' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, roles: user.roles },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );

            user.password = undefined;

            const emailContent = mailContent(`

    <div class="email-content">
        <p>Hi <strong>${user?.fname}</strong>,</p>
        <p>We noticed that you just logged into your <strong>PCRM </strong> account. Welcome back!</p>
        <p>Here’s a quick summary of what you can do today:</p>
        <ul>
            <li><strong>Review Pending Tasks:</strong> Check your project dashboard to stay on track.</li>
            <li><strong>Collaborate with Your Team:</strong> Work together efficiently on your projects.</li>
            <li><strong>Monitor Progress:</strong> Get real-time updates and analytics.</li>
        </ul>
       <a href="${domain}/dashboard" class="cta-button">Go to Dashboard</a>
    <p style="margin-top: 20px;">If this login wasn’t made by you, please contact our support team.</p>
    <p>Thanks for choosing <strong>PCRM</strong> to simplify your project management!</p>
    </div>
    <div class="footer">
        <p>Best regards,</p>
        <p><strong>PCRM Team</strong></p>
        <p><a href="${domain}">PCRM.BROKOD.COM</a> | <a href="mailto:contact@brokod.com">contact@brokod.com</a></p>
    </div>
      `)

            sendEmail(email, 'Login Alert: Welcome Back to PCRM 🚀', emailContent);

            res.status(200).json({
                message: 'Login successful',
                token,
                success: true,
                user: {
                    id: user.id,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// reset password based on otp
exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (validateEmail(email) === false) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        res.status(200).json({
            message: 'Database problem. Check logs',
            success: true
        });

        // Check if user exists
        // const user = await User.findOne({ email: email.toLowerCase() });
        // if (!user) {
        //     return res.status(400).json({ message: 'Invalid email' });
        // }

        // // Hash the password
        // let hashedpassword;
        // try {
        //     hashedpassword = await cryptr.encrypt(password);
        // } catch (err) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "error in hashing password",
        //     });
        // }

        // // Update password
        // user.password = hashedpassword;
        // await user.save();

        // res.status(200).json({
        //     message: 'Password reset successful',
        //     success: true
        // });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        console.log("token", token);
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        sqlDB.query('INSERT INTO Tokens (token) VALUES (?)', [token], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}