import { sendEmailHelper } from '@/src/shared/email/send-email.js';
import { resetPasswordHtmlTemplate } from '@/src/shared/email/templates/reset-password-email-template.js';
import { verificationEmailTemplate } from '@/src/shared/email/templates/verification-email-template.js';

export const sendVerificationEmailUtil = async (email: string, code: string): Promise<void> => {
  await sendEmailHelper({
    to: email,
    subject: 'Verify your email',
    html: verificationEmailTemplate(code),
  });
};


export const sendResetPasswordEmailUtil = async (email: string, code: string): Promise<void> => {
  await sendEmailHelper({
    to: email,
    subject: 'Verify your email',
    html: resetPasswordHtmlTemplate(code),
  });
};
