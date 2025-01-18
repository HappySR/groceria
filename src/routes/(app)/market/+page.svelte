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
    Share2,
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
  import * as Dialog from "$lib/components/ui/dialog";
  import { qr } from "@svelte-put/qr/svg";

  let { data } = $props();

  const categories = data.categories.map((category) => {
    let icon;
    switch (category.name) {
      case "All Products":
        icon = Home;
        break;
      case "Today's Deals":
        icon = Gift;
        break;
      case "Fresh Fruits":
        icon = Apple;
        break;
      case "Vegetables":
        icon = Carrot;
        break;
      case "Dairy & Eggs":
        icon = Milk;
        break;
      case "Meat & Seafood":
        icon = Fish;
        break;
      case "Bakery":
        icon = Cake;
        break;
      case "Pantry Staples":
        icon = Package;
        break;
      default:
        icon = Package;
    }
    return {
      id: category.id,
      name: category.name,
      icon: icon,
    };
  });

  const images: {
    [key: string]: string;
  } = {
    Banana:
      "https://plus.unsplash.com/premium_photo-1664527307725-362b589c406d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Apple:
      "https://plus.unsplash.com/premium_photo-1667049292983-d2524dd0ef08?q=80&w=1749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Milk: "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Bread:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  let selectedCategory = categories.find((category) => category.name === "All Products")?.id ?? "";
  let cartCount = $state(0);
  let cartItems = $state<any[]>([]);
  let showCartDialog = $state(false);
  let showQRDialog = $state(false);
  let showLargeQR = $state(false);
  let showTransactionDialog = $state(false);

  function addToCart(item: any) {
    cartCount++;
    cartItems = [...cartItems, item];
  }

  const totalPrice = $derived(cartItems.reduce((sum, item) => +sum + +item.price, 0));
  const cartData = $derived(JSON.stringify({ items: getGroupedCartItems(), total: totalPrice }));

  function getGroupedCartItems() {
    const grouped = cartItems.reduce((acc, item) => {
      const key = item.name;
      if (!acc[key]) {
        acc[key] = { ...item, count: 1 };
      } else {
        acc[key].count += 1;
      }
      return acc;
    }, {});
    return Object.values(grouped);
  }
</script>

<div class="container mx-auto max-w-7xl p-4">
  <Dialog.Root bind:open={showCartDialog}>
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
        <Button variant="outline" size="icon" onclick={() => (showQRDialog = true)}>
          <Share2 class="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="default"
          class="flex items-center gap-2"
          onclick={() => (showCartDialog = true)}
        >
          <ShoppingCart class="h-5 w-5" />
          <span>Cart ({cartCount})</span>
        </Button>
      </div>
    </div>

    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Shopping Cart</Dialog.Title>
        <Dialog.Description>
          Your cart items ({cartCount})
        </Dialog.Description>
      </Dialog.Header>
      <ScrollArea class="h-[300px] pr-4">
        <div class="mt-4">
          {#if cartItems.length === 0}
            <p class="text-center text-muted-foreground">Your cart is empty</p>
          {:else}
            {#each getGroupedCartItems() as item}
              <div class="flex items-center justify-between py-2">
                <div class="flex items-center gap-2">
                  <img
                    src={images[item.name]}
                    alt={item.name}
                    class="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p class="font-medium">{item.name} {item.count > 1 ? `x${item.count}` : ""}</p>
                    <p class="text-sm text-muted-foreground">₹{item.price * item.count}</p>
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </ScrollArea>
      <div class="mt-4 border-t pt-4">
        <div class="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>
      <Dialog.Footer class="mt-4">
        <Button variant="outline" onclick={() => (showCartDialog = false)}>Close</Button>
        {#if cartItems.length > 0}
          <Button
            onclick={() => {
              showTransactionDialog = true;
              showCartDialog = false;
            }}>Checkout</Button
          >
        {/if}
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <Dialog.Root bind:open={showQRDialog}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Share Cart</Dialog.Title>
        <Dialog.Description>Scan this QR code to share your cart</Dialog.Description>
      </Dialog.Header>
      <div class="flex flex-col items-center justify-center p-4">
        <button
          type="button"
          class="rounded-lg p-4 transition-colors hover:bg-muted"
          onclick={() => (showLargeQR = !showLargeQR)}
        >
          <svg
            use:qr={{
              data: cartData,
              shape: "square",
            }}
            width={showLargeQR ? 300 : 150}
            height={showLargeQR ? 300 : 150}
            class="transition-all duration-300"
          />
        </button>
        <p class="mt-2 text-sm text-muted-foreground">Click QR code to resize</p>
      </div>
      <Dialog.Footer>
        <Button variant="outline" onclick={() => (showQRDialog = false)}>Close</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <Dialog.Root bind:open={showTransactionDialog}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Transaction Processing</Dialog.Title>
        <Dialog.Description>Demo transaction for ₹{totalPrice}</Dialog.Description>
      </Dialog.Header>
      <div class="p-4">
        <div class="mb-4 rounded bg-green-100 p-3 text-green-700">
          Transaction successful! Order ID: #{Math.random().toString(36).substring(2, 9)}
        </div>
        <p class="text-sm text-muted-foreground">
          Your order will be delivered within 2-3 business days.
        </p>
      </div>
      <Dialog.Footer>
        <Button
          onclick={() => {
            showTransactionDialog = false;
            cartItems = [];
            cartCount = 0;
          }}>Done</Button
        >
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <ScrollArea class="h-[calc(100vh-120px)]">
    <div class="flex-1">
      <Tabs.Root value={selectedCategory} class="mb-6 p-2">
        <Tabs.List class="inline-flex w-full gap-2 border-b">
          {#each categories as category}
            <Tabs.Trigger value={category.id} class="p-2 px-4 text-sm font-medium">
              <category.icon class="h-4 w-4 md:mr-2" />
              <span class="hidden md:inline">{category.name}</span>
            </Tabs.Trigger>
          {/each}
        </Tabs.List>
        <Tabs.Content
          value={categories.find((category) => category.name === "All Products")?.id ?? ""}
        >
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {#each data.items.res as item}
              <Card
                class="group relative overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
              >
                <span
                  class="absolute left-4 top-4 z-10 rounded-md bg-primary/90 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm"
                >
                  Fresh
                </span>
                <CardHeader class="p-6">
                  <div class="relative overflow-hidden rounded-xl">
                    <img
                      src={images[item.name]}
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
                    {#each Array(5)}
                      <Star class="h-4 w-4 text-yellow-400" fill="currentColor" />
                    {/each}
                  </CardDescription>
                </CardHeader>
                <CardContent class="px-6 pt-0">
                  <div class="flex items-baseline gap-4">
                    <p class="text-2xl font-bold tracking-tight text-primary/50">₹{item.price}</p>
                    <p class="text-sm font-medium text-muted-foreground line-through">₹110</p>
                  </div>
                  <p class="mt-3 flex items-center text-sm font-medium text-primary/90">
                    <Package class="mr-2 h-4 w-4" />
                    Prime Delivery
                  </p>
                </CardContent>
                <CardFooter class="p-6 pt-4">
                  <Button
                    size="default"
                    class="w-full bg-primary/90 transition-colors hover:bg-primary"
                    onclick={() => addToCart(item)}
                  >
                    <ShoppingCart class="mr-2.5 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            {/each}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  </ScrollArea>
</div>
