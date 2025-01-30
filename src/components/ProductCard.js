import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/${product.id}`}>
          <Button className="w-full">View More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
