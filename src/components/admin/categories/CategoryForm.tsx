// app/admin/categories/category-form-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/shared/ImageUpload";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  cover: z.string().optional(),
  specs: z.array(z.string()),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: any) => void;
  category?: any;
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category,
}: CategoryFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newSpec, setNewSpec] = useState("");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      cover: category?.cover || "",
      specs: category?.specs || [],
    },
  });

  // Update form values when editing category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        cover: category.cover || "",
        specs: category.specs || [],
      });
    }
  }, [category, form]);

  const addSpec = () => {
    if (newSpec.trim()) {
      const currentSpecs = form.getValues("specs") || [];
      form.setValue("specs", [...currentSpecs, newSpec.trim()]);
      setNewSpec("");
    }
  };

  const removeSpec = (index: number) => {
    const currentSpecs = form.getValues("specs") || [];
    form.setValue(
      "specs",
      currentSpecs.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);

      const apiUrl = category
        ? `/api/admin/categories/${category.id}`
        : "/api/admin/categories";

      const response = await fetch(apiUrl, {
        method: category ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const savedCategory = await response.json();
      onSave(savedCategory);
    } catch (error: any) {
      toast.error(
        error.message || "Failed to save category. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image (Optional)</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(urls) => field.onChange(urls[0] || "")}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Specifications</FormLabel>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a specification"
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSpec();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addSpec}
                  disabled={!newSpec.trim()}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {form.watch("specs").length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No specifications added yet
                  </p>
                ) : (
                  form.watch("specs").map((spec, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {spec}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpec(index)}
                        className="text-muted-foreground hover:text-destructive ml-1 h-4 w-4 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <span>{category ? "Update" : "Create"} Category</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
