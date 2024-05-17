export interface Props {
    id?: string;
    name?: string;
    label?: string;
    type?: string;
    value?: any;
    required?: boolean;
    accept?: string;
    placeholder?: string;
    style?: string;
    onChange: (value: any) => void;
}