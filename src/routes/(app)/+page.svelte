<script lang="ts">
  import { goto } from "$app/navigation";
  import { ArrowRight } from "lucide-svelte";

  type Testimonial = {
    name: string;
    feedback: string;
    avatar: string;
  };

  const handleRedirect = (link: string): void => {
    goto(link);
  };

  const testimonials: Testimonial[] = [
    {
      name: "Emma Brown",
      feedback: "Affordable prices, excellent service, and super fresh groceries!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "John Doe",
      feedback: "Groceria is a lifesaver! Fresh produce delivered straight to my doorstep.",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Jane Smith",
      feedback: "I’ve saved so much time shopping on Groceria. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  let currentIndex: number = 0;

  const nextTestimonial = (): void => {
    currentIndex = (currentIndex + 1) % testimonials.length;
  };

  const prevTestimonial = (): void => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-green-600 to-lime-500 text-white">
  <!-- Hero Section -->
  <section
    class="relative bg-gradient-to-r from-green-600 to-lime-400 px-8 py-24 text-center md:px-16"
  >
    <div
      class="absolute inset-0 bg-cover bg-center opacity-20"
      style="background-image: url('https://www.toptal.com/designers/subtlepatterns/patterns/leaf.png');"
    ></div>
    <div class="relative mx-auto max-w-5xl">
      <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
        Welcome to <span
          class="bg-gradient-to-r from-lime-200 to-green-300 bg-clip-text text-transparent"
          >Groceria</span
        >
      </h1>
      <p class="mb-8 text-lg text-gray-100 sm:text-xl md:text-2xl">
        Revolutionizing the way you shop for groceries. Fresh, affordable, and delivered fast!
      </p>
      <!-- Search Bar -->
      <div class="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for groceries..."
          class="w-3/4 rounded-full border-2 border-gray-300 px-6 py-3 text-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 sm:w-1/2"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
        <!-- Sign Up Button -->
        <button
          onclick={() => handleRedirect("./sign-up")}
          class="w-3/4 transform rounded-full bg-gradient-to-r from-lime-300 to-green-500 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:from-lime-200 hover:to-green-400 sm:w-auto"
        >
          Sign Up
          <ArrowRight
            class="ml-2 inline-block transition-all duration-300 ease-in-out group-hover:translate-x-2"
          />
        </button>

        <!-- Register as Vendor Button -->
        <button
          onclick={() => handleRedirect("./vendor/register")}
          class="mt-4 w-3/4 transform rounded-full bg-gradient-to-r from-lime-300 to-green-500 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:from-lime-200 hover:to-green-400 sm:mt-0 sm:w-auto"
        >
          Register as Vendor
          <ArrowRight
            class="ml-2 inline-block transition-all duration-300 ease-in-out group-hover:translate-x-2"
          />
        </button>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="bg-gradient-to-br from-white to-gray-50 px-6 py-16 text-gray-800 md:px-12">
    <div
      class="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 md:grid-cols-3"
    >
      <!-- Feature Card -->
      <div
        class="group relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-lime-400 text-white shadow-lg transition-all duration-300 group-hover:bg-green-700"
        >
          <svg class="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M2.166 5.446A9.958 9.958 0 0110 3c2.21 0 4.248.73 5.924 1.953a1 1 0 01.305.861l-.52 2.603c-.098.49-.36.924-.745 1.252a8.007 8.007 0 01-4.71 1.58c-1.914 0-3.732-.652-5.149-1.74a1 1 0 01-.34-1.117l.51-1.604z"
            ></path>
            <path
              d="M2.016 9.795a10.014 10.014 0 013.564-.724c1.378 0 2.661.294 3.743.83a1 1 0 01.23 1.611l-1.455 1.3a7.987 7.987 0 01-5.193 2.038 1 1 0 01-1-.818L2.016 9.795z"
            ></path>
          </svg>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Fresh Products</h3>
        <p class="text-gray-600">Sourced directly from farms to ensure freshness and quality.</p>
      </div>

      <!-- Feature Card -->
      <div
        class="group relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-lime-400 text-white shadow-lg transition-all duration-300 group-hover:bg-green-700"
        >
          <svg class="h-12 w-12 -translate-x-1 transform" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17 9h-4V5h-2v4H7v2h4v4h2v-4h4V9z"></path>
          </svg>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Easy Ordering</h3>
        <p class="text-gray-600">Simple, intuitive interface to make grocery shopping a breeze.</p>
      </div>

      <!-- Feature Card -->
      <div
        class="group relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-lime-400 text-white shadow-lg transition-all duration-300 group-hover:bg-green-700"
        >
          <svg class="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 1a9 9 0 100 18 9 9 0 000-18zM5 8.5A1.5 1.5 0 016.5 7h7a1.5 1.5 0 010 3h-7A1.5 1.5 0 015 8.5z"
            ></path>
          </svg>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Fast Delivery</h3>
        <p class="text-gray-600">Get your groceries delivered at lightning speed.</p>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16">
    <div class="mx-auto max-w-6xl text-center">
      <h2 class="mb-8 text-3xl font-extrabold text-gray-800 sm:text-4xl">What Our Customers Say</h2>
      <div class="relative flex items-center justify-center">
        <!-- Carousel Controls -->
        <button
          class="absolute left-0 p-3 text-green-600 transition hover:scale-110"
          onclick={prevTestimonial}
          aria-label="Previous"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Testimonial Card -->
        <div
          class="relative mx-auto max-w-lg transform rounded-xl bg-white p-8 shadow-2xl transition hover:scale-105"
        >
          <div
            class="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-green-200 to-lime-200 opacity-20"
          ></div>
          <div class="mx-auto mb-6 h-20 w-20">
            <div
              class="rounded-full border-4 border-green-500 bg-gradient-to-r from-lime-300 to-green-300 p-1"
            >
              <img
                src={testimonials[currentIndex].avatar}
                alt="Customer Avatar"
                class="h-full w-full rounded-full"
              />
            </div>
          </div>

          <p class="mb-6 text-lg italic text-gray-600">
            &ldquo;{testimonials[currentIndex].feedback}&rdquo;
          </p>

          <h3 class="text-xl font-semibold text-green-600">{testimonials[currentIndex].name}</h3>
        </div>

        <!-- Carousel Controls -->
        <button
          class="absolute right-0 p-3 text-green-600 transition hover:scale-110"
          onclick={nextTestimonial}
          aria-label="Next"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div class="mt-6 flex justify-center gap-2">
        {#each testimonials as _, index}
          <div
            class={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-green-500" : "bg-gray-300"} transition`}
          ></div>
        {/each}
      </div>
    </div>
  </section>
</div>
