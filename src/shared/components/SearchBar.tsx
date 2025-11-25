"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/Input";

interface SearchBarProps {
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ onChange, className }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (v: string) => {
    setValue(v);
    onChange(v);
  };

  return (
    <Input
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className={className}
      placeholder="Tìm kiếm..."
    />
  );
}
