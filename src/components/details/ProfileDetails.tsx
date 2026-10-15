import { Badge } from "../ui/badge";
import type { User } from "@/types/user";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Fingerprint, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

const UserProfile = ({ user }: { user: Omit<User, "password"> }) => {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <div className="h-24 border-b bg-gradient-to-r from-muted via-muted/70 to-background sm:h-28" />

      <CardContent className="relative px-5 pb-6 sm:px-7">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
          <Avatar className="size-20 border-4 border-background bg-muted shadow-sm sm:size-24">
            <AvatarImage
              src={user.image || undefined}
              alt={`${user.firstName} ${user.lastName}`}
              className="object-cover"
            />
            <AvatarFallback className="text-xl font-semibold">{initials}</AvatarFallback>
          </Avatar>

          <Badge variant="secondary" className="w-fit capitalize">
            <ShieldCheck className="size-3.5" />
            {user.role}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">@{user.username}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Fingerprint className="size-4" />
              User ID: {user.id}
            </span>

            <span className="flex items-center gap-2 break-all">
              <Mail className="size-4 shrink-0" />
              {user.email}
            </span>

            {user.phone && (
              <span className="flex items-center gap-2">
                <Phone className="size-4" />
                {user.phone}
              </span>
            )}

            {user.address?.city && (
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                {user.address.city}
                {user.address.country ? `, ${user.address.country}` : ""}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
