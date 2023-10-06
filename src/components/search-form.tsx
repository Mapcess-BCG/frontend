"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Location must be at least 2 characters long",
  }),
});

const Search = ({
  location,
  backButton,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  location?: string;
  backButton?: true;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: location ?? "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    router.push(`/search?location=${values.location}`);
  };

  return (
    <div {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex items-start gap-2"
          method="POST"
          action="/search"
        >
          {backButton && (
            <Button variant="outline" size="icon" onClick={router.back}>
              <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Dusseldorf" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={!form.formState.isValid}
          >
            <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { Search };
