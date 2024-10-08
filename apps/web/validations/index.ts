import CustomError from "@/lib/custom-error";
import {
    CourseSectionSchema,
    CreateCategorySchema,
    CreateCourseSchema,
    createReviewSchema,
    EditUserSchema,
    LoginSchema,
    NewPasswordSchema,
    PasswordResetSchema,
    RegisterSchema,
    SearchParamsSchema,
    SectionContentSchema,
    UpdateCategorySchema
} from "@/schemas";
import { CourseStatus, Level, UserRole, UserStatus } from "@repo/db/types";
import { z } from "zod";

export const ValidateLoginCredentials = (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
}

export const ValidateRegistrationCredentials = (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
}

export const ValidateResetPassword = (values: z.infer<typeof PasswordResetSchema>) => {
    const validatedFields = PasswordResetSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const ValidateNewPassword = (values: z.infer<typeof NewPasswordSchema>) => {
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
}

export const ValidateAdminEditUser = (values: z.infer<typeof EditUserSchema>) => {
    const validatedFields = EditUserSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
}

export const ValidateSearchParams = (values: Record<string, number | string | string[] | undefined>) => {
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
        parsedParams.status = parsedParams.status.split(".").map((status: UserStatus | CourseStatus) => status.trim()) ?? [parsedParams.status]
    }

    if (parsedParams.level) {
        parsedParams.level = parsedParams.level.split(".").map((level: Level) => level.trim()) ?? [parsedParams.level]
    }

    return SearchParamsSchema.parse(parsedParams);
};

export const ValidateCreateCategoryInput = (values: z.infer<typeof CreateCategorySchema>) => {
    const validatedFields = CreateCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const ValidateUpdateCategoryInput = (values: z.infer<typeof UpdateCategorySchema>) => {
    const validatedFields = UpdateCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateCreateCourse = (values: z.infer<typeof CreateCourseSchema>) => {
    const validatedFields = CreateCourseSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateCreateSection = (values: z.infer<typeof CourseSectionSchema>) => {
    const validatedFields = CourseSectionSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateSectionContent = (values: z.infer<typeof SectionContentSchema>) => {
    const validatedFields = SectionContentSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};

export const validateCreateReview = (values: z.infer<typeof createReviewSchema>) => {
    const validatedFields = createReviewSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new CustomError("Invalid Fields", 400);
    }

    return validatedFields.data;
};