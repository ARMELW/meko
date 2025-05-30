import { z } from "zod";
import { addChildrenSchema, childrenSchema } from "./schema";

export type Children = z.infer<typeof childrenSchema>;

export type ChildrenPayload = z.infer<typeof addChildrenSchema>;

export interface DeleteVerificationPayload {
  verificationCode: string;
}

export interface DeleteRequestPayload {
  id: string;
}
