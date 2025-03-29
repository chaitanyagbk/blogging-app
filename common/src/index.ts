import z from 'zod';

export const signupInput = z.object({
  name: z.string().optional(),
  username: z.string().email(),
  password: z.string().min(6),
})

export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
})

export const createBlogInput = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(3).max(1000),
})

export const updateBlogInput = z.object({
  title: z.string().min(3).max(100).optional(),
  content: z.string().min(3).max(1000).optional(),
  id: z.number().int(),
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>