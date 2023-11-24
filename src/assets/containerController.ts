/**
 * 类型说明:
 *   - rule       : 样式声明的集合，如{ inline-size: 1rem; block-size: 1rem }
 *   - declaration: 样式声明
 *   - property   : 样式声明的键，如inline-size
 *   - value      : 样式声明的值，如1rem
 */
type Rule = {
    type: 'mixed' | 'option' | 'dataType';
    mode: 'option' | 'length' | 'percentage';
    property: string;
    value: {
        option?: string;
        length?: string;
        percentage?: string;
    };
    options?: string[];
}[];

const containerRuleData: Rule = [
    {
        mode: 'option',
        property: 'direction',
        value: {
            option: 'ltr',
        },
        options: ['ltr', 'rtl'],
    },
    {
        mode: 'option',
        property: 'writing-mode',
        value: {
            option: 'horizontal-tb',
        },
        options: ['horizontal-tb', 'vertical-lr', 'vertical-rl'],
    },
    {
        mode: 'option',
        property: 'flex-direction',
        value: {
            option: 'row',
        },
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    {
        mode: 'option',
        property: 'flex-wrap',
        value: {
            option: 'nowrap',
        },
        options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    {
        mode: 'option',
        property: 'justify-content',
        value: {
            option: 'normal',
        },
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
        mode: 'option',
        property: 'align-content',
        value: {
            option: 'normal',
        },
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
        mode: 'option',
        property: 'align-items',
        value: {
            option: 'normal',
        },
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
        mode: 'percentage',
        property: 'row-gap',
        value: {
            option: '&lt;percentage&gt;',
            length: '1rem',
            percentage: '2%',
        },
        options: ['normal', '&lt;length&gt;', '&lt;percentage&gt;'],
    },
    {
        mode: 'percentage',
        property: 'column-gap',
        value: {
            option: '&lt;percentage&gt;',
            length: '1rem',
            percentage: '2%',
        },
        options: ['normal', '&lt;length&gt;', '&lt;percentage&gt;'],
    },
] as Rule;

export default containerRuleData;
