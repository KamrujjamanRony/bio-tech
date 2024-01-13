export interface CommentModel {
    id: string;
    companyID: number;
    code: string;
    comments: string;
}

export interface AddCommentRequest {
    companyID: number;
    code: string;
    comments: string;
}

export interface UpdateCommentRequest {
    companyID: number;
    code: string;
    comments: string;
}