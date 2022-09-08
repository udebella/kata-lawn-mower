import { describe, it } from 'https://deno.land/std@0.154.0/testing/bdd.ts'
import { expect } from 'https://deno.land/x/expect@v0.2.10/mod.ts'

class LawnMower {
    constructor(private x: number, private y: number, private direction: 'N') {}
}

describe('lawn mower', () => {
    it('can compare lawnmowers', () => {
        const lawnMower = new LawnMower(0, 0, 'N')

        expect(lawnMower).toEqual(new LawnMower(0, 0, 'N'))
    })
})

