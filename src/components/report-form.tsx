"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { MountainIcon, StarIcon, TriangleRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, {
      message: "Rating must be at least 1",
    })
    .max(5, {
      message: "Rating must be at most 5",
    }),
  obstacle: z.boolean().optional(),
  incline: z.boolean().optional(),
});

const FeedbackForm = ({ ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const router = useRouter();

  // const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    toast({
      title: "Feedback submitted",
    });

    router.push("/");
  };

  return (
    <Form {...form} {...props}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container flex w-full flex-1 flex-col gap-4"
        method="POST"
        action="/search"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <fieldset className="flex w-full flex-col gap-4">
              <legend className="text-lg">Rating</legend>
              <div className="flex w-full justify-between gap-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <FormItem key={i}>
                    <FormLabel>
                      {field.value >= i + 1 ? (
                        <StarFilledIcon className="h-8 w-8" />
                      ) : (
                        <StarIcon className="h-8 w-8" />
                      )}
                      <span className="sr-only">{i} stars</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="radio"
                        className="sr-only"
                        {...field}
                        value={i + 1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ))}
              </div>
              <FormDescription>
                Rate the accessibility of the route
              </FormDescription>
            </fieldset>
          )}
        />
        <Separator />
        <h3>Did you have any issues during the trip?</h3>
        <FormField
          control={form.control}
          name="obstacle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* @ts-ignore */}
                <Input type="checkbox" className="sr-only" {...field} />
              </FormControl>
              <FormLabel
                className={cn(
                  "flex justify-between rounded border p-2 text-lg",
                  field.value && "border-foreground",
                )}
              >
                <span>Obstacle</span>
                <MountainIcon className="h-6 w-6" />
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incline"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* @ts-ignore */}
                <Input type="checkbox" className="sr-only" {...field} />
              </FormControl>
              <FormLabel
                className={cn(
                  "flex justify-between rounded border p-2 text-lg",
                  field.value && "border-foreground",
                )}
              >
                <span>Incline</span>
                <TriangleRightIcon className="h-6 w-6" />
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
};

export { FeedbackForm };
