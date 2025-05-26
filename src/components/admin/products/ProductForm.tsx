// components/admin/products/product-form.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import ImageUpload from "../shared/ImageUpload";
import ProductSpecifications from "./ProductSpecifications";
import ProductCategories from "./ProductCategories";
import RichTextEditor from "./RichTextEditor";

// Form validation schema
const productFormSchema = z.object({
  model: z.string().min(1, "Model is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.any(), // Rich text content
  images: z.array(z.string()).min(1, "At least one image is required"),
  price: z.coerce.number().positive("Price must be positive"),
  offerPrice: z.coerce
    .number()
    .positive("Offer price must be positive")
    .optional()
    .nullable(),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative("Quantity must be non-negative"),
  specifications: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "Specification name is required"),
      value: z.string().min(1, "Specification value is required"),
      group: z.string().optional().nullable(),
    }),
  ),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function ProductForm({
  product,
  categories,
}: {
  product?: any;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form with existing data or defaults
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? {
          model: product.model,
          title: product.title,
          slug: product.slug,
          summary: product.summary,
          shortDescription: product.shortDescription,
          description: product.description,
          images: product.images,
          price: product.price / 100, // Convert cents to dollars for display
          offerPrice: product.offerPrice ? product.offerPrice / 100 : undefined,
          quantity: product.quantity,
          specifications: product.specifications,
          categories: product.categories.map((c: any) => c.categoryId),
        }
      : {
          model: "",
          title: "",
          slug: "",
          summary: "",
          shortDescription: "",
          description: {
            type: "doc",
            content: [{ type: "paragraph", content: [] }],
          },
          images: [],
          price: 0,
          offerPrice: undefined,
          quantity: 0,
          specifications: [],
          categories: [],
        },
  });

  async function onSubmit(data: ProductFormValues) {
    try {
      setIsLoading(true);

      // Convert price values to cents for storage
      const formattedData = {
        ...data,
        price: Math.round(data.price * 100),
        offerPrice: data.offerPrice ? Math.round(data.offerPrice * 100) : null,
      };

      const response = await fetch(
        `/api/admin/products${product ? `/${product.id}` : ""}`,
        {
          method: product ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success(`Product ${product ? "updated" : "created"} successfully!`);

      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-generate slug from title
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        form.setValue(
          "slug",
          value.title
            ?.toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-") || "",
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-blue-900">
            {product ? "Product bewerken" : "Nieuw product toevoegen"}
          </h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
            >
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
                <span>{product ? "Update" : "Create"} Product</span>
              )}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basis Info</TabsTrigger>
            <TabsTrigger value="content">Beschrijving & Foto's</TabsTrigger>
            <TabsTrigger value="specs">Specificaties</TabsTrigger>
            <TabsTrigger value="inventory">Prijs en voorraad</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Basis Informatie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelnummer</FormLabel>
                        <FormControl>
                          <Input placeholder="Model number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titel</FormLabel>
                        <FormControl>
                          <Input placeholder="Product title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="product-url-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        gaat automatisch aan de hand van de titel, maar kan handmatig worden aangepast.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta beschrijving</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief product summary"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Korte USP Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short product description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ProductCategories form={form} categories={categories} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Beschrijving & Foto's</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschrijving</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6" />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Foto's</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={(url: string) =>
                            field.onChange(
                              field.value.filter((image) => image !== url),
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        upload meerdere afbeeldingen voor het product. Zorg ervoor dat de afbeeldingen van hoge kwaliteit zijn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Product Specificaties</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductSpecifications form={form} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Prijs en Voorraad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Standaard prijs</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Normale prijs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="offerPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Actie prijs</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={field.value || ""}
                            onChange={(e) => {
                              const value =
                                e.target.value === ""
                                  ? undefined
                                  : parseFloat(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>Korting prijs optioneel</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voorraad</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Aantal stuks op voorraad. Vul 0 in als het product niet op voorraad is.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
