export interface Props {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    stock: number;
    onClick?: () => void;
}