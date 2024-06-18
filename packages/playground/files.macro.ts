import { readdir } from 'fs/promises'

const demos = await readdir('./demo')

export function getDemos() {
    return demos
}
