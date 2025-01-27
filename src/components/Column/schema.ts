import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name cannot exceed 100 characters")
});

export default schema;

export interface ColumnSchema {
  name: string
}
