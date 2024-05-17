import React from 'react';
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";

import { Props } from './index.d';

const PaginationCustom: React.FC<Props> = ({ currentPage, totalItems, itemsPerPage, handlePageClick }) => {
    return (
        <Pagination 
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageClick} 
        />
    );
};

export default PaginationCustom;
