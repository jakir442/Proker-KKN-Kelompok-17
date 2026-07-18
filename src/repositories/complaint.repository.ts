import { connectDB } from "@/lib/mongodb";
import { Complaint, IComplaint } from "@/models/complaint";

interface FindAllParams {
    search?: string;
    status?: string;
    category?: string;
}

export async function findAllComplaints(params: FindAllParams = {}) {
    await connectDB();

    const query: Record<string, unknown> = {};

    if (params.search) {
        query.$or = [
            { title: { $regex: params.search, $options: "i" } },
            { description: { $regex: params.search, $options: "i" } },
            { name: { $regex: params.search, $options: "i" } },
        ];
    }

    if (params.status) {
        query.status = params.status;
    }

    if (params.category) {
        query.category = params.category;
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 }).lean();

    return complaints.map((complaint) => ({
        ...complaint,
        _id: complaint._id.toString(),
    }));
}

export async function findComplaintById(id: string) {
    await connectDB();

    const complaint = await Complaint.findById(id).lean();

    if (!complaint) {
        return null;
    }

    return {
        ...complaint,
        _id: complaint._id.toString(),
    };
}

export async function createComplaint(data: Partial<IComplaint>) {
    await connectDB();

    const complaint = await Complaint.create(data);

    return {
        ...complaint.toObject(),
        _id: complaint._id.toString(),
    };
}

export async function updateComplaint(
    id: string,
    data: Partial<IComplaint>,
): Promise<IComplaint | null> {
    await connectDB();
    return Complaint.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).lean();
}

export async function updateComplaintStatus(
    id: string,
    status: IComplaint["status"],
): Promise<IComplaint | null> {
    await connectDB();
    return Complaint.findByIdAndUpdate(
        id,
        { status },
        {
            new: true,
            runValidators: true,
        },
    ).lean();
}

export async function deleteComplaint(id: string): Promise<IComplaint | null> {
    await connectDB();

    return Complaint.findByIdAndDelete(id);
}

export async function countComplaints(): Promise<number> {
    await connectDB();

    return Complaint.countDocuments();
}

export async function countComplaintsByStatus(status: IComplaint["status"]): Promise<number> {
    await connectDB();

    return Complaint.countDocuments({
        status,
    });
}

export async function respondComplaint(
    id: string,
    data: {
        status: IComplaint["status"];
        response: string;
        respondedBy?: string;
    },
): Promise<IComplaint | null> {
    await connectDB();

    return Complaint.findByIdAndUpdate(
        id,
        {
            status: data.status,
            response: data.response,
            respondedAt: new Date(),
            respondedBy: data.respondedBy,
        },
        {
            new: true,
            runValidators: true,
        },
    );
}
