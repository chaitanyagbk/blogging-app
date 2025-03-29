import { Hono } from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@gbkchaitanya/common';

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
    Variables: {
      userId: string
    }
  }>()

blogRouter.use('/*',async (c, next) => {
    const authHeader = c.req.header('Authorization') || '';
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET); 

        if (user) {
            c.set('userId', user.id);
            await next();
        } else {
            c.status(403);
            return c.text('You are not logged in');
        }
    } catch (error) {
        c.status(403);
        return c.text('You are not logged in');
    }
    });

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        c.status(400);
        return c.text('Invalid input');
    }
    const authorId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
            authorId: Number(authorId)
        },
      })
    return c.json({
        id: blog.id
    });

})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    if (!success) {
        c.status(400);
        return c.text('Invalid input');
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        },
      })    
    return c.json({
        id: blog.id
    })
})

//Todo: Add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany(
        {
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        }
    );

    return c.json({blogs});
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

      return c.json({blog});
    } catch (error) {
        c.status(411);
        return c.text('Blog not found');
    }
})