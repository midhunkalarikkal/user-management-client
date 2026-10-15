import { useEffect } from "react";
import { Link } from "react-router";
import { LoaderCircle, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createUserSchema,
    editUserSchema,
    getDefaultUserValues,
    getUserFormValues,
    type UserFormValues,
} from "@/schemas/user.schema";
import {
    USER_FORM_SECTIONS,
} from "./user-form-fields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { REQUIRED_FIELDS } from "@/utils/constant";
import type { UserFormField, UserFormProps } from "@/types/components";

// reusing form for creating and updating users.
export default function UserForm({
    user,
    isSubmitting = false,
    onSubmit,
}: UserFormProps) {

    const isEditing = Boolean(user);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<UserFormValues>({
        resolver: zodResolver(
            isEditing ? editUserSchema : createUserSchema,
        ),
        defaultValues: getDefaultUserValues(),
        mode: "onChange",
        reValidateMode: "onChange",
    });


    // Loads the existing record when editing a user.
    useEffect(() => {
        reset(user ? getUserFormValues(user) : getDefaultUserValues());
    }, [user, reset]);

    // Renders one field with its own validation error.
    const renderField = (config: UserFormField) => {
        const { name, label, type = "text", placeholder, step } = config;

        const isSelect = name === "gender" || name === "role";
        const isNumber = type === "number";
        const isPassword = name === "password";

        const isRequired =
            REQUIRED_FIELDS.has(name) ||
            (isPassword && !isEditing);

        return (
            <Controller
                key={name}
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={name}>
                            {label}
                            {isRequired && (
                                <span className="ml-1 text-destructive">*</span>
                            )}
                        </FieldLabel>

                        {isSelect ? (
                            <Select
                                name={field.name}
                                value={String(field.value ?? "")}
                                onValueChange={(value) => {
                                    if (value !== null) {
                                        field.onChange(value);
                                    }
                                }}
                            >
                                <SelectTrigger
                                    id={name}
                                    onBlur={field.onBlur}
                                    aria-invalid={fieldState.invalid}
                                    className="w-full"
                                >
                                    <SelectValue
                                        placeholder={`Select ${label.toLowerCase()}`}
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {name === "gender" ? (
                                        <>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="moderator">
                                                Moderator
                                            </SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                id={name}
                                name={field.name}
                                ref={field.ref}
                                type={type}
                                step={step}
                                placeholder={
                                    isPassword && isEditing
                                        ? "Leave blank to keep unchanged"
                                        : placeholder ?? `Enter ${label.toLowerCase()}`
                                }
                                value={
                                    typeof field.value === "number"
                                        ? Number.isNaN(field.value)
                                            ? ""
                                            : String(field.value)
                                        : String(field.value ?? "")
                                }
                                onBlur={field.onBlur}
                                onChange={(event) => {
                                    const value = event.target.value;

                                    field.onChange(
                                        isNumber
                                            ? value === ""
                                                ? Number.NaN
                                                : Number(value)
                                            : value,
                                    );
                                }}
                                aria-invalid={fieldState.invalid}
                                autoComplete={config.autocomplete ?? "off"}
                                disabled={isSubmitting}
                            />
                        )}

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        );
    };

    return (
        <form
            noValidate
            onSubmit={(event) => {
                void handleSubmit(onSubmit)(event);
            }}
            className="mx-auto max-w-7xl space-y-6"
        >
            {USER_FORM_SECTIONS.map((section, index) => (
                <Card key={section.title} className="overflow-hidden">
                    <CardHeader className="border-b">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <div className="space-y-1">
                                <CardTitle>{section.title}</CardTitle>
                                <CardDescription>
                                    {section.description}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                            {section.fields.map(renderField)}
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-background/95 px-5 py-4 shadow-sm backdrop-blur">
                <p className="text-xs text-muted-foreground text-red-500">
                    Fields marked * are required.
                </p>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        nativeButton={false}
                        render={<Link to="/users" />}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        className="cursor-pointer"
                        disabled={
                            isSubmitting ||
                            (isEditing && !isDirty)
                        }
                    >
                        {isSubmitting ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}

                        {isSubmitting
                            ? "Saving user..."
                            : isEditing
                                ? "Save changes"
                                : "Create user"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
