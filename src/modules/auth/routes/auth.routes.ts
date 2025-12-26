import { Router } from 'express';

import { signupController } from '@/src/modules/auth/controller/auth.controller.js';
import { signupSchema } from '@/src/modules/auth/schema/auth.schema.js';
import { validateRequest } from '@/src/shared/middlewares/validate-request.js';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signupController);

export default router;
