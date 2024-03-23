// Form.tsx
import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface FormData {
  [key: string]: string;
}

interface FormProps<T extends FieldValues = FieldValues> {
  formSchema: FormField[];
  onSubmit: SubmitHandler<T>;
  submitButtonText: string;
  validationSchema: ZodSchema<any>;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps<any>> = ({
  formSchema,
  onSubmit,
  submitButtonText,
  validationSchema,
  children,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 rounded-lg p-5 border border-gray-200 shadow-md bg-white"
    >
      {children}
      {formSchema.map((field) => (
        <div key={field.name}>
          <div className="mb-2 block">
            <Label
              htmlFor={field.name}
              value={field.label}
              className="text-md font-bold text-orange-500"
            />
          </div>
          <TextInput
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            shadow
            {...register(field.name)}
          />
          {errors[field.name] && (
            <span className="text-red-500">{errors[field.name]?.message}</span>
          )}
        </div>
      ))}
      <Button
        outline
        gradientDuoTone="redToYellow"
        type="submit"
        className="my-5"
      >
        {submitButtonText}
      </Button>
    </form>
  );
};

export default Form;
