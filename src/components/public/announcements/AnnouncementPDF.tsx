"use client";

import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        lineHeight: 1.8,
        fontFamily: "Helvetica",
    },

    header: {
        textAlign: "center",
        marginBottom: 20,
        borderBottom: "2 solid #000",
        paddingBottom: 12,
    },

    village: {
        fontSize: 18,
        fontWeight: "bold",
    },

    district: {
        fontSize: 12,
        marginTop: 2,
    },

    title: {
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },

    meta: {
        marginBottom: 18,
        fontSize: 10,
        color: "#666",
    },

    image: {
        width: "100%",
        height: 240,
        objectFit: "cover",
        marginBottom: 20,
    },

    content: {
        textAlign: "justify",
        fontSize: 11,
    },

    footer: {
        marginTop: 30,
        borderTop: "1 solid #DDD",
        paddingTop: 10,
        fontSize: 9,
        color: "#666",
        textAlign: "center",
    },
});

interface Props {
    title: string;
    category: string;
    coverImage: string;
    content: string;
    publishedAt: string;
}

export function AnnouncementPDF({ title, category, coverImage, content, publishedAt }: Props) {
    const date = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(publishedAt));

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.village}>PEMERINTAH DESA CINTANAGARA</Text>

                    <Text style={styles.district}>Kecamatan Cigedug • Kabupaten Garut</Text>
                </View>

                <Text style={styles.title}>PENGUMUMAN RESMI</Text>

                <View style={styles.meta}>
                    <Text>Judul : {title}</Text>
                    <Text>Kategori : {category}</Text>
                    <Text>Tanggal : {date}</Text>
                </View>

                {!!coverImage && <Image src={coverImage} style={styles.image} />}

                <Text style={styles.content}>{content.replace(/<[^>]+>/g, "")}</Text>

                <View style={styles.footer}>
                    <Text>Dokumen ini diunduh dari</Text>

                    <Text>Cintanagara Smart Village</Text>

                    <Text>Dicetak {new Date().toLocaleString("id-ID")}</Text>
                </View>
            </Page>
        </Document>
    );
}
