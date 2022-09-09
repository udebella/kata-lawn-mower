import { describe, it } from "https://deno.land/std@0.154.0/testing/bdd.ts";
import { expect } from "https://deno.land/x/expect@v0.2.10/mod.ts";

class Position {
  constructor(public x: number, public y: number) {
  }
}

type Direction = (position: Position) => Position;
type LawnMower = { position: Position; direction: Direction };

function move({ direction, position }: LawnMower) {
  return newLawnMower(
    direction(position),
    direction,
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

function newLawnMower(position: Position, direction: Direction): LawnMower {
  return { position, direction };
}

const orderedDirection = [north, west, south, east]

function turn(lawnMower: LawnMower, direction: typeof orderedDirection) {
  const index = direction.indexOf(lawnMower.direction);
  const indexNewDirection = (index + 1) % direction.length;
  return {...lawnMower, direction: direction[indexNewDirection]}
}

function turnLeft(lawnMower: LawnMower): LawnMower {
  return turn(lawnMower, orderedDirection);
}

function turnRight(lawnMower: LawnMower) {
  const reversed = [...orderedDirection].reverse();
  return turn(lawnMower, reversed);
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
    const lawnMower = newLawnMower(new Position(2, 0), west);

    const moved = move(lawnMower);

    expect(moved).toEqual(newLawnMower(new Position(1, 0), west));
  });

  it("can turn left", () => {
    const lawnMower = newLawnMower(new Position(0, 0), north);

    const turned = turnLeft(lawnMower);

    expect(turned).toEqual(newLawnMower(new Position(0, 0), west));
  });

  it("can turn left twice", () => {
    const lawnMower = newLawnMower(new Position(0, 0), north);

    const turned = turnLeft(turnLeft(lawnMower));

    expect(turned).toEqual(newLawnMower(new Position(0, 0), south));
  });

  it("can turn left thrice", () => {
    const lawnMower = newLawnMower(new Position(0, 0), north);

    const turned = turnLeft(turnLeft(turnLeft(lawnMower)));

    expect(turned).toEqual(newLawnMower(new Position(0, 0), east));
  });


    it("can turn left four times", () => {
        const lawnMower = newLawnMower(new Position(0, 0), north);

        const turned = turnLeft(turnLeft(turnLeft(turnLeft(lawnMower))));

        expect(turned).toEqual(newLawnMower(new Position(0, 0), north));
    });

    it("can turn right", () => {
        const lawnMower = newLawnMower(new Position(0, 0), north);

        const turned = turnRight(lawnMower);

        expect(turned).toEqual(newLawnMower(new Position(0, 0), east));
    });
});
