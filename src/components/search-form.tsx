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
import { cn } from "@/lib/utils";

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );
}

const formSchema = z.object({
  origin: z
    .string()
    .min(2, {
      message: "Origin must be at least 2 characters long",
    })
    .optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters long",
  }),
});

const Search = ({
  location,
  origin,
  backButton,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  location?: string;
  backButton?: true;
  origin?: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: location ?? "",
      origin: origin ?? "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    if (values.origin) {
      router.push(
        `/search?origin=${values.origin}&location=${values.location}`,
      );
    } else {
      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      router.push(
        `/search?origin=${latitude},${longitude}&location=${values.location}`,
      );
    }
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
              <ArrowLeftIcon className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Where to" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Current location"
                      disabled={
                        !form.formState.touchedFields.location && !location
                      }
                      className={cn(
                        !form.formState.touchedFields.location &&
                          !location &&
                          "sr-only",
                      )}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={!form.formState.isValid}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { Search };
