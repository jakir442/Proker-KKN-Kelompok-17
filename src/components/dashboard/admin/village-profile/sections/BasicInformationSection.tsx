"use client";

import { Building2, Contact, ImageIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { FormGrid, FormInput, FormSection, FormUpload } from "@/components/forms";

import type { VillageProfileSectionProps } from "../section-props";

export function BasicInformationSection({ form, loading }: VillageProfileSectionProps) {
    return (
        <div className="space-y-6">
            <FormSection
                title="Informasi Dasar"
                description="Kelola identitas, kontak, dan informasi umum Desa Cintanagara."
                icon={Building2}
            >
                <FormGrid>
                    <Controller
                        control={form.control}
                        name="villageName"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Nama Desa"
                                placeholder="Desa Cintanagara"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Kode Pos"
                                placeholder="44181"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Kecamatan"
                                placeholder="Cigedug"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="regency"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Kabupaten"
                                placeholder="Garut"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Provinsi"
                                placeholder="Jawa Barat"
                                disabled={loading}
                            />
                        )}
                    />
                </FormGrid>

                <Controller
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormInput
                            {...field}
                            label="Alamat Kantor Desa"
                            placeholder="Alamat lengkap kantor desa"
                            disabled={loading}
                        />
                    )}
                />
            </FormSection>

            <FormSection
                title="Kontak & Pelayanan"
                description="Informasi yang dapat digunakan masyarakat untuk menghubungi desa."
                icon={Contact}
            >
                <FormGrid>
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Email Desa"
                                placeholder="desa@email.com"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Nomor Telepon"
                                placeholder="08xxxxxxxxxx"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Website"
                                placeholder="https://cintanagara.id"
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="officeHours"
                        render={({ field }) => (
                            <FormInput
                                {...field}
                                label="Jam Pelayanan"
                                placeholder="Senin - Jumat, 08.00 - 15.00"
                                disabled={loading}
                            />
                        )}
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Media Desa"
                description="Kelola logo dan foto kantor desa."
                icon={ImageIcon}
            >
                <FormGrid>
                    <Controller
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                            <FormUpload
                                label="Logo Desa"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="officePhoto"
                        render={({ field }) => (
                            <FormUpload
                                label="Foto Kantor Desa"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={loading}
                            />
                        )}
                    />
                </FormGrid>
            </FormSection>
        </div>
    );
}
