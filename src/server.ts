/**
 * the polyfills must be the first thing imported
 */
import './polyfills.ts';
import * as path from 'path';
import { Server } from 'hapi';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.node.module';
import hapiEngine from './app/hapi-engine';
import { environment } from './environments/environment';
import { routes } from './server.routes';

// App

const app = new Server();
const ROOT = path.join(path.resolve(__dirname, '..'));
const port = process.env.PORT || 4200;

/**
 * enable prod mode for production environments
 */
if (environment.production) {
  enableProdMode();
}

/**
 * bootstrap universal app
 * @param req
 * @param res
 */
function ngApp(request: any, reply: any) {
  const url = `${request.connection.info.protocol}://${request.info.host}${request.url.path}`;
  reply.view('index', {
    request: request,
    req: request.raw.req,
    res: request.raw.res,
    ngModule: AppModule,
    preboot: true,
    baseUrl: '/',
    requestUrl: url,
    originUrl: request.info.hostname
  });
}

app.connection({ port: port });

app.register([require('inert'), require('vision')], (err) => {
  if (err) {
    throw err
  }

  /**
   * serve static files
   */
  app.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: path.join(ROOT, 'dist')
      }
    }
  });

/**
 * if you want to use universal for all routes, you can use the '*' wildcard
 */
  app.ext('onPostHandler', (request, reply) => {
    const response = request.response;
    if (response.isBoom && (<any>response).output.statusCode === 404) {
      const pojo = {status: 404, message: 'No Content'};
      const json = JSON.stringify(pojo, null, 2);
      return reply(json).header('Content-Type', 'application/json').code(404);
    } else {
      return reply.continue();
    }
  });

  /**
   * use universal for specific routes
   */
  app.route({
    method: 'GET',
    path: '/',
    handler: ngApp
  });

  routes.forEach(route => {
    app.route({
      method: 'GET',
      path: `/${route}`,
      handler: ngApp
    });
    app.route({
      method: 'GET',
      path: `/${route}/{p*}`,
      handler: ngApp
    });
  });

  /**
   * place your api routes here
   */
  // app.route({
  //   method: 'GET',
  //   path: '/api',
  //   handler: api
  // });

  /**
   * Hapijs View
   */
  app.views({
    engines: {
      html: {
        module: hapiEngine,
        compileMode: 'async'
      }
    },
    path: __dirname,
    layoutPath: __dirname
  });

  app.start(() => {
    console.log(`Listening on port ${port}`);
  });

});
