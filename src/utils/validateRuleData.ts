import { Rule } from '@/types/rule';
import { isDataType, isOption } from './';

/**
 * 检查数据是否符合Rule类型的规范
 */
export default function (data: Rule) {
    for (const declaration of data) {
        switch (declaration.type) {
            case 'data-type':
                break;

            case 'option-type':
                if (!declaration.options.includes(declaration.value))
                    throw new Error('OptionType: Unable to find the value of the option in the options array');
                if (!declaration.options.every(isOption))
                    throw new Error('OptionType: the options array contains a dataType value');

                break;

            case 'mixed-type':
                if (!declaration.option.options.includes(declaration.option.value))
                    throw new Error('MixedType: Unable to find the value of the option in the options array');
                if (declaration.option.options.every(isOption))
                    throw new Error('MixedType: There is no dataType value in the options array');
                if (declaration.option.options.every(isDataType))
                    throw new Error('MixedType: There is no option value in the options array');

                break;
        }
    }
}
