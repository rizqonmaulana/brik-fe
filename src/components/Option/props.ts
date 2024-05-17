interface Option {
    name: string;
    id: number;
  }

export interface Props {
    datas?: Option[];
    style?: string;
    id?: string;
    name?: string;
    value?: any;
    onChange: (value: any) => void;
    required?: boolean;
    text?:string;
}