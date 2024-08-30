import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";

export const ValidateLoginCredentials = (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields");
    }

    return validatedFields.data;
}

export const ValidateRegistrationCredentials = (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields");
    }

    return validatedFields.data;
}