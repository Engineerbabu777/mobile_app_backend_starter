/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import sgMail from '@sendgrid/mail';
import type { SentMessageInfo } from 'nodemailer';

import { env } from '@/src/config/env.config.js';
import { mailTransporter } from '@/src/config/mail.config.js';

sgMail.setApiKey(env.SENDGRID_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmailHelper = async ({
  to,
  subject,
  html,
}: SendEmailParams): Promise<SentMessageInfo> => {
  return mailTransporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    html,
  });
};

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendEmailViaSendGrid = async ({
  to,
  subject,
  html,
  text = '',
}: SendEmailOptions): Promise<void> => {
  try {
    await sgMail.send({
      to,
      from: {
        email: env.SENDGRID_FROM_EMAIL,
        name: env.SENDGRID_FROM_NAME,
      },
      subject,
      html,
      text,
    });
  } catch (error: any) {
    console.warn('SendGrid email failed', {
      message: error?.message,
      response: error?.response?.body,
    });
  }
};
