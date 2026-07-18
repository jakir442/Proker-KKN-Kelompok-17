import { APBDesStatus } from "@/constants/apbdes";
import { connectDB } from "@/lib/mongodb";
import { APBDes, IAPBDes } from "@/models/apbdes";

interface FindAllOptions {
    search?: string;
    status?: APBDesStatus;
    year?: number;
}

export class APBDesRepository {
    static async findAll({ search, status, year }: FindAllOptions = {}) {
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
            ];
        }

        if (status) {
            query.status = status;
        }

        if (year) {
            query.year = year;
        }

        return APBDes.find(query).sort({
            year: -1,
            createdAt: -1,
        });
    }

    static async findById(id: string) {
        await connectDB();

        return APBDes.findById(id);
    }

    static async findActive() {
        await connectDB();

        return APBDes.findOne({
            status: APBDesStatus.ACTIVE,
        });
    }

    static async create(data: Omit<IAPBDes, keyof Document>) {
        await connectDB();

        return APBDes.create(data);
    }

    static async update(id: string, data: Partial<Omit<IAPBDes, keyof Document>>) {
        await connectDB();

        return APBDes.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    static async delete(id: string) {
        await connectDB();

        return APBDes.findByIdAndDelete(id);
    }

    static async setActive(id: string) {
        await connectDB();

        await APBDes.updateMany(
            {},
            {
                status: APBDesStatus.ARCHIVED,
            },
        );

        return APBDes.findByIdAndUpdate(
            id,
            {
                status: APBDesStatus.ACTIVE,
            },
            {
                new: true,
            },
        );
    }
}
