// 术语
// - rule       : 样式声明的集合，如{ inline-size: 1rem; block-size: 1rem }
// - declaration: 样式声明
// - property   : 样式声明的键，如inline-size
// - value      : 样式声明的值，如1rem
// - data type  : value的数据类型，比如<number>、<percentage>

type OptionType = {
    type: 'option-type';
    name: string;
    value: string;
    options: string[];
};
type DataType = {
    type: 'data-type';
    name: string;
    value: string;
    placeholder: string;
};
type MixedType = {
    type: 'mixed-type';
    name: string;
    option: {
        value: string;
        options: string[];
    };
    dataType: {
        [Key: `<${string}>`]: {
            value: string;
            placeholder: string;
        };
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
            value: '<percentage>',
            options: ['normal', '<length>', '<percentage>'],
        },
        dataType: {
            '<length>': {
                value: '1rem',
                placeholder: '<length>',
            },
            '<percentage>': {
                value: '2%',
                placeholder: '<percentage>',
            },
        },
    },
    {
        type: 'mixed-type',
        name: 'column-gap',
        option: {
            value: '<percentage>',
            options: ['normal', '<length>', '<percentage>'],
        },
        dataType: {
            '<length>': {
                value: '1rem',
                placeholder: '<length>',
            },
            '<percentage>': {
                value: '2%',
                placeholder: '<percentage>',
            },
        },
    },
];

/**
 * 将所有<和>都转换成&lt;和&gt;
 */
function sanitize(data: Rule): Rule {
    for (const declaration of data) {
        if (declaration.type === 'data-type') continue;
        if (declaration.type === 'option-type') {
            const isCorrect = declaration.options.includes(declaration.value);

            if (!isCorrect) throw new Error('无法在options中找到option'); // TODO:
        }
    }
}

// TODO: 动态检查 - 必须能在options中找到所有的option的value，以及dataType中的[Key in `<${string}>`]中的Key
// TODO: 动态检查 - 必须把所有的<都置换成&lt;，把所有的>都置换成&gt;

export default data;
