<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Card, CardContent, CardFooter, CardTitle } from "$lib/components/ui/card";
  import { Search } from "lucide-svelte";

  let vendorName = "";
  let vendorAge = 18;
  let selectedCategories: string[] = [];
  let acknowledge = false;
  let isSubmitted = false;
  let products: { id: number; name: string; category: string; price: number }[] = [];
  let productName = "";
  let productCategory = "";
  let productPrice = 0;
  let productNameError = "";
  let productCategoryError = "";
  let productPriceError = "";

  const categories = [
    "All Products",
    "Fresh Fruits",
    "Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Bakery",
    "Pantry Staples",
  ];

  // Function to handle the "All Products" checkbox behavior
  const handleCategoryChange = (category: string) => {
    // If the category is "All Products", handle its logic
    if (category === "All Products") {
      if (selectedCategories.includes("All Products")) {
        // Deselect all categories when "All Products" is unchecked
        selectedCategories = [];
      } else {
        // Select all categories except "All Products"
        selectedCategories = [...categories.slice(1)];
      }
    } else {
      // Handle individual category selection or deselection
      if (selectedCategories.includes(category)) {
        selectedCategories = selectedCategories.filter((item) => item !== category);
      } else {
        selectedCategories = [...selectedCategories, category];
      }

      // Automatically deselect "All Products" if not all categories are selected
      if (selectedCategories.length < categories.length) {
        selectedCategories = selectedCategories.filter((item) => item !== "All Products");
      }
    }

    // Automatically select "All Products" if all categories are selected
    if (selectedCategories.length === categories.length - 1) {
      if (!selectedCategories.includes("All Products")) {
        selectedCategories = ["All Products", ...selectedCategories];
      }
    }
  };

  const submitForm = () => {
    isSubmitted = true;
  };

  const validateProductForm = (): boolean => {
    productNameError = productName.trim() === "" ? "Product name is required." : "";
    productCategoryError = productCategory === "" ? "Category is required." : "";
    productPriceError = productPrice <= 0 ? "Price must be a positive number." : "";

    return !productNameError && !productCategoryError && !productPriceError;
  };

  const addProduct = () => {
    if (validateProductForm()) {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        category: productCategory,
        price: productPrice,
      };

      products = [...products, newProduct];

      // Reset the form fields after adding the product
      productName = "";
      productCategory = "";
      productPrice = 0;
    }
  };
</script>

<div class="container mx-auto max-w-7xl p-4">
  <div
    class="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
  >
    <div class="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-12 md:space-y-0">
      <h1 class="fixed top-0 mt-4 text-3xl font-bold text-primary md:text-5xl bg-white z-10">
        groceria.
      </h1>      
    </div>
  </div>
</div>

<ScrollArea class="h-[calc(100vh-4rem)] overflow-auto py-8">
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
    <div class="rounded-lg bg-white p-8 shadow-lg">
      {#if !isSubmitted}
        <form on:submit|preventDefault={submitForm} class="space-y-6">
          <!-- Vendor Name -->
          <div>
            <label for="vendorName" class="block text-lg font-medium text-gray-700"
              >Vendor Name</label
            >
            <Input
              id="vendorName"
              placeholder="Enter Vendor Name"
              bind:value={vendorName}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <!-- Vendor Age -->
          <div>
            <label for="vendorAge" class="block text-lg font-medium text-gray-700">Vendor Age</label
            >
            <Input
              id="vendorAge"
              type="number"
              bind:value={vendorAge}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              min="18"
              required
            />
            {#if vendorAge < 18}
              <span class="mt-1 text-sm text-red-500">You must be 18 or older to proceed.</span>
            {/if}
          </div>

          <!-- Select Categories (Using Checkboxes) -->
          <div>
            <label for="categories" class="block text-lg font-medium text-gray-700"
              >Select Categories</label
            >
            <div class="space-y-2">
              {#each categories as category}
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    class="h-5 w-5 rounded border-gray-300 text-green-600"
                    on:change={() => handleCategoryChange(category)}
                  />
                  <label for={category} class="ml-2 text-sm text-gray-600">{category}</label>
                </div>
              {/each}
            </div>
            {#if selectedCategories.length < 1}
              <span class="mt-1 text-sm text-red-500">You must select at least one category.</span>
            {/if}
          </div>

          <!-- Acknowledge Checkbox -->
          <div>
            <label for="acknowledge" class="block text-lg font-medium text-gray-700"
              >Acknowledge</label
            >
            <div class="flex items-center">
              <input
                id="acknowledge"
                type="checkbox"
                bind:checked={acknowledge}
                class="form-checkbox h-5 w-5 rounded border-gray-300 text-green-600"
              />
              <label for="acknowledge" class="ml-2 text-sm text-gray-600"
                >I acknowledge that all details provided are true to the best of my knowledge.</label
              >
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition duration-300 hover:bg-green-700"
            disabled={!vendorName ||
              vendorAge < 18 ||
              selectedCategories.length < 1 ||
              !acknowledge}
          >
            Submit
          </Button>
        </form>
      {/if}

      <!-- Add Product Section: Visible after form submission -->
      {#if isSubmitted}
        <div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-lg bg-white p-8 shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-800">Add New Product</h2>
            <Card class="mt-6 shadow-md">
              <CardTitle>Add Product Details</CardTitle>
              <CardContent>
                <div class="space-y-4">
                  <div>
                    <label for="productName" class="block text-sm font-medium text-gray-700"
                      >Product Name</label
                    >
                    <Input
                      id="productName"
                      bind:value={productName}
                      class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter Product Name"
                    />
                    {#if productNameError}
                      <span class="mt-1 text-sm text-red-500">{productNameError}</span>
                    {/if}
                  </div>
                  <div>
                    <label for="productCategory" class="block text-sm font-medium text-gray-700"
                      >Category</label
                    >
                    <select
                      id="productCategory"
                      bind:value={productCategory}
                      class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {#each selectedCategories.filter((category) => category !== "All Products") as category}
                        <option value={category}>{category}</option>
                      {/each}
                    </select>

                    {#if productCategoryError}
                      <span class="mt-1 text-sm text-red-500">{productCategoryError}</span>
                    {/if}
                  </div>
                  <div>
                    <label for="productPrice" class="block text-sm font-medium text-gray-700"
                      >Price</label
                    >
                    <Input
                      id="productPrice"
                      type="number"
                      bind:value={productPrice}
                      class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter Price"
                    />
                    {#if productPriceError}
                      <span class="mt-1 text-sm text-red-500">{productPriceError}</span>
                    {/if}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  class="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition duration-300 hover:bg-green-700"
                  onclick={addProduct}
                >
                  Add Product
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <!-- Display Added Products -->
        <div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
          <h3 class="text-xl font-semibold text-gray-800">Added Products</h3>
          <ul class="mt-4 space-y-4">
            {#each products as product, i}
              <li class="border-b pb-4">
                <div class="font-semibold">{product.name}</div>
                <div class="text-sm text-gray-600">Category: {product.category}</div>
                <div class="text-sm text-gray-600">Price: ₹{product.price}</div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
</ScrollArea>
