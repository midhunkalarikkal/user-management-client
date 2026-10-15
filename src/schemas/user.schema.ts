import { z } from "zod";
import type { User } from "@/types/user";
import { toDateInputValue } from "@/utils/helper/convertApiDate";

// Validates an optional text field.
const text = z.string().trim();

// Validates a user location coordinate.
const latitude = z.number().finite().min(-90).max(90);
const longitude = z.number().finite().min(-180).max(180);

// Validates residential and company addresses.
const addressSchema = z.object({
    address: text,
    city: text,
    state: text,
    stateCode: text,
    postalCode: text,
    country: text,
    coordinates: z.object({
        lat: latitude,
        lng: longitude,
    }),
});

// Validates hair information.
const hairSchema = z.object({
    color: text,
    type: text,
});

// Validates bank information.
const bankSchema = z.object({
    cardExpire: text,
    cardNumber: text,
    cardType: text,
    currency: text,
    iban: text,
});

// Validates company information.
const companySchema = z.object({
    department: text,
    name: text,
    title: text,
    address: addressSchema,
});

// Validates cryptocurrency information.
const cryptoSchema = z.object({
    coin: text,
    wallet: text,
    network: text,
});

// Shared zod validation schema  for creating and editing users.
export const userFormSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    maidenName: text,

    age: z
        .number()
        .int("Age must be a whole number")
        .min(1, "Age must be at least 1")
        .max(120, "Age must be 120 or less"),

    image: z
        .string()
        .trim()
        .min(1, "Profile image is required")
        .pipe(z.url("Enter a valid image URL")),

    role: z.enum(["admin", "moderator", "user"]),

    gender: z.enum(["male", "female", "other"]),

    email: z.email("Enter a valid email address"),
    phone: text,

    username: z
        .string()
        .trim()
        .min(3, "Username must contain at least 3 characters"),

    password: z.string(),

    birthDate: z.string().refine(
        (value) =>
            !value ||
            (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
                !Number.isNaN(Date.parse(value))),
        "Enter a valid date",
    ),

    bloodGroup: text,

    height: z.number().finite().min(0, "Height cannot be negative"),
    weight: z.number().finite().min(0, "Weight cannot be negative"),

    eyeColor: text,
    hair: hairSchema,

    ip: text,
    address: addressSchema,
    macAddress: text,
    university: text,

    bank: bankSchema,
    company: companySchema,

    ein: text,
    ssn: text,
    userAgent: text,
    crypto: cryptoSchema,
});

// Create new user zod schema, adding a password required filed.
export const createUserSchema = userFormSchema.extend({
    password: z
        .string()
        .min(6, "Password must contain at least 6 characters"),
});

// Editing a user zod validation schema, editing allows the password to remain unchanged.
export const editUserSchema = userFormSchema;

// Defines the complete form values.
export type UserFormValues = z.infer<typeof userFormSchema>;

const emptyAddress = () => ({
    address: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
    country: "",
    coordinates: {
        lat: 0,
        lng: 0,
    },
});

// Creates an empty user form.
export const getDefaultUserValues = (): UserFormValues => ({
    firstName: "",
    lastName: "",
    maidenName: "",
    age: 18,
    gender: "other",
    email: "",
    phone: "",
    username: "",
    password: "",
    birthDate: "",
    image: "",
    bloodGroup: "",
    height: 0,
    weight: 0,
    eyeColor: "",
    hair: {
        color: "",
        type: "",
    },
    ip: "",
    address: emptyAddress(),
    macAddress: "",
    university: "",
    bank: {
        cardExpire: "",
        cardNumber: "",
        cardType: "",
        currency: "",
        iban: "",
    },
    company: {
        department: "",
        name: "",
        title: "",
        address: emptyAddress(),
    },
    ein: "",
    ssn: "",
    userAgent: "",
    crypto: {
        coin: "",
        wallet: "",
        network: "",
    },
    role: "user",
});

// Maps an existing user into editable form values.
export const getUserFormValues = (
    user: User,
): UserFormValues => {

    const { id: _id, password: _password, ...values } = user;

    void _id;
    void _password;

    return {
        ...getDefaultUserValues(),
        ...values,
        birthDate: toDateInputValue(user.birthDate),
        password: "",
        hair: {
            ...getDefaultUserValues().hair,
            ...user.hair,
        },
        address: {
            ...emptyAddress(),
            ...user.address,
            coordinates: {
                ...emptyAddress().coordinates,
                ...user.address?.coordinates,
            },
        },
        bank: {
            ...getDefaultUserValues().bank,
            ...user.bank,
        },
        company: {
            ...getDefaultUserValues().company,
            ...user.company,
            address: {
                ...emptyAddress(),
                ...user.company?.address,
                coordinates: {
                    ...emptyAddress().coordinates,
                    ...user.company?.address?.coordinates,
                },
            },
        },
        crypto: {
            ...getDefaultUserValues().crypto,
            ...user.crypto,
        },
    };
};
