// app/admin/categories/category-list.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PlusCircle, Pencil, Trash2, ImageIcon } from "lucide-react";
import CategoryFormModal from "@/components/admin/categories/CategoryForm";

export default function CategoryList({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleAddCategory = (newCategory: any) => {
    setCategories([...categories, newCategory]);
    setIsAddModalOpen(false);
    toast.success("Category added successfully");
    router.refresh();
  };

  const handleEditCategory = (updatedCategory: any) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    );
    setEditingCategory(null);
    toast.success("Category updated successfully");
    router.refresh();
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setIsDeleting(id);

      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories(categories.filter((category) => category.id !== id));

      toast.message("Category deleted", {
        description: "The category has been successfully deleted.",
      });

      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message || "Failed to delete category. Please try again.",
      );
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Categories</h1>
        <Button
          className="bg-blue-900 hover:bg-blue-800"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          No categories found. Create your first category by clicking the "Add
          Category" button.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden py-0 pb-6">
              <div className="relative h-48 w-full bg-blue-50">
                {category.cover ? (
                  <Image
                    src={category.cover}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-blue-200" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                {category.description && (
                  <CardDescription>{category.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {category.specs && category.specs.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {category.specs.map((spec: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No specifications defined
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingCategory(category)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the &quot;{category.name}
                        &quot; category. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-600"
                        disabled={isDeleting === category.id}
                      >
                        {isDeleting === category.id ? (
                          <div className="flex items-center gap-1">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                            <span>Deleting...</span>
                          </div>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      <CategoryFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCategory}
      />

      {/* Edit Category Modal */}
      {editingCategory && (
        <CategoryFormModal
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleEditCategory}
          category={editingCategory}
        />
      )}
    </div>
  );
}
