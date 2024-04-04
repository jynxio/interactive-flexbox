import { Rule } from '@/types/rule';
import { validateRuleData } from '@/utils';

const data: Rule = [
    {
        type: 'mixed-type',
        name: 'flex-basis',
        option: {
            value: 'auto',
            options: ['auto', 'content', 'min-content', 'max-content', 'fit-content', '<dataType>'],
        },
        dataType: {
            value: '0',
            placeholder: '<length> | <percentage>',
        },
    },
    {
        type: 'data-type',
        name: 'flex-grow',
        value: '1',
        placeholder: '<positive number>',
    },
    {
        type: 'data-type',
        name: 'flex-shrink',
        value: '0',
        placeholder: '<positive number>',
    },
];

validateRuleData(data);

export default data;
