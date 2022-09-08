import { describe, it } from 'https://deno.land/std@0.154.0/testing/bdd.ts'
import { expect } from 'https://deno.land/x/expect@v0.2.10/mod.ts'

function createLawnMower(arg0: number,arg1: number,arg2: string) {
    return undefined;
}

describe('lawn mower', () => {
    it('works', () => {
        const lawnMower = createLawnMower(0, 0, 'N')

        expect(lawnMower).toEqual(createLawnMower(0, 0, 'N'))
    })
})

