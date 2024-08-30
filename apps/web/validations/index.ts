import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const ValidateLoginCredentials = (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields");
    }

    return validatedFields.data;
}