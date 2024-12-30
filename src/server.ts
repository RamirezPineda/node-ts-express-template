/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'node:http';
import express, { type Router, type Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import 'reflect-metadata'; // for TypeOrm

import { PATH_PREFIX } from '@/common/constants';
import { AppDataSource } from '@/config/db.config';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app: Express;
  private readonly port: number;
  private readonly routes: Router;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, routes } = options;

    this.app = express();
    this.port = port;
    this.routes = routes;
  }

  public async start(): Promise<void> {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(compression());

    //* Routes
    this.app.use(PATH_PREFIX, this.routes);

    //* Server
    const server = http.createServer(this.app);

    await AppDataSource.initialize();
    console.log('Connection to the database successful');
    this.serverListener = server.listen(this.port, () => {
      console.log(`Server ready on http://localhost:${this.port} 🚀`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
