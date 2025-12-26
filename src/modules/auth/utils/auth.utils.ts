import { sendEmailHelper } from '@/src/shared/email/send-email.js';
import { verificationEmailTemplate } from '@/src/shared/email/templates/verification-email-template.js';

export const sendVerificationEmailUtil = async (email: string, code: string): Promise<void> => {
  await sendEmailHelper({
    to: email,
    subject: 'Verify your email',
    html: verificationEmailTemplate(code),
  });
};
