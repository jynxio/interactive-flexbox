import { Rule } from '@/types/rule';
import { validateRuleData, sanitizeRuleData } from '@/utils';

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

sanitizeRuleData(data);
validateRuleData(data);

export default data;
