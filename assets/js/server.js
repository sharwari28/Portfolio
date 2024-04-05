const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { fullname, email, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sharwari2002@gmail.com', // Your Gmail address
            pass: 'sagita#28' // Your Gmail password or app-specific password
        }
    });

    // Configure the email options
    const mailOptions = {
        from: email, // Sender's email address
        to: 'sharwari2023@gmail.com', // Receiver's email address
        subject: 'New Contact Form Submission', // Subject line
        text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}` // Plain text body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
