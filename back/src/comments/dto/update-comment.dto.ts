export class UpdateCommentDto {
    readonly userId : string;
    readonly username : string;
    readonly urlImg : string;
    readonly postId : string;
    readonly comment? : string;
}