import type { UserFormSection } from "@/types/components";

// Fields displayed in the shared add/edit user form.
export const USER_FORM_SECTIONS = [
  {
    title: "Personal information",
    description: "Basic identity and profile details.",
    fields: [
      { name: "firstName", label: "First name", placeholder: "First name" },
      { name: "lastName", label: "Last name", placeholder: "Last name" },
      { name: "maidenName", label: "Maiden name" },
      { name: "age", label: "Age", type: "number", step: "1" },
      { name: "gender", label: "Gender" },
      { name: "birthDate", label: "Date of birth", type: "date" },
      { name: "bloodGroup", label: "Blood group" },
      { name: "height", label: "Height (cm)", type: "number", step: "0.01" },
      { name: "weight", label: "Weight (kg)", type: "number", step: "0.01" },
      { name: "eyeColor", label: "Eye color" },
      { name: "hair.color", label: "Hair color" },
      { name: "hair.type", label: "Hair type" },
      { name: "image", label: "Profile image URL", type: "url" },
      { name: "university", label: "University" },
    ],
  },
  {
    title: "Account information",
    description: "Contact details, credentials, and account access.",
    fields: [
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", autocomplete: "tel" },
      { name: "username", label: "Username" },
      { name: "password", label: "Password", type: "password", autocomplete: "new-password" },
      { name: "role", label: "Role" },
      { name: "ip", label: "IP address" },
      { name: "macAddress", label: "MAC address" },
      { name: "userAgent", label: "User agent" },
      { name: "ein", label: "EIN" },
      { name: "ssn", label: "SSN", type: "password", autocomplete: "off" },
    ],
  },
  {
    title: "Residential address",
    description: "Address and geographic coordinates.",
    fields: [
      { name: "address.address", label: "Street address" },
      { name: "address.city", label: "City" },
      { name: "address.state", label: "State" },
      { name: "address.stateCode", label: "State code" },
      { name: "address.postalCode", label: "Postal code" },
      { name: "address.country", label: "Country" },
      {
        name: "address.coordinates.lat",
        label: "Latitude",
        type: "number",
        step: "any",
      },
      {
        name: "address.coordinates.lng",
        label: "Longitude",
        type: "number",
        step: "any",
      },
    ],
  },
  {
    title: "Company information",
    description: "Employment and organization details.",
    fields: [
      { name: "company.name", label: "Company name" },
      { name: "company.department", label: "Department" },
      { name: "company.title", label: "Job title" },
    ],
  },
  {
    title: "Company address",
    description: "Registered location and coordinates of the company.",
    fields: [
      { name: "company.address.address", label: "Street address" },
      { name: "company.address.city", label: "City" },
      { name: "company.address.state", label: "State" },
      { name: "company.address.stateCode", label: "State code" },
      { name: "company.address.postalCode", label: "Postal code" },
      { name: "company.address.country", label: "Country" },
      {
        name: "company.address.coordinates.lat",
        label: "Latitude",
        type: "number",
        step: "any",
      },
      {
        name: "company.address.coordinates.lng",
        label: "Longitude",
        type: "number",
        step: "any",
      },
    ],
  },
  {
    title: "Bank information",
    description: "Bank account and payment-related details.",
    fields: [
      { name: "bank.cardExpire", label: "Card expiry" },
      {
        name: "bank.cardNumber",
        label: "Card number",
        type: "password",
        autocomplete: "off",
      },
      { name: "bank.cardType", label: "Card type" },
      { name: "bank.currency", label: "Currency" },
      { name: "bank.iban", label: "IBAN" },
    ],
  },
  {
    title: "Cryptocurrency information",
    description: "Digital asset and wallet details.",
    fields: [
      { name: "crypto.coin", label: "Coin" },
      {
        name: "crypto.wallet",
        label: "Wallet address",
        autocomplete: "off",
      },
      { name: "crypto.network", label: "Network" },
    ],
  },
] as const satisfies readonly UserFormSection[];
