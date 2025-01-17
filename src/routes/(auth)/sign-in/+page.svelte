<script lang="ts">
  import { enhance } from "$app/forms";
  import { type ActionData } from "./$types";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { LogIn, TriangleAlert, Eye, EyeClosed } from "lucide-svelte";

  let { form }: { form: ActionData } = $props();
  let showPassword = $state(false);
</script>

<svelte:head>
  <title>Sign In | groceria</title>
</svelte:head>

<Card.Root class="mx-auto max-w-sm shadow-lg">
  <Card.Header>
    <Card.Title class="text-2xl">Sign In</Card.Title>
    <Card.Description>Enter your email to sign in to your account</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="grid gap-4">
      <form class="grid gap-4" method="POST" action="?/sign-in" use:enhance>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="contact@janedoe.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <a href="##" class="text-sm underline"> Forgot your password? </a>
          </div>
          <div class="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="~!@#$%^"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2"
              onclick={() => (showPassword = !showPassword)}
            >
              {#if showPassword}
                <EyeClosed />
              {:else}
                <Eye />
              {/if}
            </button>
          </div>
        </div>
        <Button type="submit" class="w-full">
          <LogIn />
          Sign In
        </Button>
      </form>
      {#if form?.message}
        <Alert.Root class="border-red-500">
          <Alert.Description class="font-medium text-red-500">
            <TriangleAlert class="mr-2 inline-block h-5 w-5" />
            {form?.message}
          </Alert.Description>
        </Alert.Root>
      {/if}
    </div>
    <div class="mt-4 text-center text-sm">
      Don't have an account?
      <a href="/sign-up" class="underline">Sign Up</a>
    </div>
  </Card.Content>
</Card.Root>
