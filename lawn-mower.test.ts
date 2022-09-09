import { describe, it } from 'https://deno.land/std@0.154.0/testing/bdd.ts'
import { expect } from 'https://deno.land/x/expect@v0.2.10/mod.ts'

class Position {
    constructor(public x: number, public y:number) {}
}

class LawnMower {
    constructor(private position: Position, private direction: "N" | "S") {
    }

    move() {
        if (this.direction === 'S') {
            return new LawnMower(new Position(0, this.position.y - 1), "S")
        }
        return new LawnMower(new Position(0, this.position.y + 1), "N")
    }
}

describe('lawn mower', () => {
    it('can compare lawnmowers', () => {
        const lawnMower = new LawnMower(new Position(0, 0), 'N')

        expect(lawnMower).toEqual(new LawnMower(new Position(0, 0), 'N'))
    })

    it('two mower in different spots should be different', () => {
        const lawnMower = new LawnMower(new Position(1, 0), 'N')

        expect(lawnMower).not.toEqual(new LawnMower(new Position(0, 0), 'N'))
    })

    it('can move north', () => {
        const lawnMower = new LawnMower(new Position(0, 0), 'N')

        const moved = lawnMower.move()

        expect(moved).toEqual(new LawnMower(new Position(0, 1), 'N'))
    })

    it('can move south', () => {
        const lawnMower = new LawnMower(new Position(0, 1), 'S')

        const moved = lawnMower.move()

        expect(moved).toEqual(new LawnMower(new Position(0, 0), 'S'))
    })

})

