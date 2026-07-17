import { BudgetCategory } from "@/constants/apbdes";

export interface APBDesItemTableData {
    id: string;
    apbdesId: string;
    category: BudgetCategory;
    name: string;
    budget: number;
    realization: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
