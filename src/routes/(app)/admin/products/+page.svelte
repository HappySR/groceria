<script lang="ts">
  import { page } from "$app/state";
  import { toast } from "svelte-sonner";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import Header from "$lib/components/custom/Header.svelte";
  import { Trash, Pencil, Plus, Tag } from "lucide-svelte";

  let { data } = $props();
  let categories = $state(data.categories);
  let newCategoryName = $state("");
  let newCategoryDescription = $state("");

  function isDuplicateCategory(name: string) {
    return categories.some((category) => category.name.toLowerCase() === name.toLowerCase());
  }

  function addCategory({
    name,
    description,
    properties,
  }: {
    name: string;
    description: string;
    properties: Record<string, string>;
  }) {
    if (isDuplicateCategory(name)) {
      toast.error("A category with this name already exists");
      return;
    }

    fetch("/api/category/create", {
      method: "POST",
      body: JSON.stringify({ name, description, properties }),
    })
      .then((body) => body.json())
      .then((data) => {
        toast.success("Category added successfully");
        categories = [...categories, data.res];
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add category");
      });
  }

  function deleteCategory(id: string) {
    fetch("/api/category/delete", {
      method: "POST",
      body: JSON.stringify({ ids: [id] }),
    })
      .then(() => {
        toast.success("Category deleted successfully");
        categories = categories.filter((c) => c.id !== id);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete category");
      });
  }

  function handleAddCategory() {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    addCategory({
      name: newCategoryName,
      description: newCategoryDescription,
      properties: {},
    });
    newCategoryName = "";
    newCategoryDescription = "";
  }
</script>

<Header pathname={page.url.pathname} />

<main class="grid gap-4 p-4 sm:px-6 sm:py-0">
  <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
    <Card.Root>
      <Card.Header>
        <Card.Title class="text-md">
          <Tag class="mr-2 inline h-5 w-5" />
          Category Management
        </Card.Title>
        <Card.Description>
          Manage product categories.
          <span class="text-red-500">
            Warning: Deleting a category will also delete all items within it.
          </span>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="space-y-6">
          <div class="flex items-center justify-end">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button
                  size="sm"
                  class="px-4 py-2 transition-colors duration-200 hover:bg-primary/90"
                >
                  <Plus class="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title class="text-2xl font-bold">Add New Category</Dialog.Title>
                  <Dialog.Description class="text-muted-foreground"
                    >Add a new product category</Dialog.Description
                  >
                </Dialog.Header>
                <div class="grid gap-4 py-4">
                  <Input
                    placeholder="Category Name"
                    bind:value={newCategoryName}
                    class="transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
                  />
                  <Input
                    placeholder="Category Description"
                    bind:value={newCategoryDescription}
                    class="transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
                  />
                </div>
                <Dialog.Footer>
                  <Button
                    onclick={handleAddCategory}
                    class="transition-transform duration-200 hover:scale-105"
                    ><Plus class="mr-2 h-4 w-4" />Add Category</Button
                  >
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {#each categories as category}
              <div
                class="rounded-lg border bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium text-primary">{category.name}</span>
                  <div class="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8 bg-primary/10 transition-colors duration-200"
                    >
                      <Pencil class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8 bg-destructive/10 text-destructive transition-colors duration-200 hover:text-current"
                      onclick={() => deleteCategory(category.id)}
                    >
                      <Trash class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</main>
