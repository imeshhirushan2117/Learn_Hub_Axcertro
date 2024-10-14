import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { LuView } from "react-icons/lu";
import { useState } from "react";
import Card from "@/Components/Card/Card";
import SearchBar from "@/Components/SearchBar/SearchBar";
import MyDialog from "@/Components/MyDialog/MyDialog";
import girl from "@/../../public/asstts/img/girl.jpg";
import degree from "@/../../public/asstts/img/degree.jpeg";
import { Inertia } from "@inertiajs/inertia";

export interface Data {
    [x: string]: string | undefined;
    name: string;
    email: string;
    id: any;
    role: string;
    phone: string;
}

export interface PaginatedTableProps {
    data: Data[];
}
const PaginatedTable: React.FC<PaginatedTableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Data | null>(null);

    const totalPages: number = Math.ceil(data.length / itemsPerPage);
    const currentData = Array.isArray(data)
        ? data.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
          )
        : [];

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const view = (student: Data) => {
        setSelectedStudent(student);
        setIsOpen(true);
    };

    const readMore = () => {
        alert("readmore");
    };

console.log(selectedStudent);


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
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone Number
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            View Student
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
                                                    {entry.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {entry.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {entry.phone}
                                                </td>

                                                <td className="flex items-center px-6 py-4">
                                                    <button
                                                        onClick={() =>
                                                            view(entry)
                                                        }
                                                        className="font-medium text-green-600 hover:font-bold ms-3 text-lg"
                                                    >
                                                        <LuView />
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

            <MyDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                className={
                    "inline-block w-full max-w-lg p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                }
            >
                {selectedStudent ? (
                    <div className="flex flex-col justify-between max-w-lg p-6 m-4 bg-white border rounded-lg shadow  md:flex-row">
                        <div className="flex justify-center items-center">
                            <img
                                className="rounded-lg w-40 md:w-40"
                                src={selectedStudent.image_url}
                                alt="image description"
                            />
                        </div>
                        <div className="mb-6 md:mb-0 md:mr-6">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                                {selectedStudent.name}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 ">
                                <strong>Student ID:</strong>{" "}
                                {selectedStudent.id}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 ">
                                <strong>Email:</strong> {selectedStudent.email}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 ">
                                <strong>Phone:</strong> {selectedStudent.phone}
                            </p>
                            {/* <button
                                className="w-full md:w-40 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300"
                                onClick={readMore}
                            >
                                Read more
                            </button> */}
                        </div>
                    </div>
                ) : (
                    <p>No student selected.</p>
                )}
            </MyDialog>
        </div>
    );
};

export default function Student({
    auth,
    studentCount,
    userStudents,
    search = '',
}: PageProps & {search?:string}) {

    const studentArray = Object.values(userStudents);
    const [searchTerm, setSearchTerm] = useState<string>(search || '');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        ({ search: searchTerm });
    };

    const filteredStudents = studentArray.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredStudentCount = filteredStudents.length; 

    return (
        <>
            <AdminLayout user={auth.user}>
                <Head title="Students" />
                <div className="py-2">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                        {/* Card */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                            <div className="p-6  text-gray-900 flex justify-around flex-wrap items-center gap-5">
                                <Card
                                    className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow"
                                    title={"Students"}
                                >
                                   {filteredStudentCount}
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
                        <PaginatedTable data={filteredStudents} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
