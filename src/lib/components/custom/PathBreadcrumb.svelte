<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import { Link } from "lucide-svelte";

  let { pathname }: { pathname: string } = $props();
  const pathParts = pathname.trim().split("/");
</script>

<Breadcrumb.Root class="hidden md:flex">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link class={pathname === "/" ? "text-primary hover:text-primary/60" : ""}>
        <Link class="h-4 w-4" />
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    {#each pathParts.filter(Boolean) as segment, i}
      <Breadcrumb.Item>
        {@const currentPath = pathParts.slice(0, i + 2).join("/")}
        {@const name = segment.charAt(0).toUpperCase() + segment.slice(1)}
        <Breadcrumb.Link
          href={currentPath}
          class={currentPath === pathname ? "text-primary hover:text-primary/60" : ""}
        >
          {name === "Admin" ? "Admin Dashboard" : name}
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      {#if i < pathParts.filter(Boolean).length - 1}
        <Breadcrumb.Separator />
      {/if}
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
