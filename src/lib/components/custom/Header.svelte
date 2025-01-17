<script lang="ts">
  import PhoneMenu from "./PhoneMenu.svelte";
  import PathBreadcrumb from "./PathBreadcrumb.svelte";

  let { pathname }: { pathname: string } = $props();
</script>

<header
  class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
>
  <PhoneMenu />
  <PathBreadcrumb {pathname} />
</header>
