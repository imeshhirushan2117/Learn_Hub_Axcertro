import { Head, Link } from '@inertiajs/react';
import { PageProps, Service, Teacher } from '@/types';
import TeacherLayout from '@/Layouts/TeacherLayout';
import StarRating from '@/Components/StarRating/StarRating';
import { useState } from 'react';
import MyDialog from '@/Components/MyDialog/MyDialog';

interface Props extends PageProps {
    teacher?: Teacher; 
    averageRating?: number | null;
    comments?: { comment: string, rating: number, service: string, student: string }[];
}

export default function TeacherShow({ auth, teacher, averageRating, comments = [] }: Props) {
    if (!teacher) {
        return <div>Teacher data is not available</div>;
    }

    const { user, position, bio, services } = teacher;

    if (!user) {
        return <div>User data is not available</div>;
    }

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedService(null);
        setIsDialogOpen(false);
    };

    return (
        <TeacherLayout user={auth.user}>
            <Head title={user.name} />

            <div className="mt-5 mx-4 md:mx-10">
                <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
                    <img
                        className="h-32 w-32 rounded-full"
                        src={user.image_url || 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png'}
                        alt={user.name}
                    />
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-2xl font-semibold leading-7 tracking-tight text-gray-900">
                            {user.name}
                        </h3>
                        <p className="mt-1 text-lg text-gray-600">{position}</p>
                        {averageRating !== undefined && averageRating !== null && (
                            <div className="mt-1 text-lg text-gray-600">
                                {/* Average Rating: {averageRating.toFixed(1)} / 5 */}
                                <StarRating rating={averageRating} />
                            </div>
                        )}
                        <p className="mt-2 text-sm text-gray-600">Contact me:  {user.phone}</p>
                    </div>
                </div>
                <div className="mt-5 bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-medium text-gray-800">About Me</h4>
                    <p className="mt-2 text-sm text-gray-600">{bio}</p>
                </div>
                <div className="mt-5 bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-medium text-gray-800">Services</h4>
                    {services.length > 0 ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((service: any) => (
                                <div
                                onClick={() => openDialog(service)}
                                key={service.id}
                                className="cursor-pointer flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                            >
                                    <div className="flex-shrink-0">
                                    <div className="flex justify-center mt-4">
                                        <img
                                            src={service.image ? `/storage/${service.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                                            alt={service.name}
                                            className="h-16 w-16 rounded-full"
                                        />
                                        </div>
                                        
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h5 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">{service.name}</h5>
                                        <hr className="my-1 w-full border-gray-300" />
                                        {averageRating !== undefined && averageRating !== null && (
                                    <div className="mt-1 text-lg text-gray-600 flex justify-center">
                                        {/* Average Rating: {averageRating.toFixed(1)} / 5 */}
                                        <StarRating rating={averageRating} />
                                    </div>
                                      )}
                                        <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-600">No services available.</p>
                    )}
                </div>
                <div className="mt-5 bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-medium text-gray-800">Student Comments</h4>
                    {comments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="mt-4 min-w-full">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">Service</th>
                                        <th className="border px-4 py-2">Student</th>
                                        <th className="border px-4 py-2">Rating</th>
                                        <th className="border px-4 py-2">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.map((comment, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{comment.service}</td>
                                            <td className="border px-4 py-2">{comment.student}</td>
                                            <td className="border px-4 py-2"><StarRating rating={comment.rating} /></td>
                                            <td className="border px-4 py-2">{comment.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-600">No comments available.</p>
                    )}
                </div>
                <div className="mt-5 text-center md:text-left">
                    <Link
                        href={route('teachers.index')}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Back to Teachers
                    </Link>
                </div>
            </div>
            <MyDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                className={
                    "inline-block w-full max-w-lg p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                }
            >
                {selectedService && (
                    <div>
                        {selectedService.image && (
                            <div className="flex justify-center mt-4">
                                <img
                                    src={selectedService.image ? `/storage/${selectedService.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                                    alt={selectedService.name}
                                    className="h-28 w-28 rounded-full"
                                />
                            </div>
                        )}
                        
                        <h2 className="text-xl font-bold">{selectedService.name}</h2>
                        <hr className="my-1 w-full border-gray-300" />
                        {averageRating !== undefined && averageRating !== null && (
                            <div className="mt-1 text-lg text-gray-600 flex justify-center">
                                {/* Average Rating: {averageRating.toFixed(1)} / 5 */}
                                <StarRating rating={averageRating} />
                            </div>
                        )}
                        {selectedService.teacher && (
                            <p className="mt-2">Teacher: {selectedService.teacher.user.name}</p>
                        )}
                        <p className="mt-2">{selectedService.description}</p>
                        <p className="text-gray-700 mb-2">Experience: {selectedService.experience}</p>
                        <p className="mt-2">Hourly Rate: Rs {selectedService.hourly_rate}</p>
                        <div className="flex justify-center items-center mt-6">
                            <Link
                                href={route("teacher.bookings.create", {
                                    service_id: selectedService.id,
                                })}
                                className="text-blue-600 hover:text-blue-900"
                            >
                                Book Service
                            </Link>
                        </div>
                    </div>
                )}
            </MyDialog>
        </TeacherLayout>
    );
}
