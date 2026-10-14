
/** Represents geographical latitude and longitude coordinates. */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Represents a user's residential or company address. */
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

/** Represents a user's hair color and type. */
export interface Hair {
  color: string;
  type: string;
}

/** Represents a user's banking and payment information. */
export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

/** Represents a user's employment and company details. */
export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

/** Represents a user's cryptocurrency wallet information. */
export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

/** Defines the supported user roles. */
export type UserRole = "admin" | "moderator" | "user";

/** Defines the supported user gender values. */
export type UserGender = "male" | "female" | "other";

/** Represents a complete user record returned by the DummyJSON Users API. */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: UserGender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: UserRole;
}

/** Represents the paginated response returned by the users listing endpoint. */
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

/** Defines the optional user fields accepted when creating a user, excluding the ID. */
export type CreateUserInput = Partial<Omit<User, "id">>;

/** Defines the optional user fields accepted when updating a user, excluding the ID. */
export type UpdateUserInput = Partial<Omit<User, "id">>;
