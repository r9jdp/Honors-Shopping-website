"use client";
import ProductListing from "@/components/products";
import axios from "axios";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCategories, setProductCategories] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        productCategories?`https://dummyjson.com/products/category/${productCategories}`:"https://dummyjson.com/products"
      );
      const data = await response.data;
      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, [productCategories]);
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "13rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar productCategories={productCategories} setProductCategories={setProductCategories} />
      <main>
        <SidebarTrigger />
        <div className="px-5 ">
          <ProductListing loading={loading} products={products} />
        </div>
      </main>
    </SidebarProvider>
  );
}
