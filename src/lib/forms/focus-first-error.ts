import type { FieldErrors } from "react-hook-form";

export function focusFirstError<T extends Record<string, unknown>>(errors: FieldErrors<T>) {
    const firstError = Object.keys(errors)[0];

    if (!firstError) return;

    const element = document.getElementById(firstError);

    if (!(element instanceof HTMLElement)) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });

    requestAnimationFrame(() => {
        element.focus();

        element.classList.add("form-error-highlight");

        window.setTimeout(() => {
            element.classList.remove("form-error-highlight");
        }, 1200);
    });
}
