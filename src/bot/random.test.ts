import { assertEquals } from "@std/assert";
import { Random } from "./random.ts";

Deno.test("Name", () => {
  const player = new Random();
  assertEquals(player.name, "Random");
});

Deno.test("Move", () => {
  const player = new Random();
  assertEquals(typeof player.best, "function");
});
