import { Head } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { User } from '@/types'; 

const StudentShow = ({ student, user }: { student: any, user: User }) => {
    

    return (
        
        <StudentLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Details</h2>}
        >
            
            <Head title={`Student - ${student.name}`} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    
                    <div className="p-6 text-gray-900">
                        {/* Student details */}
                        <h1 className="text-2xl font-bold mb-4">Student Details</h1>
                        <div>
                            {/* Display student name, email, and phone */}
                            <p><strong>Name:</strong> {student.name}</p>
                            <p><strong>Email:</strong> {student.email}</p>
                            <p><strong>Phone:</strong> {student.phone}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}

export default StudentShow;
