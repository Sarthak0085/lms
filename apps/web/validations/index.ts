import {
    LoginSchema,
    NewPasswordSchema,
    PasswordResetSchema,
    RegisterSchema,
    SearchParamsSchema
} from "@/schemas";
import { UserRole, UserStatus } from "@repo/db/types";
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

export const ValidateSearchParams = (values: Record<string, string | string[] | undefined>) => {
    const parsedParams: Record<string, any> = {};

    for (const key in values) {
        const value = values[key];
        if (Array.isArray(value)) {
            parsedParams[key] = value;
        } else if (value) {
            parsedParams[key] = value;
        }
    }

    // Specific handling for roles if needed
    if (parsedParams.role) {
        parsedParams.role = parsedParams.role.split(".").map((ro: UserRole) => ro.trim()) ?? [parsedParams.role]
    }

    if (parsedParams.status) {
        parsedParams.status = parsedParams.status.split(".").map((status: UserStatus) => status.trim()) ?? [parsedParams.status]
    }

    return SearchParamsSchema.parse(parsedParams);
}