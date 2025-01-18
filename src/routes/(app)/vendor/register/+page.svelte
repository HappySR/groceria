<script lang="ts">
  import { goto } from "$app/navigation";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Card, CardContent, CardFooter, CardTitle } from "$lib/components/ui/card";

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
  let dropdownOpenCategories = false;
  let dropdownOpenDays = false;
  let description = "";
  let address = "";
  let phone = "";
  let email = "";
  let opensAt = "";
  let closesAt = "";
  let weekdays: string[] = [];
  let facebookLink = "";
  let instagramLink = "";
  let twitterLink = "";
  let websiteLink = "";
  let isValidEmail = false;

  $: isDisabled =
    !vendorName ||
    vendorAge < 18 ||
    selectedCategories.length < 1 ||
    !acknowledge ||
    weekdays.length === 0 ||
    !description ||
    !address ||
    !phone ||
    !email ||
    !opensAt ||
    !closesAt ||
    description.length < 10;

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    isValidEmail = emailRegex.test(email);
  };

  const categories = [
    "All Products",
    "Fresh Fruits",
    "Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Bakery",
    "Pantry Staples",
  ];

  const weekdaysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleWeekdayChange = (day: string) => {
    if (weekdays.includes(day)) {
      weekdays = weekdays.filter((d) => d !== day);
    } else {
      weekdays = [...weekdays, day];
    }
  };

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

  function toggleDropdownCategories() {
    dropdownOpenCategories = !dropdownOpenCategories;
  }

  function toggleDropdownDays() {
    dropdownOpenDays = !dropdownOpenDays;
  }

  const submitForm = (event: SubmitEvent) => {
    isSubmitted = true;
    // Prevent the default form submission behavior
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", {
      vendorName,
      vendorAge,
      selectedCategories,
      acknowledge,
      description,
      address,
      phone,
      email,
      opensAt,
      closesAt,
      weekdays,
      facebookLink,
      instagramLink,
      twitterLink,
      websiteLink,
    });
    goto("./vendor-dashboard");
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

<div class="container mx-auto max-w-7xl px-4 pt-8">
  <!-- Header -->
  <div class="flex flex-col items-start space-y-4">
    <h1 class="pb-4 text-3xl font-extrabold leading-tight text-green-600 md:text-5xl">groceria.</h1>
    <p class="mb-8 mt-4 max-w-full rounded-lg bg-gray-50 px-4 py-2 text-xl text-gray-600 shadow-md">
      Welcome to groceria! Please fill out the form below to register your vendor details. This
      information will help us serve you better.
    </p>
    <div class="w-full border-b-2 border-gray-300"></div>
    <!-- Subtle line divider -->
  </div>
</div>

<!-- Main Content -->
<ScrollArea class="h-[calc(100vh-4rem)] overflow-hidden py-5">
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
                onclick={toggleDropdownCategories}
                role="button"
                aria-pressed={dropdownOpenCategories ? "true" : "false"}
                tabindex="0"
                onkeydown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    toggleDropdownCategories();
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
                    class:rotate-180={dropdownOpenCategories}
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
              {#if dropdownOpenCategories}
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

          <!-- Description -->
          <div class="col-span-2">
            <label for="description" class="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              bind:value={description}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              placeholder="Enter Description"
              required
              minlength="10"
              maxlength="500"
            ></textarea>
            <span class="text-sm text-gray-500"
              >Min length: 10 characters. Max length: 500 characters.</span
            >
          </div>

          <!-- Address -->
          <div class="col-span-2">
            <label for="address" class="block text-lg font-medium text-gray-700"> Address </label>
            <Input
              id="address"
              placeholder="Enter Address"
              bind:value={address}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              required
              maxlength={250}
            />
          </div>

          <!-- Phone -->
          <div class="col-span-2">
            <label for="phone" class="block text-lg font-medium text-gray-700">Phone</label>
            <Input
              id="phone"
              placeholder="Enter Phone Number (e.g., 1234567890)"
              bind:value={phone}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              required
              type="number"
              min="1000000000"
              title="Please enter a valid phone number (e.g., 1234567890)"
            />
            {#if phone && phone.toString().length < 10}
              <span class="text-sm text-red-500">Phone Number should be at least 10 digits</span>
            {/if}
          </div>

          <!-- Email -->
          <div class="col-span-2">
            <label for="email" class="block text-lg font-medium text-gray-700"> Email </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email Address"
              bind:value={email}
              oninput={validateEmail}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              required
            />
            {#if email && !isValidEmail}
              <span class="text-sm text-red-500">Please enter a valid email address</span>
            {/if}
          </div>

          <!-- Opens At -->
          <div class="col-span-2">
            <label for="opensAt" class="block text-lg font-medium text-gray-700"> Opens At </label>
            <Input
              id="opensAt"
              type="time"
              bind:value={opensAt}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <!-- Closes At -->
          <div class="col-span-2">
            <label for="closesAt" class="block text-lg font-medium text-gray-700">
              Closes At
            </label>
            <Input
              id="closesAt"
              type="time"
              bind:value={closesAt}
              class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <!-- Weekdays (Dropdown with multi-select checkboxes) -->
          <div class="col-span-2">
            <label for="weekdays" class="block text-lg font-medium text-gray-700">
              Weekdays (Select days when the shop is open)
            </label>
            <div class="relative mt-4 w-full md:w-1/2">
              <!-- Dropdown Trigger -->
              <div
                class="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm focus-within:ring-2 focus-within:ring-green-500"
                onclick={toggleDropdownDays}
                role="button"
                aria-pressed={dropdownOpenDays ? "true" : "false"}
                tabindex="0"
                onkeydown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    toggleDropdownDays();
                  }
                }}
              >
                <div class="flex items-center justify-between">
                  <div>
                    {#if weekdays.length > 0}
                      {weekdays.join(", ")}
                    {:else}
                      Select Weekdays...
                    {/if}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transition-transform duration-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class:rotate-180={dropdownOpenDays}
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
              {#if dropdownOpenDays}
                <div
                  class="absolute left-0 mt-2 max-h-56 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg"
                >
                  <div class="grid grid-cols-1 gap-2 p-4">
                    {#each weekdaysOptions as day}
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          id={day}
                          value={day}
                          checked={weekdays.includes(day)}
                          class="h-5 w-5 rounded border-gray-300 text-green-600"
                          onchange={() => handleWeekdayChange(day)}
                        />
                        <label for={day} class="ml-2 text-sm text-gray-600">{day}</label>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <!-- Social Media Links (Optional) -->
          <div class="col-span-2">
            <label for="socialMedia" class="block text-lg font-medium text-gray-700">
              Social Media Links (Optional)
            </label>
            <div class="space-y-4">
              <Input
                id="facebookLink"
                placeholder="Facebook Link"
                bind:value={facebookLink}
                class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              />
              <Input
                id="instagramLink"
                placeholder="Instagram Link"
                bind:value={instagramLink}
                class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              />
              <Input
                id="twitterLink"
                placeholder="Twitter Link"
                bind:value={twitterLink}
                class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              />
              <Input
                id="websiteLink"
                placeholder="Website Link"
                bind:value={websiteLink}
                class="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
              />
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
            disabled={isDisabled}
          >
            Submit
          </Button>
        </form>
      {/if}
    </div>
  </div>
</ScrollArea>
