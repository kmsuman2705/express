const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

function startServer() {
    console.log("Server started at port 3000...");
}

function sendEmail(destinationEmail) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: destinationEmail,
        subject: 'Registration Successful',
        html: '<h1>Congratulations!</h1><p>You have successfully registered.</p>'
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

function sumanroot(req, res) {
    res.send(`
        <h1>Welcome to HTML</h1>
        <form action="/signup" method="post">
            <input type="text" name="username" placeholder="Username"><br>
            <input type="email" name="email" placeholder="Email"><br>
            <input type="password" name="password" placeholder="Password"><br>
            <button type="submit">Sign Up</button>
        </form>
    `);
}

function signup(req, res) {
    const { username, email, password } = req.body;
    // Here you can handle the signup process, e.g., saving to a database
    console.log("New user signed up - Username: " + username + ", Email: " + email + ", Password: " + password);
    res.send("<h1>Signup Successful!</h1>");
    sendEmail(email); // Send email notification to the user
}

app.get("/", sumanroot);
app.post("/signup", signup);

app.listen(3000, startServer);
