// export const signupController = async (
//   req: Request<{}, {}, SignupInput>,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const body = req.body as SignupInput;
//     const result = await signupService(body);
//     return res.status(201).json({ success: true, data: result });
//   } catch (err) {
//     next(err);
//   }
// };
