<script lang="ts">
    import {
      Package2,
      House,
      ShoppingCart,
      Package,
      UsersRound,
      ChartSpline,
      Settings,
      LogOut,
    } from "lucide-svelte";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { Toaster } from "$lib/components/ui/sonner";
  
    let { children } = $props();
  </script>
  
  <svelte:head>
    <title>Admin | groceria.</title>
  </svelte:head>
  
  <Toaster />
  
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a
          href="##"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">groceria.</span>
        </a>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/admin"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <House class="h-5 w-5" />
                <span class="sr-only">Dashboard</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Dashboard</Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/admin/orders"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart class="h-5 w-5" />
                <span class="sr-only">Orders</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Orders</Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/admin/products"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Package class="h-5 w-5" />
                <span class="sr-only">Products</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Products</Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/admin/customers"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <UsersRound class="h-5 w-5" />
                <span class="sr-only">Customers</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Customers</Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/admin/analytics"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ChartSpline class="h-5 w-5" />
                <span class="sr-only">Analytics</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Analytics</Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/admin/settings"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings class="h-5 w-5" />
                <span class="sr-only">Settings</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Settings</Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <a
                href="/sign-out"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LogOut class="h-5 w-5" />
                <span class="sr-only">Sign Out</span>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Sign Out</Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      {@render children()}
    </div>
  </div>
  