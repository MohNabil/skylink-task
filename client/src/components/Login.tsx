import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

type UserCredentials = {
  email: string;
  password: string;
};

function Login() {
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

  const onSubmit: SubmitHandler<UserCredentials> = (data: UserCredentials) =>
    console.log(data);

  const getFormErrorMessage = (name: string) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="w-1/2">
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
          <div className="mt-6">
            <Button label="Login" type="submit" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
