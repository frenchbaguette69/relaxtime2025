// app/admin/orders/[id]/OrderDetailsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  ChevronLeft,
  Copy,
  CreditCard,
  Home,
  Printer,
  Truck,
  User,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OrderDetailsClient({ order }: { order: any }) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  // Function to update order status
  const handleUpdateStatus = async () => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.success("Order status updated successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to delete order
  const handleDeleteOrder = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      toast.success("Order deleted successfully");
      router.push("/admin/orders");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete order");
    } finally {
      setIsDeleting(false);
    }
  };

  // Status icon mapping
  const getStatusIcon = () => {
    switch (order.status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "PAID":
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case "SHIPPED":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "DELIVERED":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "CANCELLED":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  // Payment status icon mapping
  const getPaymentIcon = () => {
    switch (order.paymentStatus) {
      case "COMPLETED":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "FAILED":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 print:py-0">
      {/* Header */}
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 md:text-3xl">
            Bestelling details
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Bestelling
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hierdoor wordt alles van deze bestelling verwijderd
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleer</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteOrder}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Order"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Order ID & Date Banner */}
      <div className="mb-8 rounded-lg bg-blue-50 p-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <div className="text-sm text-blue-700">Bestel ID</div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-medium">{order.id}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(order.id)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>kopieer bestel ID</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-blue-700">Datum: </span>
              <span className="font-medium">
                {format(new Date(order.createdAt), "PPP")}
              </span>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="text-sm">
              <span className="text-blue-700">Time: </span>
              <span className="font-medium">
                {format(new Date(order.createdAt), "p")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - Order Items & Status Update */}
        <div className="lg:col-span-2">
          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-blue-900">
                Bestelde producten
              </h2>
              <div className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-900">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Prijs</TableHead>
                    <TableHead className="text-right">Aantal</TableHead>
                    <TableHead className="text-right">Totaal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item: any) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="max-w-[240px]">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {item.productTitle}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="truncate text-xs text-gray-500">
                              {item.productId}
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5"
                                    onClick={() =>
                                      copyToClipboard(item.productId)
                                    }
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Kopieer product ID</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          {item.productImage && (
                            <div className="mt-1 h-12 w-12 rounded-md bg-gray-100">
                              <img
                                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.productImage}`}
                                alt={item.productTitle}
                                className="h-full w-full rounded-md object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(item.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary */}
            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotaal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Customer & Payment Info */}
        <div className="space-y-8">
          {/* Order Status Update Card */}
          {/* Order Status Update Card - More Compact & Professional */}
          <Card className="mb-8 p-0">
            <CardContent className="p-4">
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                    {getStatusIcon()}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">
                      Bestel Status
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-600">Huidige:</span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-sm font-medium"
                        style={{
                          backgroundColor:
                            order.status === "PENDING"
                              ? "rgba(245, 158, 11, 0.1)"
                              : order.status === "PAID"
                                ? "rgba(59, 130, 246, 0.1)"
                                : order.status === "SHIPPED"
                                  ? "rgba(124, 58, 237, 0.1)"
                                  : order.status === "DELIVERED"
                                    ? "rgba(34, 197, 94, 0.1)"
                                    : order.status === "CANCELLED"
                                      ? "rgba(239, 68, 68, 0.1)"
                                      : "rgba(107, 114, 128, 0.1)",
                          color:
                            order.status === "PENDING"
                              ? "rgb(217, 119, 6)"
                              : order.status === "PAID"
                                ? "rgb(37, 99, 235)"
                                : order.status === "SHIPPED"
                                  ? "rgb(109, 40, 217)"
                                  : order.status === "DELIVERED"
                                    ? "rgb(22, 163, 74)"
                                    : order.status === "CANCELLED"
                                      ? "rgb(220, 38, 38)"
                                      : "rgb(75, 85, 99)",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">in behandeling</SelectItem>
                      <SelectItem value="PAID">betaald</SelectItem>
                      <SelectItem value="SHIPPED">verzonden</SelectItem>
                      <SelectItem value="DELIVERED">bezorgd</SelectItem>
                      <SelectItem value="CANCELLED">geannuleerd</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full bg-blue-900 hover:bg-blue-800"
                    disabled={isUpdating || status === order.status}
                    onClick={handleUpdateStatus}
                  >
                    {isUpdating ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Customer Card */}
          <Card className="p-0">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold">klant Informatie</h3>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">{order.customerEmail}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(order.customerEmail)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Kopieer Email</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card className="p-0">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <CreditCard className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold">Betaal Informatie</h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Status</p>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundColor:
                        order.paymentStatus === "COMPLETED"
                          ? "rgba(34, 197, 94, 0.1)"
                          : order.paymentStatus === "FAILED"
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgba(245, 158, 11, 0.1)",
                      color:
                        order.paymentStatus === "COMPLETED"
                          ? "rgb(22, 163, 74)"
                          : order.paymentStatus === "FAILED"
                            ? "rgb(220, 38, 38)"
                            : "rgb(217, 119, 6)",
                    }}
                  >
                    {getPaymentIcon()}
                    {order.paymentStatus}
                  </div>
                </div>
                {order.paymentIntentId && (
                  <div>
                    <p className="text-sm text-gray-500">Betaal ID</p>
                    <div className="flex items-center gap-1">
                      <p className="max-w-[180px] overflow-hidden font-mono text-sm text-ellipsis whitespace-nowrap">
                        {order.paymentIntentId}
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                copyToClipboard(order.paymentIntentId)
                              }
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Kopieer betaal ID</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          {order.shippingAddress && (
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 border-b p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Home className="h-5 w-5 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-semibold">Bezorg adres</h3>
                </div>
                <div className="space-y-1 p-4">
                  <p className="font-medium">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  {order.shippingAddress.company && (
                    <p className="text-gray-700">
                      {order.shippingAddress.company}
                    </p>
                  )}
                  <p className="text-gray-700">
                    {order.shippingAddress.address1}
                  </p>
                  {order.shippingAddress.address2 && (
                    <p className="text-gray-700">
                      {order.shippingAddress.address2}
                    </p>
                  )}
                  <p className="text-gray-700">
                    {order.shippingAddress.city}
                    {order.shippingAddress.state &&
                      `, ${order.shippingAddress.state}`}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-700">
                    {order.shippingAddress.country}
                  </p>
                  {order.shippingAddress.phone && (
                    <p className="mt-1 text-gray-700">
                      <span className="text-sm text-gray-500">Telefoonnummer: </span>
                      {order.shippingAddress.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Notes */}
          {order.notes && (
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 border-b p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <FileText className="h-5 w-5 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-semibold">Opmerking bestelling</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .container {
            max-width: 100%;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
