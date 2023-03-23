import { createFormContext } from '@mantine/form';

export interface UpdateCartFormValues {
  items: Record<string, number>[];
}

export const [UpdateCartProvider, useUpdateCartContext, useUpdateCartForm] =
  createFormContext<UpdateCartFormValues>();
