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
        const { user, password, host, dbName, connection } =
          configServise.mongo;
        return {
          uri: `${connection}://${user}:${password}@cluster0.ghuq0.mongodb.net/?retryWrites=true&w=majority`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configServise: ConfigType<typeof config>) => {
        const { user, password, host, dbName } = configServise.mongo;
        const uri = `mongodb+srv://${user}:${password}@cluster0.ghuq0.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        });
        await client.connect();
        const database = client.db('keep');
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
