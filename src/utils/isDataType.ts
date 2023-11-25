/**
 * 检查入参是否是CSS data type类型的字符串
 */
export default function (input: string): boolean {
    if (input === '<dataType>') return true;
    if (input === '&lt;dataType&gt;') return true;

    return false;
}
