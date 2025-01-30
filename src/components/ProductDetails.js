"use client";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Package,
  TruckIcon,
  RotateCcw,
  ArrowLeft 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


function StarRating({ rating }) {
  // Accept rating as a prop
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(2)}</span>
    </div>
  );
}

export default function ProductPage({ id }) {
  console.log(id);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const data = await response.data;
      setProduct(data);
    };
    fetchProduct();
  }, []);
  console.log(product);
  if (!product) return <div>Loading...</div>;
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <>
      <div>
        <Link href="/">
        <div className="flex items-center text-gray-600 mt-4 ml-8 gap-1 font-bold text-xl">
        <ArrowLeft/> Home
        </div>
        </Link>
      </div>
      <div className="container mx-auto px-8 mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square relative mb-4">
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating} />
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge className="ml-2" variant="destructive">
                    {product.discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            <div className="flex items-center mb-4">
              <Badge variant={product.stock > 10 ? "secondary" : "destructive"}>
                {product.availabilityStatus}
              </Badge>
              <span className="ml-2 text-sm text-gray-600">
                {product.stock} {product.stock === 1 ? "item" : "items"} left
              </span>
            </div>
            <div className="flex gap-4 mb-6">
              <Button className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                <span className="text-sm">SKU: {product.sku}</span>
              </div>
              <div className="flex items-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">{product.shippingInformation}</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                <span className="text-sm">{product.returnPolicy}</span>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <Tabs defaultValue="details" className="w-full px-8 mb-6">
          <TabsList>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="font-semibold">Brand</dt>
                    <dd>{product.brand}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Category</dt>
                    <dd>{product.category}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Weight</dt>
                    <dd>{product.weight} g</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Dimensions</dt>
                    <dd>
                      {product.dimensions.width} x {product.dimensions.height} x{" "}
                      {product.dimensions.depth} cm
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Warranty</dt>
                    <dd>{product.warrantyInformation}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Minimum Order Quantity</dt>
                    <dd>{product.minimumOrderQuantity}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="mb-4 pb-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-500">
                      By {review.reviewerName}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
