export interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    handlePageClick: (e:any) => void;
}