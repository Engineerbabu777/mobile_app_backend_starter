import type { SentMessageInfo } from 'nodemailer';

import { env } from '@/src/config/env.config.js';
import { mailTransporter } from '@/src/config/mail.config.js';

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
