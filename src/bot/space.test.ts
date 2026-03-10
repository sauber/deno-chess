import { assertEquals } from "@std/assert";
import { Space } from "./space.ts";

Deno.test("Name", () => {
  const player = new Space();
  assertEquals(player.name, "Space");
});

Deno.test("Move", () => {
  const player = new Space();
  assertEquals(typeof player.rank, "function");
});
