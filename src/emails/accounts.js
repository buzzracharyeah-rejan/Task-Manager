const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY =
  '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';

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'rejandev@gmail.com',
    subject: 'Welcome Mail. Thanks for joining in!',
    text: `Welcome to the clan <strong>${name}</strong>. Let me know how you get along with the app `,
  };
  sgMail.send(msg);
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rejandev@gmail.com',
    subject: 'Cancellation Email',
    text: 'Thanks for staying with us. Hope to see you soon.',
  });
};
module.exports = { sendWelcomeEmail, sendCancellationEmail };
