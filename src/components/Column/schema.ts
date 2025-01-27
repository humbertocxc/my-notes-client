import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default schema

export type FormData = z.infer<typeof schema>;
