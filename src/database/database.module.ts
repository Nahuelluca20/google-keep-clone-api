import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoClient } from 'mongodb';
import config from '@/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configServise: ConfigType<typeof config>) => {
        const { user, password, host, port, connection, dbName } =
          configServise.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configServise: ConfigType<typeof config>) => {
        const { user, password, host, port, connection, dbName } =
          configServise.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
