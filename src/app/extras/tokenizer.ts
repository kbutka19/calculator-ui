
import { failure, Parser, success, Token } from "./interfaces";

/////////////////////////////// PARSERS ////////////////////////////////////////////////
export const parseNumber: Parser = (input: string) => {
    const match = /^\d+/.exec(input);
    if (match) {
        return success([
            { type: "NUMBER", value: match[0] }
        ], input.slice(match[0].length));
    }
    return failure("Not a number");
}

export const parseOperator: Parser = (input: string) => {
    const match = /^\+|-/.exec(input);
    if (match) {
        return success([{
            type: 'OPERATOR', value: match[0]
        }], input.slice(match[0].length));
    }
    return failure("Expected '+' or '-'");
}

export const parseOpenParenthesis: Parser = (input: string) => {
    const match = /^\(/.exec(input);
    if (match) {
        return success([{
            type: 'OPEN_PARENTHESIS', value: match[0]
        }], input.slice(match[0].length));
    }
    return failure("Expected '('");
}

export const parseCloseParenthesis: Parser = (input: string) => {
    const match = /^\)/.exec(input);
    if (match) {
        return success([{
            type: 'CLOSE_PARENTHESIS', value: match[0]
        }], input.slice(match[0].length));
    }
    return failure("Expected ')'");
}

export const parseCharacter: (char: string, tokenType: Token['type']) => Parser =
    (char: string, tokenType: Token['type']) => {
        let regex = new RegExp(`^\\${char}`);
        return (input: string) => {
            const match = regex.exec(input);
            if (match) {
                return success([{
                    type: tokenType, value: match[0]
                }], input.slice(match[0].length));
            }
            return failure(`Expected '${char}'`);
        }
    }

export const parseOpenParenthesis2 = parseCharacter('(', "OPEN_PARENTHESIS");
export const parseCloseParenthesis2 = parseCharacter(')', "CLOSE_PARENTHESIS");

////////////////////////////// CHOICE //////////////////////////////////////////////
export const choice: (p1: Parser, p2: Parser) => Parser =
    (p1, p2) => {
        return (input: string) => {
            const result = p1(input);
            if (result.success) {
                return result;
            }
            else {
                return p2(input);
            }
        }
    }
export const parseOperator2 = choice(parseCharacter('+', 'OPERATOR'), parseCharacter('-', 'OPERATOR'));

export const choiceN: (parsers: Parser[]) => Parser = (parsers: Parser[]) => {
    return (input: string) => {
        for (let i = 0; i < parsers.length; i++) {
            const parsed = parsers[i](input);
            if (parsed.success) {
                return parsed;
            }
        }
        return failure('Choice parser: All choices failed on input');
    }
}

//////////////////////////////// ZIP /////////////////////////////////////////////////////////////
export const zip: (parser1: Parser, parser: Parser) => Parser =
    (parser1, parser2) => {
        return (input: string) => {
            const result1 = parser1(input);
            if (result1.success) {
                const result2 = parser2(result1.rest);
                if (result2.success) {
                    return success([
                        ...result1.value, ...result2.value
                    ], result2.rest);
                }
            }
            return failure('Not a number. Not an operator');
        }
    }

///////////////////////////// DOUNTIL /////////////////////////////////////////////////////////////////
const isEmpty: Parser = (input) => {
    if (input == '') return success([], "");
    else return failure("Not an empty string")
}

export function doUntil(parser: Parser, acc?: any): Parser {
    if (!acc) {
        acc = {
            success: true,
            value: [],
            rest: ''
        }
    }
    return (input: string) => {
        if (isEmpty(input).success) return acc;
        const parsed = parser(input);
        if (parsed.success) {
            acc.value.push(...parsed.value)
            acc.rest = parsed.rest
            return doUntil(parser, acc)(parsed.rest);
        } else {
            return failure('Choice parser: All choices failed on input');
        }
    }
}

////////////////////////////////////////////////// TOKINEZER ////////////////////////////////////////////////
const parsers = choiceN([
    parseNumber,
    parseOperator,
    parseOpenParenthesis,
    parseCloseParenthesis]
);
export const tokenizer = doUntil(parsers);





