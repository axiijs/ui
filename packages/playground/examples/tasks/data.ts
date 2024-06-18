import {faker} from "@faker-js/faker";

export type Task = {
    id: string
    title: string
    status: 'backlog' | 'todo' | 'in progress' | 'done' | 'cancelled'
    priority: 'low' | 'medium' | 'high'
    label: 'bug' | 'feature' | 'enhancement'
}

export const data: Task[] = Array(100).fill(0).map(() => ({
    id: faker.string.numeric(6) ,
    title: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['backlog', 'todo', 'in progress', 'done', 'cancelled']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    label: faker.helpers.arrayElement(['bug', 'feature', 'enhancement']),
}))
