import nodemailer, { type Transporter } from 'nodemailer';

import { env } from './env.config.js';

export const mailTransporter: Transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});
