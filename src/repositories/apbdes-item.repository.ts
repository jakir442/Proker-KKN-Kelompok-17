import { BudgetCategory } from "@/constants/apbdes";
import { connectDB } from "@/lib/mongodb";
import { APBDesItem } from "@/models/apbdes-item";

export class APBDesItemRepository {
    static async findByAPBDes(apbdesId: string) {
        await connectDB();

        const items = await APBDesItem.find({
            apbdesId,
        })
            .lean()
            .sort({
                category: 1,
                createdAt: 1,
            });

        return items.map((item) => ({
            id: item._id.toString(),
            apbdesId: item.apbdesId.toString(),
            category: item.category,
            name: item.name,
            budget: item.budget,
            realization: item.realization,
            notes: item.notes,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    }

    static async findById(id: string) {
        await connectDB();

        return APBDesItem.findById(id);
    }

    static async create(data: object) {
        await connectDB();

        return APBDesItem.create(data);
    }

    static async update(id: string, data: object) {
        await connectDB();

        return APBDesItem.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    static async delete(id: string) {
        await connectDB();

        return APBDesItem.findByIdAndDelete(id);
    }

    static async getSummary(apbdes: string) {
        await connectDB();

        const items = await APBDesItem.find({
            apbdes,
        });

        const summary = {
            revenue: {
                budget: 0,
                realization: 0,
            },
            expenditure: {
                budget: 0,
                realization: 0,
            },
            financing: {
                budget: 0,
                realization: 0,
            },
        };

        for (const item of items) {
            switch (item.category) {
                case BudgetCategory.REVENUE:
                    summary.revenue.budget += item.budget;
                    summary.revenue.realization += item.realization;
                    break;

                case BudgetCategory.EXPENDITURE:
                    summary.expenditure.budget += item.budget;
                    summary.expenditure.realization += item.realization;
                    break;

                case BudgetCategory.FINANCING:
                    summary.financing.budget += item.budget;
                    summary.financing.realization += item.realization;
                    break;
            }
        }

        return summary;
    }

    static async getChartData(apbdesId: string) {
        await connectDB();

        const items = await APBDesItem.find({
            apbdesId,
        });

        const summary = {
            revenue: {
                budget: 0,
                realization: 0,
            },
            expenditure: {
                budget: 0,
                realization: 0,
            },
            financing: {
                budget: 0,
                realization: 0,
            },
        };

        for (const item of items) {
            switch (item.category) {
                case BudgetCategory.REVENUE:
                    summary.revenue.budget += item.budget;
                    summary.revenue.realization += item.realization;
                    break;

                case BudgetCategory.EXPENDITURE:
                    summary.expenditure.budget += item.budget;
                    summary.expenditure.realization += item.realization;
                    break;

                case BudgetCategory.FINANCING:
                    summary.financing.budget += item.budget;
                    summary.financing.realization += item.realization;
                    break;
            }
        }

        return [
            {
                name: "Pendapatan",
                budget: summary.revenue.budget,
                realization: summary.revenue.realization,
            },
            {
                name: "Belanja",
                budget: summary.expenditure.budget,
                realization: summary.expenditure.realization,
            },
            {
                name: "Pembiayaan",
                budget: summary.financing.budget,
                realization: summary.financing.realization,
            },
        ];
    }
}
