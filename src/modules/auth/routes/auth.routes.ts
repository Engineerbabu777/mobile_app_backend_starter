import { Router } from 'express';

import {
  loginController,
  signupController,
} from '@/src/modules/auth/controller/auth.controller.js';
import { signinSchema, signupSchema } from '@/src/modules/auth/schema/auth.schema.js';
import { validateRequest } from '@/src/shared/middlewares/validate-request.js';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/login', validateRequest(signinSchema), loginController);

export default router;
