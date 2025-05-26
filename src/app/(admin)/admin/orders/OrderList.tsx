// app/admin/orders/OrderList.tsx
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
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Component to display order details in a dialog
const OrderDetails = ({ order }: { order: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">Customer Information</h3>
          <p className="text-sm">{order.customerName}</p>
          <p className="text-sm">{order.customerEmail}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Order Details</h3>
          <p className="text-sm">Order ID: {order.id.slice(0, 8)}...</p>
          <p className="text-sm">
            Date: {format(new Date(order.createdAt), "PPP")}
          </p>
          <p className="text-sm">Status: {order.status}</p>
          <p className="text-sm">Payment: {order.paymentStatus}</p>
        </div>
      </div>

      {order.shippingAddress && (
        <div>
          <h3 className="text-sm font-medium">Shipping Address</h3>
          <p className="text-sm">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p className="text-sm">{order.shippingAddress.address1}</p>
          {order.shippingAddress.address2 && (
            <p className="text-sm">{order.shippingAddress.address2}</p>
          )}
          <p className="text-sm">
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p className="text-sm">{order.shippingAddress.country}</p>
          {order.shippingAddress.phone && (
            <p className="text-sm">{order.shippingAddress.phone}</p>
          )}
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-medium">Order Items</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productTitle}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.price)}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between">
        <div></div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal:</span>
            <span className="text-sm">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {order.notes && (
        <div>
          <h3 className="text-sm font-medium">Notes</h3>
          <p className="text-sm">{order.notes}</p>
        </div>
      )}
    </div>
  );
};

// Status badge with appropriate color based on status
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PAID":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} font-normal`}>{status}</Badge>
  );
};

// Payment status badge
const PaymentBadge = ({ status }: { status: string }) => {
  const getPaymentColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Badge className={`${getPaymentColor(status)} font-normal`}>{status}</Badge>
  );
};

// Update order status component
const UpdateOrderStatus = ({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdateStatus = async () => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.message("Status updated", {
        description: "The order status has been successfully updated.",
      });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full bg-blue-900 hover:bg-blue-800"
        disabled={isUpdating || status === currentStatus}
        onClick={handleUpdateStatus}
      >
        {isUpdating ? (
          <div className="flex items-center gap-1">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            <span>Updating...</span>
          </div>
        ) : (
          "Update Status"
        )}
      </Button>
    </div>
  );
};

export default function OrderList({
  orders,
  currentPage,
  totalPages,
  searchQuery,
  statusFilter,
}: {
  orders: any[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  statusFilter: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);
  const [status, setStatus] = useState(statusFilter);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    const params = new URLSearchParams();
    params.set("page", "1");
    if (search) params.set("search", search);
    if (value && value !== "ALL") params.set("status", value);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);

      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      toast.message("Order deleted", {
        description: "The order has been successfully deleted.",
      });

      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete order");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <form
            onSubmit={handleSearch}
            className="relative w-full sm:w-[300px]"
          >
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Zoeken op order ID, klantnaam of e-mailadres"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </form>

          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Alles</SelectItem>
              <SelectItem value="PENDING">In behandeling</SelectItem>
              <SelectItem value="PAID">Betaald</SelectItem>
              <SelectItem value="SHIPPED">Verzonden</SelectItem>
              <SelectItem value="DELIVERED">Bezorgd</SelectItem>
              <SelectItem value="CANCELLED">Geannuleerd</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
            Pagina {currentPage} van {totalPages || 1}
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
              <TableHead>Bestelnummer</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Klant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Betaling</TableHead>
              <TableHead>Totaal</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-8 text-center"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id.slice(0, 8)}...</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.customerName}</span>
                    <span className="text-muted-foreground text-xs">
                      {order.customerEmail}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <PaymentBadge status={order.paymentStatus} />
                </TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View details"
                      onClick={() => router.push(`/admin/orders/${order.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Update status"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Order Status</DialogTitle>
                        </DialogHeader>
                        <UpdateOrderStatus
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Delete order"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this order. This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(order.id)}
                            className="bg-red-500 hover:bg-red-600"
                            disabled={isDeleting === order.id}
                          >
                            {isDeleting === order.id ? (
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
