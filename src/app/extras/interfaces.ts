export type Token = {
    type: "NUMBER" |
    "OPERATOR" |
    "OPEN_PARENTHESIS" |
    "CLOSE_PARENTHESIS";
    value: string;
};
export type Success = {
    success: true;
    value: Token[];
    rest: string
}
export type Failure = {
    success: false;
    reason: string;
}
export type Result = Success | Failure;
export type Parser = (input: string) => Result;

export const success = (value: Token[], rest: string): Result =>
    ({ success: true, value: value, rest });
export const failure = (reason: string): Result =>
    ({ success: false, reason });

