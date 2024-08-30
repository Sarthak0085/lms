import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
    code: z.optional(z.string().min(6, { message: "Code must have 6 digits" }))
});

export const RegisterSchema = z.object({
    name: z.string().min(3, { message: "Name is Required" }),
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
});

export const PasswordResetSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
});

export const ProfileInfoSchema = z.object({
    name: z.string().min(3, { message: "Name is Required" }),
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    image: z.string().min(2, { message: "Avatar is Required" }),
});

export const ChangePasswordSchema = z.object({
    oldPassword: z.string()
        .min(8, { message: "Old Password must contains 8 characters" }),
    newPassword: z.string()
        .min(8, { message: "New Password must contains 8 characters" }),
    confirmPassword: z.string()
        .min(8, { message: "Confirm Password must contains 8 characters" }),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const titleSchema = z.object({
    title: z.string().min(1, "Title cannot be empty")
});

const linksSchema = z.object({
    title: z.string().min(2, { message: "Title is required" }),
    url: z.string().min(2, { message: "URL is required" }),
})

const courseData = z.object({
    videoUrl: z.string().min(2, { message: "Video Url is required" }),
    title: z.string().min(2, { message: "Video Title is required" }),
    description: z.string().min(15, { message: "Video description is required" }),
    videoSection: z.string().min(2, { message: "Video Section is required" }),
    suggestion: z.optional(z.string()),
    links: z.array(linksSchema),
    videoLength: z.optional(z.number()),
});

const BenefitsSchema = z.array(titleSchema);
const PrerequisitesSchema = z.array(titleSchema);
const CourseDataSchema = z.array(courseData);

export const CreateCourseSchema = z.object({
    benefits: BenefitsSchema,
    prerequisites: PrerequisitesSchema,
    name: z.string().min(2, { message: "Course Name is required" }),
    description: z.string().min(50, { message: "Course description must be of 50 characters" }),
    price: z.string(),
    estimatedPrice: z.optional(z.string()),
    tags: z.string().min(2, { message: "Tags are required" }),
    level: z.string().min(2, { message: "Level is required" }),
    category: z.string().min(2, { message: "Category is required" }),
    demoUrl: z.string().min(2, { message: "Demo URL is required" }),
    thumbnail: z.string().min(2, { message: "Thumbnail is required" }),
    courseContentData: CourseDataSchema,
    totalVideos: z.number(),
});

export const EditCourseSchema = z.object({
    id: z.string().min(2, { message: "Id is required" }),
    benefits: BenefitsSchema,
    prerequisites: PrerequisitesSchema,
    name: z.string().min(2, { message: "Course Name is required" }),
    description: z.string().min(50, { message: "Course description must be of 50 characters" }),
    price: z.string(),
    estimatedPrice: z.optional(z.string()),
    tags: z.string().min(2, { message: "Tags are required" }),
    level: z.string().min(2, { message: "Level is required" }),
    category: z.string().min(2, { message: "Category is required" }),
    demoUrl: z.string().min(2, { message: "Demo URL is required" }),
    thumbnail: z.string().min(2, { message: "Thumbnail is required" }),
    courseContentData: CourseDataSchema,
    totalVideos: z.number(),
});

export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    title: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional(),
});