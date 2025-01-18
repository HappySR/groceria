<script>
  import { Facebook, Instagram, Linkedin, Twitter } from "lucide-svelte";
</script>

<footer class="bg-green-600 py-8 text-white">
  <div class="mx-auto max-w-7xl px-6 text-center sm:px-12">
    <!-- Footer Logo and Company Info -->
    <div class="mb-6">
      <h3 class="text-3xl font-extrabold">Groceria</h3>
      <p class="mt-2 text-lg">Fresh groceries delivered to your doorstep</p>
    </div>

    <!-- Social Links -->
    <div class="mb-6 flex justify-center gap-8">
      <!-- Facebook Link -->
      <a
        href="#top"
        class="text-white transition-all duration-300 hover:text-lime-200"
        aria-label="Facebook"
      >
        <Facebook class="h-8 w-8" />
      </a>

      <!-- Instagram Link -->
      <a
        href="#top"
        class="text-white transition-all duration-300 hover:text-lime-200"
        aria-label="Instagram"
      >
        <Instagram class="h-8 w-8" />
      </a>

      <!-- LinkedIn Link -->
      <a
        href="#top"
        class="text-white transition-all duration-300 hover:text-lime-200"
        aria-label="LinkedIn"
      >
        <Linkedin class="h-8 w-8" />
      </a>

      <!-- Twitter Link -->
      <a
        href="#top"
        class="text-white transition-all duration-300 hover:text-lime-200"
        aria-label="Twitter"
      >
        <Twitter class="h-8 w-8" />
      </a>
    </div>

    <!-- Footer Navigation Links -->
    <div class="mb-8 grid grid-cols-2 gap-8 text-gray-200 sm:grid-cols-4">
      <div>
        <h4 class="text-xl font-semibold">Company</h4>
        <ul>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="About Us"
              >About Us</a
            >
          </li>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="Careers"
              >Careers</a
            >
          </li>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="Press"
              >Press</a
            >
          </li>
          <li>
            <a
              href="#top"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Privacy Policy">Privacy Policy</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-xl font-semibold">Support</h4>
        <ul>
          <li>
            <a
              href="#top"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Help Center">Help Center</a
            >
          </li>
          <li>
            <a
              href="#top"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Shipping Info">Shipping Info</a
            >
          </li>
          <li>
            <a
              href="#top"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Return Policy">Return Policy</a
            >
          </li>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="Contact"
              >Contact</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-xl font-semibold">Follow Us</h4>
        <ul>
          <li>
            <a
              href="#top"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Instagram">Instagram</a
            >
          </li>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="Twitter"
              >Twitter</a
            >
          </li>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="Facebook"
              >Facebook</a
            >
          </li>
          <li>
            <a href="#top" class="transition duration-300 hover:text-lime-200" aria-label="LinkedIn"
              >LinkedIn</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-xl font-semibold">Contact Us</h4>
        <ul>
          <li>
            <a
              href="mailto:support@groceria.com"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Email Support">support@groceria.com</a
            >
          </li>
          <li>
            <a
              href="tel:+1234567890"
              class="transition duration-300 hover:text-lime-200"
              aria-label="Phone Support">+1 (234) 567-890</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="text-sm text-gray-300">
      <p>&copy; 2025 Groceria. All rights reserved.</p>
    </div>
  </div>
</footer>
