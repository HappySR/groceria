<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Eye, EyeClosed, TriangleAlert, DoorOpen } from "lucide-svelte";

  let { form }: { form: ActionData } = $props();
  let password = $state("");
  let showPassword = $state(false);
  let confirmPassword = $state("");
  let showConfirmPassword = $state(false);
</script>

<svelte:head>
  <title>Sign Up | groceria.</title>
</svelte:head>

<Card.Root class="mx-auto max-w-sm shadow-lg">
  <Card.Header>
    <Card.Title class="text-2xl">Sign Up</Card.Title>
    <Card.Description>Enter your email to sign up for an account</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="grid gap-4">
      <form class="grid gap-4" method="POST" action="?/sign-up" use:enhance>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" type="text" name="username" placeholder="jane-doe" required />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="contact@janedoe.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
          </div>
          <div class="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="~!@#$%^"
              bind:value={password}
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
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="confirm-password">Confirm password</Label>
          </div>
          <div class="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              placeholder="~!@#$%^"
              bind:value={confirmPassword}
              required
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2"
              onclick={() => (showConfirmPassword = !showConfirmPassword)}
            >
              {#if showConfirmPassword}
                <EyeClosed />
              {:else}
                <Eye />
              {/if}
            </button>
          </div>
        </div>
        <Button type="submit" class="w-full" disabled={password !== confirmPassword}>
          <DoorOpen />
          Sign Up
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
      Already have an account?
      <a href="/sign-in" class="underline">Sign In</a>
    </div>
  </Card.Content>
</Card.Root>
