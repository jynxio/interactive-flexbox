/**
 * 将尖括号替换成转义字符
 * @example
 * f('length');                  // 'length'
 * f('<length>');                // '&lt;length&gt;'
 * f('<length> | <percentage>'); // '&lt;length&gt; | &lt;percentage&gt;'
 */
export default function (input: string): string {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
