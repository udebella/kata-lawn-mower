import { describe, it } from "https://deno.land/std@0.154.0/testing/bdd.ts";
import { expect } from "https://deno.land/x/expect@v0.2.10/mod.ts";

class Position {
  constructor(public x: number, public y: number) {
  }
}

type Direction = (position: Position) => Position;
type LawnMowerType = { position: Position; direction: Direction };

function move(lawnMower: LawnMowerType) {
  return newLawnMower(
    lawnMower.direction(lawnMower.position),
    lawnMower.direction,
  );
}

function south({ x, y }: Position) {
  return new Position(x, y - 1);
}

function north({ x, y }: Position): Position {
  return new Position(x, y + 1);
}

function east({ x, y }: Position) {
  return new Position(x + 1, y);
}

function west({ x, y }: Position): Position {
    return new Position(x - 1, y);
}

function newLawnMower(position: Position, direction: Direction): LawnMowerType {
  return { position, direction };
}

describe("lawn mower", () => {
  it("can compare lawnmowers", () => {
    const lawnMower = newLawnMower(new Position(0, 0), north);

    expect(lawnMower).toEqual(newLawnMower(new Position(0, 0), north));
  });

  it("two mower in different spots should be different", () => {
    const lawnMower = newLawnMower(new Position(1, 0), north);

    expect(lawnMower).not.toEqual(newLawnMower(new Position(0, 0), north));
  });

  it("can move north", () => {
    const lawnMower = newLawnMower(new Position(1, 0), north);

    const moved = move(lawnMower);

    expect(moved).toEqual(newLawnMower(new Position(1, 1), north));
  });

  it("can move south", () => {
    const lawnMower = newLawnMower(new Position(0, 1), south);

    const moved = move(lawnMower);

    expect(moved).toEqual(newLawnMower(new Position(0, 0), south));
  });

  it("can move east", () => {
    const lawnMower = newLawnMower(new Position(0, 0), east);

    const moved = move(lawnMower);

    expect(moved).toEqual(newLawnMower(new Position(1, 0), east));
  });

  it("can move west", () => {
    const lawnMower = newLawnMower(new Position(0, 0), west);

    const moved = move(lawnMower);

    expect(moved).toEqual(newLawnMower(new Position(-1, 0), west));
  });
});
