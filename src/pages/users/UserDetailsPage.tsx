import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  Edit3,
  Home,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/services/user.service";
import DetailItem from "@/components/details/data-item";
import UserProfile from "@/components/details/ProfileDetails";
import DetailsSection from "@/components/details/DetailsSection";
import AddressDetails from "@/components/details/AddressDetails";
import LoadingPage from "@/components/layout/LoadingPage";
import ErrorAlert from "@/components/alerts/ErrorAlert";

const UserDetails = ({ user }: { user: Omit<User, "password"> }) => {
  return (
    <div className="space-y-5">
      <UserProfile user={user} />

      <DetailsSection
        title="Personal information"
        description="Basic identity and personal details."
        icon={<UserRound className="size-5" />}
      >
        <DetailItem label="First name" value={user.firstName} />
        <DetailItem label="Last name" value={user.lastName} />
        <DetailItem label="Maiden name" value={user.maidenName} />
        <DetailItem label="Age" value={user.age} />
        <DetailItem label="Gender" value={user.gender} />
        <DetailItem label="Date of birth" value={user.birthDate} />
        <DetailItem label="Profile image URL" value={user.image} />
      </DetailsSection>

      <DetailsSection
        title="Account information"
        description="Account credentials, access and contact information."
        icon={<ShieldCheck className="size-5" />}
      >
        <DetailItem label="User ID" value={user.id} />
        <DetailItem label="Username" value={user.username} />
        <DetailItem label="Email" value={user.email} />
        <DetailItem label="Phone" value={user.phone} />
        <DetailItem label="Role" value={user.role} />

        <DetailItem label="IP address" value={user.ip} />
        <DetailItem label="MAC address" value={user.macAddress} />
        <DetailItem label="User agent" value={user.userAgent} />
        <DetailItem label="EIN" value={user.ein} sensitive />
        <DetailItem label="SSN" value={user.ssn} sensitive />
      </DetailsSection>

      <DetailsSection
        title="Physical characteristics"
        description="Physical attributes and appearance details."
        icon={<UserRound className="size-5" />}
      >
        <DetailItem label="Blood group" value={user.bloodGroup} />
        <DetailItem label="Height" value={user.height == null ? undefined : `${user.height} cm`} />
        <DetailItem label="Weight" value={user.weight == null ? undefined : `${user.weight} kg`} />
        <DetailItem label="Eye color" value={user.eyeColor} />
        <DetailItem label="Hair color" value={user.hair?.color} />
        <DetailItem label="Hair type" value={user.hair?.type} />
      </DetailsSection>

      <DetailsSection
        title="Residential address"
        description="Home address and geographic coordinates."
        icon={<Home className="size-5" />}
      >
        <AddressDetails address={user.address} />
      </DetailsSection>

      <DetailsSection
        title="Employment information"
        description="Professional and educational background."
        icon={<BriefcaseBusiness className="size-5" />}
      >
        <DetailItem label="Company name" value={user.company?.name} />
        <DetailItem label="Department" value={user.company?.department} />
        <DetailItem label="Job title" value={user.company?.title} />
        <DetailItem label="University" value={user.university} />
      </DetailsSection>

      <DetailsSection
        title="Company address"
        description="Company location and geographic coordinates."
        icon={<Building2 className="size-5" />}
      >
        <AddressDetails address={user.company.address} />
      </DetailsSection>

      <DetailsSection
        title="Bank information"
        description="Banking and payment account details."
        icon={<CreditCard className="size-5" />}
      >
        <DetailItem label="Card number" value={user.bank?.cardNumber} sensitive />
        <DetailItem label="Card expiry" value={user.bank?.cardExpire} />
        <DetailItem label="Card type" value={user.bank?.cardType} />
        <DetailItem label="Currency" value={user.bank?.currency} />
        <DetailItem label="IBAN" value={user.bank?.iban} sensitive />
      </DetailsSection>

      <DetailsSection
        title="Cryptocurrency information"
        description="Digital asset and wallet information."
        icon={<Wallet className="size-5" />}
      >
        <DetailItem label="Coin" value={user.crypto?.coin} />
        <DetailItem label="Wallet address" value={user.crypto?.wallet} sensitive />
        <DetailItem label="Network" value={user.crypto?.network} />
      </DetailsSection>
    </div>
  );
};

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const id = Number(userId);
  const isValidId = Number.isSafeInteger(id) && id > 0;

  const {
    data: user,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: ({ signal }) => getUserById(id, signal),
    enabled: isValidId,
  });

  if (!isValidId) {
    return (
      <ErrorAlert
        heading="Invalid user ID"
        errorMessage="The requested user ID is not valid."
        error={error}
        refetch={refetch}
      />
    );
  }

  if (isPending) {
    return <LoadingPage />;
  }

  if (!isError || !user) {
    return (
      <ErrorAlert
        heading="Failed to load user details"
        errorMessage="Something went wrong"
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 cursor-pointer"
            onClick={() => navigate("/users")}
          >
            <ArrowLeft className="size-4" />
            Back to users
          </Button>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">User details</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete profile and account information for this user.
            </p>
          </div>
        </div>

        <Button className="cursor-pointer" onClick={() => navigate(`/users/${user.id}/edit`)}>
          <Edit3 className="size-4" />
          Edit user
        </Button>
      </div>

      <Separator />

      <UserDetails user={user} />
    </section>
  );
};

export default UserDetailsPage;
