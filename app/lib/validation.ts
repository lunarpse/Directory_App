import { z } from "zod";

export const formschema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        console.log(res)
        const contentType = res.headers.get("content-type");
        console.log(contentType)

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  about: z.string().min(10),
});