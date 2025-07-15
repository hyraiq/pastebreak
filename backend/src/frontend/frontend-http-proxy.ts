import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import {
  FrontendBehaviour,
  FrontendBehaviourService,
} from './frontend-behaviour-service';

@Injectable()
export class FrontendHttpProxy implements NestMiddleware {
  private proxyMiddleware:
    | undefined
    | RequestHandler<IncomingMessage, ServerResponse, NextFunction>;

  constructor(behaviourService: FrontendBehaviourService) {
    const behaviourConfig = behaviourService.getFrontendBehaviourConfig();

    if (behaviourConfig.behaviour === FrontendBehaviour.proxy) {
      console.log(`Proxying to ${behaviourConfig.host}`);
      this.proxyMiddleware = createProxyMiddleware({
        target: behaviourConfig.host,
        changeOrigin: true,
      });
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    if (!this.proxyMiddleware) {
      return next();
    }

    return this.proxyMiddleware(req, res, next);
  }
}
