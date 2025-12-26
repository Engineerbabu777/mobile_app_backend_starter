import { Router } from 'express';

import {
  loginController,
  signupController,
  verifyEmailController,
} from '@/src/modules/auth/controller/auth.controller.js';
import {
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

export default router;
