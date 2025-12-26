import { Router } from 'express';

import {
  forgotPasswordController,
  loginController,
  signupController,
  verifyEmailController,
} from '@/src/modules/auth/controller/auth.controller.js';
import {
  forgotPasswordSchema,
  signinSchema,
  signupSchema,
  verifyEmailQuerySchema,
} from '@/src/modules/auth/schema/auth.schema.js';
import { validateQuery } from '@/src/shared/middlewares/validate-query.js';
import { validateRequest } from '@/src/shared/middlewares/validate-request.js';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/login', validateRequest(signinSchema), loginController);
router.post('/verify', validateQuery(verifyEmailQuerySchema), verifyEmailController);

router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordController);

export default router;
