import { APBDesStatus } from "@/constants/apbdes";

export interface APBDesTableData {
    id: string;
    year: number;
    title: string;
    description: string;
    status: APBDesStatus;
    createdAt: string;
    updatedAt: string;
}

export interface APBDesDetailData extends APBDesTableData {
    revenueBudget: number;
    revenueRealization: number;

    expenditureBudget: number;
    expenditureRealization: number;

    financingBudget: number;
    financingRealization: number;

    totalBudget: number;
    totalRealization: number;
    percentage: number;
}
