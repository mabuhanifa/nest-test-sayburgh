import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { ContactInfoModule } from './contact-info/contact-info.module';
import { DepartmentModule } from './department/department.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import EmployeeModule from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URI,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    EmployeeModule,
    ContactInfoModule,
    DepartmentModule,
    CategoryModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
