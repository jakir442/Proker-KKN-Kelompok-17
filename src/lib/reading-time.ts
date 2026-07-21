export function calculateReadingTime(content: string) {
    const text = content.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;

    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} menit membaca`;
}
