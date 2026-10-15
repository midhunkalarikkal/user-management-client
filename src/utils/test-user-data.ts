import type { UserFormValues } from "@/schemas/user.schema";
import { TEST_USER_TAG } from "@/utils/constant";

interface Tag {
  tag: string;
}

export const TEST_USER_DATA: UserFormValues & Tag = {
  firstName: "Alex",
  lastName: "Morgan",
  maidenName: "",
  age: 28,
  gender: "male",
  email: "alex.morgan@example.com",
  phone: "+1 555 010 2040",
  username: "alex.morgan28",
  password: "TestUser@123",
  birthDate: "1998-05-15",
  image: "https://dummyjson.com/icon/emilys/128",
  bloodGroup: "O+",
  height: 178,
  weight: 72,
  eyeColor: "Brown",

  hair: {
    color: "Black",
    type: "Straight",
  },

  ip: "192.0.2.25",
  macAddress: "02:1A:2B:3C:4D:5E",

  address: {
    address: "123 Example Street",
    city: "New York",
    state: "New York",
    stateCode: "NY",
    postalCode: "10001",
    country: "United States",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },

  university: "Example State University",

  bank: {
    cardExpire: "12/28",
    cardNumber: "4111111111111111",
    cardType: "visa",
    currency: "USD",
    iban: "GB82WEST12345698765432",
  },

  company: {
    department: "Engineering",
    name: "Example Technologies Ltd.",
    title: "Software Engineer",
    address: {
      address: "456 Business Avenue",
      city: "San Francisco",
      state: "California",
      stateCode: "CA",
      postalCode: "94105",
      country: "United States",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
  },

  ein: "12-3456789",
  ssn: "000-00-0000",
  userAgent: "Mozilla/5.0 (Test User)",
  crypto: {
    coin: "Bitcoin",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    network: "Ethereum (ERC20)",
  },

  role: "user",
  tag: TEST_USER_TAG,
};
