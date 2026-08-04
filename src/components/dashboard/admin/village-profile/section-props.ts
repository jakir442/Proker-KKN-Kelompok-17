import type { UseFormReturn } from "react-hook-form";

import type { VillageProfileValues } from "@/validations/village-profile.schema";

export interface VillageProfileSectionProps {
    form: UseFormReturn<VillageProfileValues>;
    loading?: boolean;
}
