import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, LoaderCircle, Save, RotateCcw, FlaskConical } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  updateUserSchema,
  getDefaultUserValues,
  getUserFormValues,
  type UserFormValues,
} from "@/schemas/user.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { USER_FORM_SECTIONS } from "./user-form-fields";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEST_USER_DATA } from "@/utils/test-user-data";
import type { UserFormField, UserFormProps } from "@/types/components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { CREATE_ONLY_REQUIRED_FIELDS, REQUIRED_FIELDS } from "@/utils/constant";

// reusing form for creating and updating users.
const UserForm = ({ user, isSubmitting = false, onSubmit }: UserFormProps) => {
  const isEditing = Boolean(user);
  const [visiblePasswordFields, setVisiblePasswordFields] = useState<Record<string, boolean>>({});

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UserFormValues>({
    resolver: zodResolver(isEditing ? updateUserSchema : createUserSchema),
    defaultValues: getDefaultUserValues(),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleFillTestData = () => {
    reset(TEST_USER_DATA, {
      keepDefaultValues: true,
    });
  };

  const handleClearForm = () => {
    reset(getDefaultUserValues());
  };

  // Loads the existing record when editing a user.
  useEffect(() => {
    if (user) {
      reset(getUserFormValues(user));
    } else {
      reset(getDefaultUserValues());
    }
  }, [user, reset]);

  // Renders one field with its own validation error.
  const renderField = (config: UserFormField) => {
    const { name, label, type = "text", placeholder, step, visibility = true } = config;

    const isSelect = name === "gender" || name === "role";
    const isNumber = type === "number";
    const isPassword = name === "password" || type === "password";
    const isPasswordVisible = visiblePasswordFields[name] ?? false;

    // const isRequired = REQUIRED_FIELDS.has(name) || (!isEditing && CREATE_ONLY_REQUIRED_FIELDS.has(name));
    const isRequired = true;

    return (
      <Controller
        key={name}
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name} className={`${!visibility && "hidden"}`}>
              {label}
              {isRequired && <span className="ml-1 text-destructive">*</span>}
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
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
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
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            ) : (
              (() => {
                const input = (
                  <Input
                    id={name}
                    name={field.name}
                    ref={field.ref}
                    type={isPassword && isPasswordVisible ? "text" : type}
                    step={step}
                    placeholder={
                      isPassword && isEditing
                        ? "Leave blank to keep unchanged"
                        : (placeholder ?? `Enter ${label.toLowerCase()}`)
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
                        isNumber ? (value === "" ? Number.NaN : Number(value)) : value,
                      );
                    }}
                    aria-invalid={fieldState.invalid}
                    autoComplete={config.autocomplete ?? "off"}
                    disabled={isSubmitting}
                    className={`${!visibility && "hidden"} ${isPassword ? "pr-10" : ""}`}
                  />
                );

                return isPassword ? (
                  <div className="relative">
                    {input}
                    <button
                      type="button"
                      aria-label={`${isPasswordVisible ? "Hide" : "Show"} ${label.toLowerCase()}`}
                      aria-pressed={isPasswordVisible}
                      onClick={() =>
                        setVisiblePasswordFields((visibleFields) => ({
                          ...visibleFields,
                          [name]: !isPasswordVisible,
                        }))
                      }
                      disabled={isSubmitting}
                      className="absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isPasswordVisible ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  </div>
                ) : (
                  input
                );
              })()
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
      className="mx-auto max-w-full space-y-6"
    >
      {!isEditing && (
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={handleClearForm}
            disabled={isSubmitting}
          >
            <RotateCcw className="size-4" />
            Clear form
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer"
            onClick={handleFillTestData}
            disabled={isSubmitting}
          >
            <FlaskConical className="size-4" />
            Fill test data
          </Button>
        </div>
      )}
      {USER_FORM_SECTIONS.map((section, index) => (
        <Card key={section.title} className="overflow-hidden">
          <CardHeader className="border-b">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="space-y-1">
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
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
        <p className="text-xs text-muted-foreground text-red-500">Fields marked * are required.</p>

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
            disabled={isSubmitting || (isEditing && !isDirty)}
          >
            {isSubmitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}

            {isSubmitting ? "Saving user..." : isEditing ? "Save changes" : "Create user"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
