import { UserPlus, UsersRound, type LucideIcon } from "lucide-react";

export const navigationItems: {
    title: string;
    url: string;
    icon: LucideIcon
}[] = [
        {
            title: "Users",
            url: "/users",
            icon: UsersRound,
        },
        {
            title: "Add User",
            url: "/users/new",
            icon: UserPlus,
        },
    ];