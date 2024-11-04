import { IJob } from "../interfaces/Job";
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY || ''); 

export const sendNotification = async (job: IJob) => {
  console.log('inside sendNotification');
  const ngrokUrl = 'https://6426-176-1-136-200.ngrok-free.app';
  const approveUrl = `${ngrokUrl}/jobs/${job.id}/approve`;
  const spamUrl = `${ngrokUrl}/jobs/${job.id}/spam`;


  console.log("this is email", process.env.MODERATOR_EMAIL);
  const msg = {
    to: process.env.MODERATOR_EMAIL, 
    from: process.env.SENDGRID_EMAIL_ADDRESS || 'abdulhamed.mostafa92@gmail.com', 
    subject: 'New Job Posted for Approval',
    text: `
    A new job has been posted for approval:\n\n
    Title: ${job.title}\n
    Description: ${job.description}\n
    By: ${job.email}\n
    Please review it and take action:\n
    ${approveUrl} - Approve Job\n
    ${spamUrl} - Mark as Spam
  `,
    html: `
    <strong>A new job has been posted:</strong><br/>
    Title: ${job.title}<br/>
    Description: ${job.description}<br/><br/>
    By: ${job.email}<br/><br/>
    <strong>Approve: <a href='${approveUrl}' /></strong>
    <a href="${approveUrl}">Approve Job</a><br/>
    <a href="${spamUrl}">Mark as Spam</a>
    `,
  };

   await sgMail.send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error: Error) => {
        console.error('Error sending email:', error);
    });

};