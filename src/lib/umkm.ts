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
export function isUMKMOpen(openTime?: string, closeTime?: string) {
    if (!openTime || !closeTime) return false;
    const now = new Date();

    // Ambil jam WIB
    const formatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const parts = formatter.formatToParts(now);

    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);

    const currentMinutes = hour * 60 + minute;

    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);

    const openMinutes = openHour * 60 + openMinute;
    const closeMinutes = closeHour * 60 + closeMinute;

    // Normal (08:00 - 17:00)
    if (openMinutes <= closeMinutes) {
        return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
    }

    // Melewati tengah malam (18:00 - 02:00)
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
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
