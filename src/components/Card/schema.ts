import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required")
});

export default schema

export type FormData = z.infer<typeof schema>;

