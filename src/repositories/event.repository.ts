import { connectDB } from "@/lib/mongodb";
import { Event, EventSchema, IEvent } from "@/models/event";

interface FindAllEventsOptions {
    page?: number;
    limit?: number;
    search?: string;
    published?: boolean;
    startDate?: Date;
    endDate?: Date;
}

export async function createEvent(data: Partial<EventSchema>): Promise<IEvent> {
    await connectDB();

    const event = await Event.create(data);

    return event;
}

export async function updateEvent(id: string, data: Partial<EventSchema>): Promise<IEvent | null> {
    await connectDB();

    return Event.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

export async function deleteEvent(id: string): Promise<IEvent | null> {
    await connectDB();

    return Event.findByIdAndDelete(id);
}

export async function findEventById(id: string): Promise<IEvent | null> {
    await connectDB();

    return Event.findById(id);
}

export async function findEventBySlug(slug: string): Promise<IEvent | null> {
    await connectDB();

    return Event.findOne({ slug });
}

export async function findEvents({
    page = 1,
    limit = 10,
    search = "",
    published,
    startDate,
    endDate,
}: FindAllEventsOptions) {
    await connectDB();

    const query: Record<string, unknown> = {};

    if (search) {
        query.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                location: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (published !== undefined) {
        query.published = published;
    }

    if (startDate || endDate) {
        const startDateFilter: Record<string, Date> = {};

        if (startDate) {
            startDateFilter.$gte = startDate;
        }

        if (endDate) {
            startDateFilter.$lte = endDate;
        }

        query.startDate = startDateFilter;
    }

    const total = await Event.countDocuments(query);

    const events = await Event.find(query)

        .sort({
            startDate: 1,
        })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        events,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}

export async function findPublishedEvents(limit = 6): Promise<IEvent[]> {
    await connectDB();

    return Event.find({
        published: true,
    })

        .sort({
            startDate: 1,
        })
        .limit(limit);
}

export async function findUpcomingEvents(limit = 6): Promise<IEvent[]> {
    await connectDB();

    return Event.find({
        published: true,
        startDate: {
            $gte: new Date(),
        },
    })

        .sort({
            startDate: 1,
        })
        .limit(limit);
}

export async function findOngoingEvents(): Promise<IEvent[]> {
    await connectDB();

    const now = new Date();

    return Event.find({
        published: true,
        startDate: {
            $lte: now,
        },
        endDate: {
            $gte: now,
        },
    })

        .sort({
            startDate: 1,
        });
}

export async function findCompletedEvents(limit = 10): Promise<IEvent[]> {
    await connectDB();

    return Event.find({
        published: true,
        endDate: {
            $lt: new Date(),
        },
    })

        .sort({
            endDate: -1,
        })
        .limit(limit);
}

export async function findRelatedEvents(slug: string, limit = 3): Promise<IEvent[]> {
    await connectDB();

    const currentEvent = await Event.findOne({ slug });

    if (!currentEvent) {
        return [];
    }

    return Event.find({
        _id: {
            $ne: currentEvent._id,
        },

        published: true,

        $or: [
            {
                location: currentEvent.location,
            },
            {
                title: {
                    $regex: currentEvent.title
                        .split(" ")
                        .filter((word) => word.length > 3)
                        .join("|"),
                    $options: "i",
                },
            },
        ],
    })

        .sort({
            startDate: 1,
        })
        .limit(limit);
}
