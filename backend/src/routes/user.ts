import { Hono } from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import { signupInput } from '@gbkchaitanya/common';
import { signinInput } from '@gbkchaitanya/common';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.text('Invalid input');
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password,
      },
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(jwt);
  } catch (error) {
    c.status(400);
    return c.text('User already exists');
  }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
  
    if (!success) {
      c.status(400);
      return c.text('Invalid input');
    }
 
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findFirst({
        where: { 
          username: body.username,
          password: body.password
         }
      })
  
      if (!user) {
        c.status(404);
        return c.json({ message: "Incorrect credentials" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.text(jwt);
    } catch (error) {
      console.log(error);
      c.status(411);
      return c.json({ message: "Something went wrong" });
    }
  });