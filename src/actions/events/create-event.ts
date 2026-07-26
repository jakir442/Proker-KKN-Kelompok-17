// "use server";

// import { revalidatePath } from "next/cache";
// import { auth } from "@/auth";

// import { createEvent } from "@/repositories/event.repository";

// import { generateSlug } from "@/lib/utils/generate-slug";

// import { eventSchema } from "@/validations/event.schema";

// export async function createEventAction(input: unknown) {
//     try {
//         const session = await auth();

//         if (!session?.user?.id) {
//             return {
//                 success: false,
//                 message: "Anda harus login.",
//             };
//         }

//         const values = eventSchema.parse(input);

//         const slug = generateSlug(values.title);

//         const result = await createEvent({
//             title: values.title,
//             slug,

//             description: values.description,

//             location: values.location,
//             latitude: values.latitude,
//             longitude: values.longitude,

//             coverImage: values.coverImage,

//             startDate: new Date(`${values.startDate}T${values.startTime}`),
//             endDate: new Date(`${values.endDate}T${values.endTime}`),

//             startTime: values.startTime,
//             endTime: values.endTime,

//             organizer: values.organizer,
//             contact: values.contact,

//             published: values.published,
//             publishedAt: values.published ? new Date() : null,

//             createdBy: session.user.id,
//         });

//         revalidatePath("/dashboard/super-admin/events");
//         revalidatePath("/events");

//         return {
//             success: true,
//             message: "Agenda berhasil ditambahkan.",
//             data: result,
//         };
//     } catch (error) {
//         console.error(error);

//         return {
//             success: false,
//             message: "Gagal menambahkan agenda.",
//         };
//     }
// }
