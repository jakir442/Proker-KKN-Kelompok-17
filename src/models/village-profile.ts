import { model, models, Schema } from "mongoose";

export interface IVillageProfile {
    _id?: string;

    // Basic Information
    villageName: string;
    address: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;

    email: string;
    phone: string;
    website?: string;

    officeHours?: string;

    logo?: string;
    officePhoto?: string;

    // About
    about: string;
    history: string;

    // Vision Mission
    vision: string;
    mission: string[];

    // Headman
    headman: {
        name: string;
        position: string;
        photo?: string;

        photoSettings?: {
            zoom: number;
            positionX: number;
            positionY: number;
        };

        greeting: string;
    };

    // Statistics
    statistics: {
        area: number;
        population: number;
        households: number;
        rt: number;
        rw: number;
        hamlets: number;
    };

    // Location
    location: {
        latitude: number;
        longitude: number;
        googleMaps?: string;
    };

    createdAt?: Date;
    updatedAt?: Date;
}

const villageProfileSchema = new Schema<IVillageProfile>(
    {
        // Basic Information
        villageName: {
            type: String,
            required: true,
            trim: true,
            default: "Desa Cintanagara",
        },

        address: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },

        district: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },

        regency: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },

        province: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },

        postalCode: {
            type: String,
            default: "",
            trim: true,
        },

        email: {
            type: String,
            default: "",
            trim: true,
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        website: {
            type: String,
            default: "",
            trim: true,
        },

        officeHours: {
            type: String,
            default: "",
            trim: true,
        },

        logo: {
            type: String,
            default: "",
        },

        officePhoto: {
            type: String,
            default: "",
        },

        // Content
        about: {
            type: String,
            required: true,
            trim: true,
        },

        history: {
            type: String,
            required: true,
            trim: true,
        },

        vision: {
            type: String,
            required: true,
            trim: true,
        },

        mission: [
            {
                type: String,
                trim: true,
            },
        ],

        // Headman
        headman: {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            position: {
                type: String,
                default: "Kepala Desa",
                trim: true,
            },

            photo: {
                type: String,
                default: "",
            },

            photoSettings: {
                zoom: {
                    type: Number,
                    default: 1,
                    min: 1,
                    max: 2,
                },

                positionX: {
                    type: Number,
                    default: 50,
                    min: 0,
                    max: 100,
                },

                positionY: {
                    type: Number,
                    default: 50,
                    min: 0,
                    max: 100,
                },
            },

            greeting: {
                type: String,
                required: true,
            },
        },

        // Statistics
        statistics: {
            area: {
                type: Number,
                default: 0,
                min: 0,
            },

            population: {
                type: Number,
                default: 0,
                min: 0,
            },

            households: {
                type: Number,
                default: 0,
                min: 0,
            },

            rt: {
                type: Number,
                default: 0,
                min: 0,
            },

            rw: {
                type: Number,
                default: 0,
                min: 0,
            },

            hamlets: {
                type: Number,
                default: 0,
                min: 0,
            },
        },

        // Maps
        location: {
            latitude: {
                type: Number,
                default: -7.2945319358058,
            },

            longitude: {
                type: Number,
                default: 107.81471817152,
            },

            googleMaps: {
                type: String,
                default: "",
                trim: true,
            },
        },
    },
    {
        timestamps: true,
    },
);

export const VillageProfile =
    models.VillageProfile ?? model<IVillageProfile>("VillageProfile", villageProfileSchema);
