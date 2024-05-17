export interface Props {
    id: number;
    name: string;
    imageUrl?: string;
    price: number;
    stock: number;
    onClick?: () => void;
}