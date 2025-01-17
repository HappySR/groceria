<script>
  import {
    Package2,
    House,
    ShoppingCart,
    Package,
    UsersRound,
    ChartSpline,
    Settings,
    PanelLeft,
    LogOut,
  } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
</script>

<Sheet.Root>
  <Sheet.Trigger>
    <Button size="icon" variant="outline" class="sm:hidden">
      <PanelLeft class="h-5 w-5" />
      <span class="sr-only">Toggle Menu</span>
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="left" class="sm:max-w-xs">
    <nav class="grid gap-6 text-lg font-medium">
      <a
        href="##"
        class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
        <span class="sr-only">groceria.</span>
      </a>
      <a
        href="/admin"
        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <House class="h-5 w-5" />
        Dashboard
      </a>
      <a href="/admin/orders" class="flex items-center gap-4 px-2.5 hover:text-foreground">
        <ShoppingCart class="h-5 w-5" />
        Orders
      </a>
      <a
        href="/admin/products"
        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <Package class="h-5 w-5" />
        Products
      </a>
      <a
        href="/admin/customers"
        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <UsersRound class="h-5 w-5" />
        Customers
      </a>
      <a
        href="/admin/analytics"
        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <ChartSpline class="h-5 w-5" />
        Analytics
      </a>
      <a
        href="/admin/settings"
        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <Settings class="h-5 w-5" />
        Settings
      </a>
      <a
        href="/sign-out"
        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <LogOut class="h-5 w-5" />
        Sign Out
      </a>
    </nav>
  </Sheet.Content>
</Sheet.Root>
