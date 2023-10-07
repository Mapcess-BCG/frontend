"use client";

import * as React from "react";
import { Button, ButtonProps } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outline", size = "icon", ...props }, ref) => {
    const router = useRouter();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        {...props}
        onClick={router.back}
      >
        <ArrowLeftIcon className="h-6 w-6" />
        <span className="sr-only">Back</span>
      </Button>
    );
  },
);
BackButton.displayName = "BackButton";

export { BackButton };
