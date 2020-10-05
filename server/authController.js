require('dotenv').config();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { EMAIL_ACCOUNT, EMAIL_AUTH } = process.env;


module.exports = {
  register: async (req, res) => {
    // console.log(req.body)
    const db = req.app.get('db');
    const { first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, apartment_num, password } = req.body;

    const [user] = await db.check_email([email]);

    if (user) {
      return res.status(409).send('User already exists with that email');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [newUser] = await db.register_user([first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, hash]);

    //Gets apartments id from db
    const [apartmentId] = await db.get_apartment_id(apartment_num)

    //Uses users newly created id and apartment id to add the user to that apartment.  
    await db.assign_tenant_apartment(newUser.user_id, apartmentId.apartment_id)

    newUser.apartment_num = apartment_num;


    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_AUTH
      }
    })

    let mailOptions = {
      from: EMAIL_AUTH,
      to: email,
      subject: 'Registration Successful',
      text: `${first_name} ${last_name}, your registration to the Cleaning Check online application was successful. Please take a look around and familiarize yourself with the site.`
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error in Register Email');
      } else {
        console.log('Email Sent');
      }
    });


    //! I will most likely not want to send anything seeing that they just created an account. The user will need to login still
    res.status(201).send(newUser)
  },


  login: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;

    const [existingUser] = await db.check_email([email]);

    if (!existingUser) {
      return res.status(404).send('Email not found. User must first register.');
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.password_hash);

    if (!isAuthenticated) {
      return res.status(403).send('Incorrect Email or Password');
    }

    delete existingUser.password_hash;

    req.session.user = existingUser;

    res.status(200).send(req.session.user);
  }

};