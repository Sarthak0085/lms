import {
    LoginSchema,
    NewPasswordSchema,
    PasswordResetSchema,
    RegisterSchema,
    SearchParamsSchema
} from "@/schemas";
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

export const ValidateResetPassword = (values: z.infer<typeof PasswordResetSchema>) => {
    const validatedFields = PasswordResetSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields");
    }

    return validatedFields.data;
};

export const ValidateNewPassword = (values: z.infer<typeof NewPasswordSchema>) => {
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields");
    }

    return validatedFields.data;
}

export const ValidateSearchParams = (values: z.infer<typeof SearchParamsSchema>) => {
    const validatedFields = SearchParamsSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields");
    }

    return validatedFields.data;
}