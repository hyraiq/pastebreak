import { MiddlewareConsumer, Module } from '@nestjs/common';
import { FrontendHttpProxy } from './frontend-http-proxy';
import { FrontendBehaviourService } from './frontend-behaviour-service';

@Module({
  imports: [],
  providers: [FrontendBehaviourService],
  exports: [FrontendBehaviourService],
})
export class FrontendModule {
  configure(consumer: MiddlewareConsumer) {
    // Always apply the FrontendHttpProxy middleware, this handles the configuration for whether the proxy is enabled or not
    consumer.apply(FrontendHttpProxy).exclude('/api/*path').forRoutes('/');
  }
}
