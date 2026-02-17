import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),

  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Description is too short",
      }),
  ),

  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Title is too short",
      }),
  ),

  /** ✅ NEW FIELD — DOES NOT AFFECT OLD CALLS */
  cover: z
    .object({
      type: z.enum(["COLOR", "IMAGE"]),

      // COLOR cover
      color: z.string().nullable().optional(),
      pattern: z.string().nullable().optional(),

      // IMAGE cover
      imageUrl: z.string().nullable().optional(),
      imageSource: z.enum(["unsplash", "upload"]).nullable().optional(),
    })
    .nullable()
    .optional(),

  id: z.string(),
});
