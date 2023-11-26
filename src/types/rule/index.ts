// 术语
// - rule       : 样式声明的集合，如{ inline-size: 1rem; block-size: 1rem }
// - declaration: 样式声明
// - property   : 样式声明的键，如inline-size
// - value      : 样式声明的值，如1rem
// - data type  : value的数据类型，比如<number>、<percentage>

export type DataType = {
    type: 'data-type';
    name: string;
    value: string;
    placeholder: string;
};
export type OptionType = {
    type: 'option-type';
    name: string;
    value: string;
    options: string[];
};
export type MixedType = {
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
export type Rule = (OptionType | DataType | MixedType)[];
