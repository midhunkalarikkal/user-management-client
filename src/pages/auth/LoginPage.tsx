import { useState } from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  Mail,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/mutations/auth/use-login";

const DEMO_CREDENTIALS: LoginFormValues = {
  email: "demo@gmail.com",
  password: "Demo@123",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleUseDemoCredentials = () => {
    setValue("email", DEMO_CREDENTIALS.email, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setValue("password", DEMO_CREDENTIALS.password, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await mutateAsync(values);
      navigate("/users", { replace: true });
    } catch {
      return;
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <UsersRound className="size-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>

            <p className="text-sm text-muted-foreground">Sign in to access your dashboard.</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <LockKeyhole className="size-5 text-muted-foreground" />
            </div>

            <CardTitle className="text-xl">Welcome back</CardTitle>

            <CardDescription>Enter your credentials to continue.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              noValidate
              onSubmit={(event) => {
                void handleSubmit(handleLogin)(event);
              }}
              className="space-y-5"
            >
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="username"
                        maxLength={254}
                        className="pl-10"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                      />
                    </div>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="pr-11 pl-10"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-1 size-8 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword((previous) => !previous)}
                        disabled={isPending}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </Button>
                    </div>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending || !isValid}
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="size-4" />
                    Sign in
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-4 border-t pt-5">
              <div className="flex items-center gap-2">
                <UserRoundCheck className="size-4 text-muted-foreground" />

                <p className="text-sm font-medium">Demo account</p>
              </div>

              <div className="space-y-3 rounded-lg border bg-muted/40 p-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Email</p>

                  <p className="text-sm font-medium">{DEMO_CREDENTIALS.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Password</p>

                  <p className="text-sm font-medium">{DEMO_CREDENTIALS.password}</p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={handleUseDemoCredentials}
                  disabled={isPending}
                >
                  <UserRoundCheck className="size-4" />
                  Use demo credentials
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Use the demo account to explore the application.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
