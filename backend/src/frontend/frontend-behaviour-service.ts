import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export enum FrontendBehaviour {
  proxy = 'proxy',
  serve = 'serve',
  none = 'none',
}

export interface FrontendProxyConfig {
  behaviour: FrontendBehaviour.proxy;
  host: string;
}

export interface FrontendServeConfig {
  behaviour: FrontendBehaviour.serve;
  path: string;
}

export interface FrontendNoneConfig {
  behaviour: FrontendBehaviour.none;
}

export type FrontendBehaviourConfig =
  | FrontendProxyConfig
  | FrontendServeConfig
  | FrontendNoneConfig;

@Injectable()
export class FrontendBehaviourService {
  constructor(private readonly configService: ConfigService) {}

  public getFrontendBehaviourConfig(): FrontendBehaviourConfig {
    const proxyHost = this.configService.get<string>('FRONTEND_PROXY_HOST');
    const servePath = this.configService.get<string>('FRONTEND_PATH');

    if (servePath) {
      return {
        behaviour: FrontendBehaviour.serve,
        path: servePath,
      };
    }

    if (proxyHost) {
      return {
        behaviour: FrontendBehaviour.proxy,
        host: proxyHost,
      };
    }

    return {
      behaviour: FrontendBehaviour.none,
    };
  }
}
