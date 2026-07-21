/**
 * Mengembalikan status buka/tutup UMKM berdasarkan jam operasional.
 *
 * Format waktu yang didukung:
 * HH:mm
 *
 * Contoh:
 * 08:00
 * 17:30
 */
export function isUMKMOpen(openTime: string, closeTime: string, currentDate = new Date()): boolean {
    if (!openTime || !closeTime) return false;

    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);

    if (
        Number.isNaN(openHour) ||
        Number.isNaN(openMinute) ||
        Number.isNaN(closeHour) ||
        Number.isNaN(closeMinute)
    ) {
        return false;
    }

    const now = new Date(currentDate);

    const open = new Date(currentDate);
    open.setHours(openHour, openMinute, 0, 0);

    const close = new Date(currentDate);
    close.setHours(closeHour, closeMinute, 0, 0);

    // Mendukung jam operasional yang melewati tengah malam
    // Contoh: 18:00 - 02:00
    if (close <= open) {
        close.setDate(close.getDate() + 1);

        if (now < open) {
            now.setDate(now.getDate() + 1);
        }
    }

    return now >= open && now <= close;
}

/**
 * Format jam operasional.
 *
 * Contoh:
 * 08:00 - 17:00
 */
export function formatOperatingHours(openTime: string, closeTime: string): string {
    if (!openTime || !closeTime) {
        return "-";
    }

    return `${openTime} - ${closeTime}`;
}

/**
 * Membersihkan nomor WhatsApp agar sesuai format wa.me
 *
 * Contoh:
 * 08123456789
 * +628123456789
 * 62 812-3456-789
 *
 * =>
 * 628123456789
 */
export function normalizeWhatsappNumber(phone: string): string {
    if (!phone) return "";

    let normalized = phone.replace(/\D/g, "");

    if (normalized.startsWith("0")) {
        normalized = `62${normalized.slice(1)}`;
    }

    return normalized;
}

/**
 * Membuat URL WhatsApp
 */
export function createWhatsappUrl(phone: string, message?: string): string {
    const number = normalizeWhatsappNumber(phone);

    if (!number) {
        return "#";
    }

    if (!message) {
        return `https://wa.me/${number}`;
    }

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
