export const resetPasswordHtmlTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; text-align: center;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #dc2626; margin-bottom: 20px;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #374151;">
        We received a request to reset your password for your <b>App Name</b> account.  
        Please use the code below to reset your password:
      </p>
      <div style="margin: 30px 0;">
        <span style="display: inline-block; background: #dc2626; color: #fff; font-size: 22px; font-weight: bold; letter-spacing: 2px; padding: 12px 24px; border-radius: 6px;">
          ${code}
        </span>
      </div>
      <p style="font-size: 14px; color: #6b7280;">
        This code will expire in 10 minutes. <br>
        If you didn’t request this, you can safely ignore this email.  
      </p>
    </div>
    <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
      © ${new Date().getFullYear()} App Name. All rights reserved.
    </p>
  </div>
`;
