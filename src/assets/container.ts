import { isOption, isDataType, replaceAngleBracket } from '@/utils';

// 术语
// - rule       : 样式声明的集合，如{ inline-size: 1rem; block-size: 1rem }
// - declaration: 样式声明
// - property   : 样式声明的键，如inline-size
// - value      : 样式声明的值，如1rem
// - data type  : value的数据类型，比如<number>、<percentage>

type DataType = {
    type: 'data-type';
    name: string;
    value: string;
    placeholder: string;
};
type OptionType = {
    type: 'option-type';
    name: string;
    value: string;
    options: string[];
};
type MixedType = {
    type: 'mixed-type';
    name: string;
    option: {
        value: string;
        options: string[];
    };
    dataType: {
        value: string;
        placeholder: string;
    };
};
type Rule = (OptionType | DataType | MixedType)[];

const data: Rule = [
    {
        type: 'option-type',
        name: 'direction',
        value: 'ltr',
        options: ['ltr', 'rtl'],
    },
    {
        type: 'option-type',
        name: 'writing-mode',
        value: 'horizontal-tb',
        options: ['horizontal-tb', 'vertical-lr', 'vertical-rl'],
    },
    {
        type: 'option-type',
        name: 'flex-direction',
        value: 'row',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    {
        type: 'option-type',
        name: 'flex-wrap',
        value: 'nowrap',
        options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    {
        type: 'option-type',
        name: 'justify-content',
        value: 'normal',
        options: [
            'normal',
            'start',
            'end',
            'left',
            'right',
            'center',
            'flex-start',
            'flex-end',
            'stretch',
            'space-between',
            'space-around',
            'space-evenly',
        ],
    },
    {
        type: 'option-type',
        name: 'align-content',
        value: 'normal',
        options: [
            'normal',
            'stretch',
            'flex-start',
            'flex-end',
            'center',
            'baseline',
            'first baseline',
            'last baseline',
            'start',
            'end',
            'self-start',
            'self-end',
        ],
    },
    {
        type: 'option-type',
        name: 'align-items',
        value: 'normal',
        options: [
            'normal',
            'stretch',
            'flex-start',
            'flex-end',
            'center',
            'baseline',
            'first baseline',
            'last baseline',
            'start',
            'end',
            'space-between',
            'space-around',
            'space-evenly',
        ],
    },
    {
        type: 'mixed-type',
        name: 'row-gap',
        option: {
            value: '<dataType>',
            options: ['normal', '<dataType>'],
        },
        dataType: {
            value: '2%',
            placeholder: '<length> | <percentage>',
        },
    },
    {
        type: 'mixed-type',
        name: 'column-gap',
        option: {
            value: '<dataType>',
            options: ['normal', '<dataType>'],
        },
        dataType: {
            value: '2%',
            placeholder: '<length> | <percentage>',
        },
    },
];

sanitize(data);
check(data);

/**
 * 将数据中的所有<和>字符都替换成&lt;和&gt;
 */
function sanitize(data: Rule) {
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

/**
 * 检查数据是否合规
 */
function check(data: Rule) {
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

export default data;
