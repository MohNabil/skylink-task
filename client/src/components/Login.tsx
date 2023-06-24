import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "react-query";
import { UserCredentials } from "../types/user";
import { loginUserFn } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "must be a vaild email format" }),
  password: z
    .string()
    .min(8, {
      message:
        "must be at least 8 characters and contain one uppercase letter and one special character",
    })
    .regex(/^(?=.*[A-Z])(?=.*[^a-zA-Z]).+$/),
});

function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const from = useLocation()?.state?.from?.pathname || "/";
  const [error, setError] = useState("");
  const { mutate, isLoading } = useMutation({
    mutationFn: (values: UserCredentials) => loginUserFn(values),
    onSuccess: (data: string) => {
      setToken(data);
      localStorage.setItem("token", data);
      navigate(from, { replace: true });
    },
    onError: (error: any) => {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 2000);
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<UserCredentials> = (
    userData: UserCredentials
  ) => {
    mutate(userData);
  };

  const getFormErrorMessage = (name: string) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="w-1/2">
      {isLoading && <div>Loading...</div>}
      <Card title="Login">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col"
        >
          <div className="mt-6 w-1/2">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col">
                  <label htmlFor={field.name}>Email</label>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {getFormErrorMessage(field.name)}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col mt-6">
                  <label htmlFor={field.name}>Password</label>
                  <Password
                    id={field.name}
                    {...field}
                    inputRef={field.ref}
                    className={classNames({ "p-invalid": fieldState.error })}
                    feedback={false}
                    inputClassName="w-full"
                  />
                  {getFormErrorMessage(field.name)}
                </div>
              )}
            />
          </div>
          {error && (
            <div className="flex justify-center text-red-400">{error}</div>
          )}
          <div className="mt-6">
            {isLoading ? (
              <ProgressSpinner style={{ width: "50px", height: "50px" }} />
            ) : (
              <Button label="Login" type="submit" />
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
