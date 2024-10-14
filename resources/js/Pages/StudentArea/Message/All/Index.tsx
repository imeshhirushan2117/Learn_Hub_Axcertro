import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';

export default function Dashboard({ auth }: PageProps) {
    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Student layou</div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
