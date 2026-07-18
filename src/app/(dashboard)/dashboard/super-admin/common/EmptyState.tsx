import { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white px-8 py-12 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
                {icon ?? <Inbox className="h-8 w-8 text-slate-500" />}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
            )}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
