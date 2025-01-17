<script lang="ts">
  import {
    ShoppingCart,
    Heart,
    Star,
    Search,
    Home,
    Gift,
    Apple,
    Carrot,
    Milk,
    Fish,
    Cake,
    Package,
  } from "lucide-svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";

  const categories = [
    { id: "all", name: "All Products", icon: Home },
    { id: "deals", name: "Today's Deals", icon: Gift },
    { id: "fruits", name: "Fresh Fruits", icon: Apple },
    { id: "vegetables", name: "Vegetables", icon: Carrot },
    { id: "dairy", name: "Dairy & Eggs", icon: Milk },
    { id: "meat", name: "Meat & Seafood", icon: Fish },
    { id: "bakery", name: "Bakery", icon: Cake },
    { id: "pantry", name: "Pantry Staples", icon: Package },
  ];

  const groceryItems = [
    {
      id: 1,
      name: "Organic Fresh Bananas",
      price: 2.99,
      originalPrice: 3.99,
      category: "Fruits",
      rating: 4.5,
      reviews: 128,
      image:
        "https://plus.unsplash.com/premium_photo-1664527307725-362b589c406d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badge: "SALE",
      primeDelivery: true,
    },
    {
      id: 2,
      name: "Grass-Fed Organic Milk",
      price: 4.99,
      category: "Dairy",
      rating: 4.8,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      primeDelivery: true,
    },
    {
      id: 3,
      name: "Artisan Whole Grain Bread",
      price: 3.49,
      category: "Bakery",
      rating: 4.3,
      reviews: 89,
      image:
        "https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badge: "FRESH",
      primeDelivery: true,
    },
  ];

  let selectedCategory = "all";
  let cartCount = 0;
</script>

<div class="container mx-auto max-w-7xl p-4">
  <div
    class="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
  >
    <div class="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-12 md:space-y-0">
      <h1 class="text-3xl font-bold text-primary md:text-5xl">groceria.</h1>
      <div class="relative w-full md:w-[400px]">
        <Input type="text" placeholder="Search products..." class="pl-10" />
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
    <div class="flex items-center justify-end space-x-4">
      <Button variant="ghost" size="icon" class="relative">
        <Heart class="h-5 w-5" />
        <span
          class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
          >0</span
        >
      </Button>
      <Button variant="outline" size="default" class="flex items-center gap-2">
        <ShoppingCart class="h-5 w-5" />
        <span>Cart ({cartCount})</span>
      </Button>
    </div>
  </div>

  <ScrollArea class="h-[calc(100vh-120px)]">
    <div class="flex-1">
      <Tabs.Root value={selectedCategory} class="mb-6 p-2">
        <Tabs.List class="inline-flex w-full gap-2 border-b">
          {#each categories as category}
            <Tabs.Trigger value={category.id} class="p-2 px-4 text-sm font-medium">
              <svelte:component this={category.icon} class="h-4 w-4 md:mr-2" />
              <span class="hidden md:inline">{category.name}</span>
            </Tabs.Trigger>
          {/each}
        </Tabs.List>
      </Tabs.Root>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each groceryItems as item}
          <Card
            class="group relative overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            {#if item.badge}
              <span
                class="absolute left-4 top-4 z-10 rounded-md bg-primary/90 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm"
              >
                {item.badge}
              </span>
            {/if}
            <CardHeader class="p-6">
              <div class="relative overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  class="h-56 w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  class="absolute right-3 top-3 bg-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white group-hover:opacity-100"
                >
                  <Heart class="h-4 w-4" />
                </Button>
              </div>
              <CardTitle class="mt-6 line-clamp-1 text-xl font-semibold tracking-tight"
                >{item.name}</CardTitle
              >
              <CardDescription class="mt-3 flex items-center space-x-1">
                {#each Array(5) as _, i}
                  <Star
                    class="h-4 w-4 text-yellow-400"
                    fill={i < Math.floor(item.rating) ? "currentColor" : "none"}
                  />
                {/each}
                <span class="ml-2 text-sm font-medium text-muted-foreground">({item.reviews})</span>
              </CardDescription>
            </CardHeader>
            <CardContent class="px-6 pt-0">
              <div class="flex items-baseline gap-4">
                <p class="text-2xl font-bold tracking-tight text-primary/50">${item.price}</p>
                {#if item.originalPrice}
                  <p class="text-sm font-medium text-muted-foreground line-through">
                    ${item.originalPrice}
                  </p>
                {/if}
              </div>
              {#if item.primeDelivery}
                <p class="mt-3 flex items-center text-sm font-medium text-primary/90">
                  <Package class="mr-2 h-4 w-4" />
                  Prime Delivery
                </p>
              {/if}
            </CardContent>
            <CardFooter class="p-6 pt-4">
              <Button
                size="default"
                class="w-full bg-primary/90 transition-colors hover:bg-primary"
                onclick={() => cartCount++}
              >
                <ShoppingCart class="mr-2.5 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        {/each}
      </div>
    </div>
  </ScrollArea>
</div>
