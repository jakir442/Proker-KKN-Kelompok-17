// "use server";

// import { revalidatePath } from "next/cache";

// import { updateEvent, findEventById } from "@/repositories/event.repository";

// import { generateSlug } from "@/lib/utils/generate-slug";

// import { eventSchema } from "@/validations/event.schema";

// export async function updateEventAction(id: string, input: unknown) {
//     try {
//         const values = eventSchema.parse(input);

//         const current = await findEventById(id);

//         if (!current) {
//             return {
//                 success: false,
//                 message: "Agenda tidak ditemukan.",
//             };
//         }

//         const slug = current.title === values.title ? current.slug : generateSlug(values.title);

//         const result = await updateEvent(id, {
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

//             publishedAt:
//                 values.published && !current.published
//                     ? new Date()
//                     : values.published
//                       ? current.publishedAt
//                       : null,
//         });

//         revalidatePath("/dashboard/super-admin/events");
//         revalidatePath(`/events/${slug}`);
//         revalidatePath("/events");

//         return {
//             success: true,
//             message: "Agenda berhasil diperbarui.",
//             data: result,
//         };
//     } catch (error) {
//         console.error(error);

//         return {
//             success: false,
//             message: "Gagal memperbarui agenda.",
//         };
//     }
// }
