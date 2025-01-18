<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import Footer from "$lib/components/custom/Footer.svelte";
  import { ArrowRight, Search, ShoppingCart, Truck, Leaf, Star } from "lucide-svelte";

  type Testimonial = {
    name: string;
    feedback: string;
    avatar: string;
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
      feedback: "I've saved so much time shopping on Groceria. Highly recommended!",
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

<svelte:head>
  <title>groceria.</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary to-primary/50 text-white">
  <!-- Hero Section -->
  <section
    class="relative bg-gradient-to-r from-primary to-primary/60 px-8 py-24 text-center md:px-16"
  >
    <div
      class="absolute inset-0 bg-cover bg-center opacity-20"
      style="background-image: url('https://www.toptal.com/designers/subtlepatterns/patterns/leaf.png');"
    ></div>
    <div class="relative mx-auto max-w-5xl">
      <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
        Welcome to
        <span class="relative bg-gradient-to-r from-primary/20 to-primary/30 bg-clip-text">
          <span class="animate-pulse text-green-400">gro</span>ceria.
          <Leaf class="absolute -right-8 top-0 h-8 w-8 animate-bounce text-green-400" />
        </span>
      </h1>
      <p class="mb-8 text-lg text-gray-100 sm:text-xl md:text-2xl">
        Revolutionizing the way you shop for groceries. Fresh, affordable, and delivered fast!
      </p>
      <!-- Search Bar -->
      <div class="mb-8 flex justify-center">
        <div class="relative w-3/4 sm:w-1/2">
          <form action="/market" method="GET" class="relative">
            <Input
              type="search"
              name="search"
              placeholder="Search for groceries..."
              class="rounded-full border-2 border-primary/30 bg-white/90 py-5 pl-14 pr-8 text-xl text-primary transition-all duration-300 placeholder:text-primary/60 hover:border-primary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search class="absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-primary/60" />
          </form>
        </div>
      </div>

      <!-- Action Links -->
      <div class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
        <!-- Sign Up Link -->
        <a
          href="/sign-up"
          class="flex w-3/4 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg text-white transition-all duration-300 hover:bg-white hover:text-primary sm:w-auto"
        >
          <span>Sign Up</span>
          <ArrowRight class="ml-2 inline-block" />
        </a>

        <!-- Register as Vendor Link -->
        <a
          href="/vendor/register?ref=home"
          class="flex w-3/4 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg text-white transition-all duration-300 hover:bg-white hover:text-primary sm:w-auto"
        >
          <span>Register as Vendor</span>
          <ShoppingCart class="ml-2 inline-block" />
        </a>
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
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-white shadow-lg transition-all duration-300 group-hover:bg-primary/80"
        >
          <Leaf class="h-12 w-12" />
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Fresh Products</h3>
        <p class="text-gray-600">Sourced directly from farms to ensure freshness and quality.</p>
      </div>

      <!-- Feature Card -->
      <div
        class="group relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-white shadow-lg transition-all duration-300 group-hover:bg-primary/80"
        >
          <ShoppingCart class="h-12 w-12" />
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Easy Ordering</h3>
        <p class="text-gray-600">Simple, intuitive interface to make grocery shopping a breeze.</p>
      </div>

      <!-- Feature Card -->
      <div
        class="group relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-white shadow-lg transition-all duration-300 group-hover:bg-primary/80"
        >
          <Truck class="h-12 w-12" />
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Fast Delivery</h3>
        <p class="text-gray-600">Get your groceries delivered at lightning speed.</p>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16">
    <div class="mx-auto max-w-6xl text-center">
      <h2 class="mb-8 text-3xl font-extrabold text-gray-800 sm:text-4xl">
        What Our Customers Say
        <Star class="inline-block h-8 w-8 text-yellow-400" />
      </h2>
      <div class="relative flex items-center justify-center">
        <!-- Carousel Controls -->
        <Button
          variant="ghost"
          class="absolute left-0 p-3 text-primary transition hover:scale-110"
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
        </Button>

        <!-- Testimonial Card -->
        <div
          class="relative mx-auto max-w-lg transform rounded-xl bg-white p-8 shadow-2xl transition hover:scale-105"
        >
          <div
            class="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-primary/20 opacity-20"
          ></div>
          <div class="mx-auto mb-6 h-20 w-20">
            <div
              class="rounded-full border-4 border-primary bg-gradient-to-r from-primary/30 to-primary/30 p-1"
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

          <h3 class="text-xl font-semibold text-primary">{testimonials[currentIndex].name}</h3>
        </div>

        <!-- Carousel Controls -->
        <Button
          variant="ghost"
          class="absolute right-0 p-3 text-primary transition hover:scale-110"
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
        </Button>
      </div>

      <div class="mt-6 flex justify-center gap-2">
        {#each testimonials as _, index}
          <div
            class={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-primary" : "bg-gray-300"} transition`}
          ></div>
        {/each}
      </div>
    </div>
  </section>
</div>

<Footer />
