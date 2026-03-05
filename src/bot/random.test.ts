import { assertEquals } from "@std/assert";
import { Random } from "./random.ts";

Deno.test("Name", () => {
  const player = Random;
  assertEquals(player.name, "Random");
  assertEquals(typeof player.move, "function");
});
