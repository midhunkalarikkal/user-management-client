import DetailItem from "./data-item";
import type { Address } from "@/types/user";

const AddressDetails = ({ address }: { address: Address }) => {
  return (
    <>
      <DetailItem label="Street address" value={address.address} />
      <DetailItem label="City" value={address.city} />
      <DetailItem label="State" value={address.state} />
      <DetailItem label="State code" value={address.stateCode} />
      <DetailItem label="Postal code" value={address.postalCode} />
      <DetailItem label="Country" value={address.country} />
      <DetailItem
        label="Latitude"
        value={address.coordinates?.lat}
      />
      <DetailItem
        label="Longitude"
        value={address.coordinates?.lng}
      />
    </>
  );
}

export default AddressDetails;