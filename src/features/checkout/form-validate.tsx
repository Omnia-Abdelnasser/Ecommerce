import z from 'zod';

export const FormSchema = z.object({
   name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Za-z\s]+$/, 'Name must contain only letters')
      .refine((val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
         message: 'Name cannot be an email',
      }),

   address: z
      .string()
      .min(5, 'Address must be at least 5 characters')
      .refine((val) => !/^\d+$/.test(val), {
         message: 'Address cannot be only numbers',
      })
      .refine((val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
         message: 'Address cannot be an email',
      }),
});
