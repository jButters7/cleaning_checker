require('dotenv').config();
const bcrypt = require('bcryptjs');
// Everything below is for email
const nodemailer = require('nodemailer');
const { EMAIL_ACCOUNT, EMAIL_AUTH } = process.env;
// const hbs = require('nodemailer-express-handlebars');
// Everything above is for email


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
    });

    let mailOptions = {
      from: EMAIL_ACCOUNT,
      to: email,
      subject: 'Registration Successful',
      html: `
      <div style='font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif; color: black; font-size: 18px;'>
      <h1 style="color: #145374; text-align: center"> Hello ${first_name} ${last_name}</h1> 
      <div> <p>You have successfully registered for the online Cleaning Checker application.</p></div> 
      <div></p>Please take a look around and familiarize yourself with the site.</p> </div> 
      <div><p>Also, reach out to us <a style='color: #ee6f57' href="mailto: cleaningchecksarecoll@gmail.com">HERE</a> if you have any questions about your upcoming cleaning checks.</p></div>
      </div>`
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error in Register Email');
      } else {
        console.log('Email Sent');
      }
    });

    res.sendStatus(201);
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
  },

  getUser: async (req, res) => {
    const db = req.app.get('db');
    if (req.session.user) {
      const [currentUser] = await db.check_email(req.session.user.email);
      res.status(200).send(currentUser);
    } else {
      res.sendStatus(404)
    }
  }


};