// app/admin/products/product-list.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function ProductList({
  products,
  currentPage,
  totalPages,
  searchQuery,
}: {
  products: any[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/products?search=${encodeURIComponent(search)}&page=1`);
  };

  const handlePageChange = (page: number) => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    router.push(`/admin/products?page=${page}${searchParam}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);

      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      toast.message("Product deleted", {
        description: "The product has been successfully deleted.",
      });

      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-[300px]">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </form>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-8 text-center"
                >
                  No products found
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-10 w-10"
                      >
                        {product.images[0] ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${product.images[0]}`}
                            alt={product.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <ImageIcon className="text-muted-foreground h-4 w-4" />
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <div className="grid grid-cols-3 gap-2 pt-4">
                        {product.images.map((image: string) => (
                          <div key={image} className="relative aspect-square">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image}`}
                              alt={product.title}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>
                  {product.offerPrice ? (
                    <div>
                      <span className="font-medium text-green-600">
                        {formatPrice(product.offerPrice)}
                      </span>
                      <span className="text-muted-foreground ml-2 text-sm line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    formatPrice(product.price)
                  )}
                </TableCell>
                <TableCell>
                  {product.quantity > 0 ? (
                    <span>{product.quantity}</span>
                  ) : (
                    <span className="text-red-500">Out of stock</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((cat: any) => (
                      <span
                        key={cat.categoryId}
                        className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-900"
                      >
                        {cat.category.name}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.push(`/admin/products/${product.id}`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this product. This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 hover:bg-red-600"
                            disabled={isDeleting === product.id}
                          >
                            {isDeleting === product.id ? (
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
