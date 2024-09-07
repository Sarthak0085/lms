import { auth } from '@/auth';
import { currentUser } from '@/lib/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// const auth = () => ({ id: 'fakeId' }); // Fake auth function


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter: FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  // imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
  //   // Set permissions and file types for this FileRoute
  //   .middleware(async ({ }) => {
  //     // This code runs on your server before upload
  //     const session = await auth();

  //     // If you throw, the user will not be able to upload
  //     if (!session) throw new Error('Unauthorized');

  //     // Whatever is returned here is accessible in onUploadComplete as `metadata`
  //     return { userId: session?.user?.id };
  //   })
  //   .onUploadComplete(async () => {
  //     // This code RUNS ON YOUR SERVER after upload
  //   })
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ }) => {
      const user = await currentUser();
      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized');
      console.log(user?.id);

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
  videoUploader: f({ video: { maxFileSize: "16MB" } })
    .middleware(async ({ }) => {
      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;