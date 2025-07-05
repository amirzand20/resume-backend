import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {CustomNamingStrategy} from './custom.naming.strategy';
import {AuditedEntitySubscriber} from "@/common/typeorm/audited-entity.subscriber";
import {addTransactionalDataSource} from 'typeorm-transactional';
import {DataSource} from 'typeorm';
import {LogAuditingSubscriber} from "@/common/typeorm/log-auditing.subscriber";
import {EncryptionHelper} from "@/common/utils/encryption-helper";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const encryptionHelper: EncryptionHelper = new EncryptionHelper()
                return {
                    type: 'postgres',
                    host: configService.get('DB_URL') || 'localhost',
                    port: parseInt(configService.get('DB_PORT') || '5432'),
                    username: configService.get('DB_USERNAME') || 'postgres',
                    password: configService.get('DB_PASSWORD') || 'postgres',
                    database: configService.get('DB_NAME') || 'resume_db',
                    entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
                    synchronize: true,
                    namingStrategy: new CustomNamingStrategy(),
                    extra: {
                        trustServerCertificate: true,
                    },
                    logging: true,
                    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
                    migrationsTableName: 'migrations',
                    migrationsRun: false,
                    subscribers: [AuditedEntitySubscriber, LogAuditingSubscriber]
                }
            }, async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed')
                }
                return addTransactionalDataSource(new DataSource(options))
            }
        }),
    ]
})
export class TypeormConfigModule {
}
