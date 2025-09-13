import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { RatingService } from './rating/rating.service';
import { RatingResolver } from './rating/rating.resolver';

import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    CommentService,
    RatingService,
    CommentResolver,
    RatingResolver,
    PrismaService,
  ],
  exports: [CommentService, RatingService],
})
export class CommentModule {}
