import { Container } from "inversify";
import { CommentService } from "./comment-service.interface.js";
import { Component } from "../../types/component.enum.js";
import { DefaultCommentService } from "./deffaul-comment.service.js";
import { types } from "@typegoose/typegoose";
import { CommentEntity, CommentModel } from "./comment.entity.js";
import { CommentController } from "./controller/comment.controller.js";

export function CreateCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();
  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);
  commentContainer
    .bind<CommentController>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();
  return commentContainer;
}
