import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function Paging({ setPage, page, lastPage }) {
    const handlePageChange = (number) => {
        setPage(number);
    };

    const handlePageChangeNext = () => {
        setPage(page + 1);
    };

    const handlePageChangePrev = () => {
        setPage(page - 1);
    };

    const handlePageChangeFirst = () => {
        setPage(1);
    };

    const handlePageChangeLast = () => {
        setPage(lastPage);
    };

    const renderPaginationItems = () => {
        const items = [];
        const visiblePages = Math.min(5, lastPage);

        if (page > 1) {
            items.push(
                <Pagination.First key="first" onClick={handlePageChangeFirst} />
            );
            items.push(
                <Pagination.Prev key="prev" onClick={handlePageChangePrev} />
            );
        }

        for (let number = Math.max(1, page - 2); number <= page - 1; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        items.push(
            <Pagination.Item key={page} active>
                {page}
            </Pagination.Item>
        );

        for (
            let number = page + 1;
            number <= Math.min(page + visiblePages - 2, lastPage - 1);
            number++
        ) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        if (page < lastPage) {
            items.push(
                <Pagination.Next key="next" onClick={handlePageChangeNext} />
            );
            items.push(
                <Pagination.Last key="last" onClick={handlePageChangeLast} />
            );
        }

        return items;
    };

    return (
        <div>
            <Pagination>{renderPaginationItems()}</Pagination>
        </div>
    );
}
