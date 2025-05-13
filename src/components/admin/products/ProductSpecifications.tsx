// components/admin/products/product-specifications.tsx
"use client";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductSpecifications({ form }: { form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const [newSpec, setNewSpec] = useState({
    name: "",
    value: "",
    group: "",
  });

  const addSpecification = () => {
    if (newSpec.name && newSpec.value) {
      append(newSpec);
      setNewSpec({ name: "", value: "", group: "" });
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Group (Optional)</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground text-center"
              >
                No specifications added yet
              </TableCell>
            </TableRow>
          )}

          {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>
                <Input
                  {...form.register(`specifications.${index}.name`)}
                  defaultValue={field.name}
                />
              </TableCell>
              <TableCell>
                <Input
                  {...form.register(`specifications.${index}.value`)}
                  defaultValue={field.value}
                />
              </TableCell>
              <TableCell>
                <Input
                  {...form.register(`specifications.${index}.group`)}
                  defaultValue={field.group || ""}
                  placeholder="Optional"
                />
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell>
              <Input
                placeholder="Add spec name"
                value={newSpec.name}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, name: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Add spec value"
                value={newSpec.value}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, value: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Optional group"
                value={newSpec.group}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, group: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <Button
                type="button"
                onClick={addSpecification}
                variant="ghost"
                size="icon"
                disabled={!newSpec.name || !newSpec.value}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
