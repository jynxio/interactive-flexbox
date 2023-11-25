/**
 * 提取CSS data type的内容
 * @example
 * f('length');         // 'length'
 * f('<length>');       // 'length'
 * f('&lt;length&gt;'); // 'length'
 */
export default function (input: string): string {
    const regex = /<([^>]+)>|&lt;([^&]+)&gt;/;
    const match = input.match(regex);

    if (match) return match[1] || match[2];

    return input;
}
