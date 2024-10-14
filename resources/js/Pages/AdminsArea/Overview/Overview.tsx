import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import Card from "@/Components/Card/Card";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export interface Data {
    id: number;
    name: string;
    description: string;
    experience: string;
    hourly_rate: number;
    status: string;
    teacher: {
        user: {
            name: string;
        };
    };
    
}

export interface PaginatedTableProps {
    data: Data[];
}
const PaginatedTable: React.FC<PaginatedTableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const totalPages: number = data ? Math.ceil(data.length / itemsPerPage) : 0;
    const currentData = data
        ? data.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
          )
        : [];

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const accept = (id :number) => {
         Inertia.post(route('admins.overview.accept', id));
    };

    const reject = (id :number) => {
        Inertia.post(route('admins.overview.reject', id));
    };

    return (
        <div className="py-2">
            <div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="relative overflow-auto shadow-md rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Service ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Subject Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Offered By
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Hourly Rate
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length > 0 ? (
                                        currentData.map((entry, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                                                >
                                                    {entry.id}
                                                </th>
                                                <td className="px-6 py-4 capitalize">
                                                    {entry.name}
                                                </td>
                                                <td className="px-6 py-4 capitalize">
                                                {entry.teacher.user.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {entry.hourly_rate}
                                                </td>

                                                <td className="px-6 py-4 flex gap-4">
                                                    <button
                                                        className="font-sm text-white bg-blue-600 py-1 px-3 rounded-md hover:bg-blue-800"
                                                        onClick={() => accept(entry.id)}
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        className="font-sm text-white bg-red-500 py-1 px-3 rounded-md hover:bg-red-800"
                                                        onClick={() => reject(entry.id)}
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-end p-5">
                                <button
                                    onClick={() => handleClick(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleClick(index + 1)
                                            }
                                            className={`px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${
                                                currentPage === index + 1
                                                    ? "bg-gray-200"
                                                    : ""
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                                <button
                                    onClick={() => handleClick(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Overview({
    auth,
    studentCount,
    teacherCount,
    adminServices,
    serviceCount,
    search=''
}: PageProps & { search?: string }) {

    const serviceArray = Object.values(adminServices);
    const [searchTerm, setSearchTerm] = useState<string>(search || "");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
       ({ search: searchTerm });
    };

    const filteredServices = serviceArray.filter(
        (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.teacher.user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            service.hourly_rate.toString().includes(searchTerm) ||
            service.id.toString().includes(searchTerm)
    );

    const filteredServicesCount = filteredServices.length;

    return (
        <AdminLayout user={auth.user}>
            <Head title="Overview" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    {/* Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex justify-around flex-wrap items-center gap-5">
                            <Card
                                className="w-full  max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
                                title="Total Users"
                            >
                                {studentCount + teacherCount}
                            </Card>

                            <Card
                                className="w-full  capitalize max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
                                title="Pending Services"
                            >
                                {filteredServicesCount}
                            </Card>
                        </div>
                    </div>

                    {/* search */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-3 text-gray-900">
                        <SearchBar
                                title={"Students"}
                                onClick={handleSearchClick}
                                onChange={handleSearchChange}
                                searchTerm={searchTerm}
                            />
                        </div>
                    </div>

                    {/* table */}
                    <PaginatedTable data={filteredServices} />
                    
                </div>
            </div>
        </AdminLayout>
    );
}
