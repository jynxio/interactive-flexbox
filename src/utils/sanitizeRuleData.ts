import { Rule } from '@/types/rule';
import { replaceAngleBracket } from './';

/**
 * 将Rule类型的数据中的<和>字符都替换成&lt;和&gt;，该方法会修改原始数据
 */
export default function (data: Rule) {
    for (const declaration of data) {
        switch (declaration.type) {
            case 'data-type':
                declaration.placeholder = replaceAngleBracket(declaration.placeholder);

                break;

            case 'option-type':
                declaration.value = replaceAngleBracket(declaration.value);
                declaration.options = declaration.options.map(replaceAngleBracket);

                break;

            case 'mixed-type':
                declaration.option.value = replaceAngleBracket(declaration.option.value);
                declaration.option.options = declaration.option.options.map(replaceAngleBracket);

                declaration.dataType.placeholder = replaceAngleBracket(declaration.dataType.placeholder);

                break;
        }
    }
}
