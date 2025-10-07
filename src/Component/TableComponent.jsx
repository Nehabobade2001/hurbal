import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import Pagination from './Pagination';
import BackButton from './BackButton';
const TableComponent = ({ title, headers, data, renderRow, searchKeys = [], searchKey }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data?.filter((item) => {
        const search = searchQuery.toLowerCase();
        return searchKeys.some((key) =>
            item[key]?.toString().toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className='space-y-4 bg-white p-4 rounded-xl overflow-hidden'>
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                    <div className='flex items-center gap-3 '>
                        <BackButton />
                        <h1 className='text-sm md:text-lg font-medium'>{title}</h1>
                    </div>
                    <div className="flex items-center gap-2 px-4 bg-text-white rounded-lg border w-full md:w-auto">
                        <input
                            type="text"
                            placeholder={`Search by ${searchKey || 'value'}`}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="flex-1 p-2 text-sm text-gray-600 rounded-lg outline-none"
                        />
                        <IoSearch className="text-black" />
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full text-xs'>
                        <thead>
                            <tr className=' text-left'>
                                {headers.map((header, index) => (
                                    <th key={index} className='p-2 border border-white/30'>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={headers.length} className='p-2 md:p-3'>No data found</td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr key={index}>
                                        {renderRow(item, startIndex + index)}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
};

export default TableComponent