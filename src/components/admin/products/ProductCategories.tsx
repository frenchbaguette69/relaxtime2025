// components/admin/products/product-categories.tsx
"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ProductCategories({
  form,
  categories,
}: {
  form: any;
  categories: { id: string; name: string }[];
}) {
  const selectedCategories = form.watch("categories");

  const toggleCategory = (categoryId: string) => {
    const current = form.getValues("categories");
    const updated = current.includes(categoryId)
      ? current.filter((id: string) => id !== categoryId)
      : [...current, categoryId];

    form.setValue("categories", updated, { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categories</FormLabel>
          <div className="flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {selectedCategories.length > 0
                    ? `${selectedCategories.length} categories selected`
                    : "Select categories"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.id}
                        onSelect={() => toggleCategory(category.id)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCategories.includes(category.id)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="mt-2 flex flex-wrap gap-2">
              {selectedCategories.map((categoryId: string) => {
                const category = categories.find((c) => c.id === categoryId);
                if (!category) return null;

                return (
                  <Badge key={categoryId} className="bg-blue-900">
                    {category.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-2 h-4 w-4 p-0 text-white"
                      onClick={() => toggleCategory(categoryId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
