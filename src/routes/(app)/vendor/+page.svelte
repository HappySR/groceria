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
  let dropdownOpen = false;

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

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  const submitForm = (event: SubmitEvent) => {
    isSubmitted = true;
    // Prevent the default form submission behavior
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", { vendorName, vendorAge, selectedCategories, acknowledge });
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

<div class="container mx-auto max-w-7xl px-4 py-4">
  <!-- Header -->
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-3xl font-bold text-primary md:text-5xl">groceria.</h1>
  </div>
</div>

<!-- Main Content -->
<ScrollArea class="h-[calc(100vh-4rem)] overflow-hidden py-8">
  <div class="mx-auto max-w-7xl">
    <div class="rounded-lg bg-white p-8 shadow-lg">
      <!-- Vendor Form -->
      {#if !isSubmitted}
        <form onsubmit={submitForm} class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Vendor Name -->
          <div>
            <label for="vendorName" class="block text-lg font-medium text-gray-700">
              Vendor Name
            </label>
            <Input
              id="vendorName"
              placeholder="Enter Vendor Name"
              bind:value={vendorName}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <!-- Vendor Age -->
          <div>
            <label for="vendorAge" class="block text-lg font-medium text-gray-700">
              Vendor Age
            </label>
            <Input
              id="vendorAge"
              type="number"
              bind:value={vendorAge}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              min="18"
              required
            />
            {#if vendorAge < 18}
              <span class="text-sm text-red-500">You must be 18 or older to proceed.</span>
            {/if}
          </div>

          <!-- Select Categories -->
          <div class="col-span-2">
            <label for="categories" class="block text-lg font-medium text-gray-700">
              Select Categories
            </label>
            <div class="relative mt-4 w-full md:w-1/2">
              <!-- Dropdown Trigger -->
              <div
                class="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm focus-within:ring-2 focus-within:ring-green-500"
                onclick={toggleDropdown}
                role="button"
                aria-pressed={dropdownOpen ? "true" : "false"}
                tabindex="0"
                onkeydown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    toggleDropdown();
                  }
                }}
              >
                <div class="flex items-center justify-between">
                  <div>
                    {#if selectedCategories.length > 0}
                      {selectedCategories
                        .filter((category) => category !== "All Products")
                        .join(", ")}
                    {:else}
                      Select Categories...
                    {/if}
                  </div>
                  <!-- Down Arrow (Toggle Icon) -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transition-transform duration-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class:rotate-180={dropdownOpen}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <!-- Dropdown Menu -->
              {#if dropdownOpen}
                <div
                  class="absolute left-0 z-50 mt-2 max-h-56 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg"
                >
                  <div class="grid grid-cols-1 gap-2 p-4">
                    {#each categories as category}
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          id={category}
                          value={category}
                          checked={selectedCategories.includes(category)}
                          class="h-5 w-5 rounded border-gray-300 text-green-600"
                          onchange={() => handleCategoryChange(category)}
                        />
                        <label for={category} class="ml-2 text-sm text-gray-600">{category}</label>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <!-- Acknowledge Checkbox -->
          <div class="col-span-2">
            <div class="flex items-center">
              <input
                id="acknowledge"
                type="checkbox"
                bind:checked={acknowledge}
                class="form-checkbox h-5 w-5 rounded border-gray-300 text-green-600"
              />
              <label for="acknowledge" class="ml-2 text-sm text-gray-600">
                I acknowledge that all details provided are true to the best of my knowledge.
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="col-span-2 w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700"
            disabled={!vendorName ||
              vendorAge < 18 ||
              selectedCategories.length < 1 ||
              !acknowledge}
          >
            Submit
          </Button>
        </form>
      {/if}

      <!-- Add Product and Added Products Section -->
      {#if isSubmitted}
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Add New Product -->
          <div>
            <Card class="shadow-md">
              <CardTitle class="pl-5 pt-4 text-xl font-semibold text-gray-800"
                >Add New Product</CardTitle
              >
              <CardContent>
                <div class="space-y-4">
                  <!-- Product Name -->
                  <div>
                    <label for="productName" class="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <Input
                      id="productName"
                      bind:value={productName}
                      class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
                      placeholder="Enter Product Name"
                    />
                    {#if productNameError}
                      <span class="text-sm text-red-500">{productNameError}</span>
                    {/if}
                  </div>

                  <!-- Product Category -->
                  <div>
                    <label for="productCategory" class="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="productCategory"
                      bind:value={productCategory}
                      class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
                    >
                      {#each selectedCategories.filter((category) => category !== "All Products") as category}
                        <option value={category}>{category}</option>
                      {/each}
                    </select>
                    {#if productCategoryError}
                      <span class="text-sm text-red-500">{productCategoryError}</span>
                    {/if}
                  </div>

                  <!-- Product Price -->
                  <div>
                    <label for="productPrice" class="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <Input
                      id="productPrice"
                      type="number"
                      bind:value={productPrice}
                      class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
                      placeholder="Enter Price"
                    />
                    {#if productPriceError}
                      <span class="text-sm text-red-500">{productPriceError}</span>
                    {/if}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  class="w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700"
                  onclick={addProduct}
                >
                  Add Product
                </Button>
              </CardFooter>
            </Card>
          </div>

          <!-- Added Products -->
          <div>
            <div class="rounded-lg bg-gray-50 p-6 shadow-lg">
              <h3 class="text-xl font-semibold text-gray-800">Added Products</h3>
              <ul class="mt-4 space-y-4">
                {#each products as product, i}
                  <li class="flex justify-between rounded-lg border p-4 shadow-sm">
                    <div>
                      <div class="font-semibold">{product.name}</div>
                      <div class="text-sm text-gray-600">Category: {product.category}</div>
                      <div class="text-sm text-gray-600">Price: ₹{product.price}</div>
                    </div>
                  </li>
                {/each}
              </ul>
              {#if products.length === 0}
                <p class="mt-4 text-center text-gray-600">No products added yet.</p>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</ScrollArea>
