import { Router } from 'express';

import {
  forgotPasswordController,
  loginController,
  resetPasswordController,
  signupController,
  verifyEmailController,
} from '@/src/modules/auth/controller/auth.controller.js';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  verifyEmailSchema,
} from '@/src/modules/auth/schema/auth.schema.js';
import { validateRequest } from '@/src/shared/middlewares/validate-request.js';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/login', validateRequest(signinSchema), loginController);
router.post('/verify', validateRequest(verifyEmailSchema), verifyEmailController);

router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordController);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPasswordController);

export default router;
