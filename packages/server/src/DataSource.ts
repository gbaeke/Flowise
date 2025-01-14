import 'reflect-metadata'
import path from 'path'
import { DataSource } from 'typeorm'
import { ChatFlow } from './entity/ChatFlow'
import { ChatMessage } from './entity/ChatMessage'
import { Tool } from './entity/Tool'
import { getUserHome } from './utils'

let appDataSource: DataSource

export const init = async (): Promise<void> => {
    const homePath = process.env.DATABASE_PATH ?? path.join(getUserHome(), '.flowise')

    appDataSource = new DataSource({
        type: 'sqlite',
        database: '/data/database.sqlite',
        synchronize: true,
        entities: [ChatFlow, ChatMessage, Tool],
        migrations: []
    })
}

export function getDataSource(): DataSource {
    if (appDataSource === undefined) {
        init()
    }
    return appDataSource
}
