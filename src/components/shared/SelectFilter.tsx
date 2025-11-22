"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectFilterProps {
  paramName: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

const SelectFilter = ({
  options,
  paramName,
  placeholder,
}: SelectFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const currentValue = searchParams.get(paramName || "") || "All";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete(paramName || "");
    } else if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Select
      value={currentValue}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
