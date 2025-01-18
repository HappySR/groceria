<script lang="ts">
  import { page } from "$app/state";
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import Header from "$lib/components/custom/Header.svelte";
  import {
    ChartBar,
    ListFilter,
    File,
    Server,
    Clock,
    Activity,
    CheckCircle,
    Settings,
    Bell,
    Database,
  } from "lucide-svelte";
</script>

<Header pathname={page.url.pathname} />

<main class="grid gap-4 p-4 sm:px-6 sm:py-0">
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>System Status</Card.Description>
        <Card.Title class="text-2xl">Healthy</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="flex items-center gap-2">
          <CheckCircle class="h-4 w-4 text-green-500" />
          <span class="text-xs text-muted-foreground">All systems operational</span>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Server Load</Card.Description>
        <Card.Title class="text-2xl">42%</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="flex items-center gap-2">
          <Server class="h-4 w-4 text-muted-foreground" />
          <span class="text-xs text-muted-foreground">Normal range</span>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Response Time</Card.Description>
        <Card.Title class="text-2xl">235ms</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="flex items-center gap-2">
          <Clock class="h-4 w-4 text-muted-foreground" />
          <span class="text-xs text-muted-foreground">Average last hour</span>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Uptime</Card.Description>
        <Card.Title class="text-2xl">99.9%</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="flex items-center gap-2">
          <Activity class="h-4 w-4 text-muted-foreground" />
          <span class="text-xs text-muted-foreground">Last 30 days</span>
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <Card.Root>
    <Card.Header>
      <Card.Title><Settings class="mr-2 inline h-4 w-4" />System Overview</Card.Title>
      <Card.Description>Monitor system performance and health</Card.Description>
    </Card.Header>
    <Card.Content>
      <Tabs.Root value="metrics">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs.List class="w-full sm:w-auto">
            <Tabs.Trigger value="metrics"><ChartBar class="mr-1 h-4 w-4" />Metrics</Tabs.Trigger>
            <Tabs.Trigger value="logs"><Database class="mr-1 h-4 w-4" />Logs</Tabs.Trigger>
            <Tabs.Trigger value="alerts"><Bell class="mr-1 h-4 w-4" />Alerts</Tabs.Trigger>
          </Tabs.List>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" class="h-8">
              <ListFilter class="mr-2 h-4 w-4" />
              <span class="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" class="h-8">
              <File class="mr-2 h-4 w-4" />
              <span class="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </Tabs.Root>
    </Card.Content>
  </Card.Root>
</main>
