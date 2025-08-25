import { z } from 'zod';

export const FormSchema = z.object({
   name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
   address: z
      .string()
      .min(5, { message: 'Address must be at least 5 characters.' }),
});
