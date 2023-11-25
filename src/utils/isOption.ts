import { isDataType } from './';

/**
 * 检查入参是否是option类型的字符串
 * @example
 * f('dataType');   // false
 * f('<length>);    // false
 * f('<dataType>'); // true
 */
export default function (input: string): boolean {
    return !isDataType(input);
}
