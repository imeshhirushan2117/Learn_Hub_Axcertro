import { useState, PropsWithChildren, ReactNode } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { User } from "@/types";
import ApplicationLogo from '@/Components/ApplicationLogo';
import Logo from '../../../public/asset/Logo.png'
import Footer from "@/Components/Footer/Footer";
import FlashAlerts from "@/Components/alerts/FlashAlerts";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
        const pageProps = usePage().props;

        const getDashboardRoute = () => {
            switch (user.role) {
                case 
                'admin' : return route('admins.overview.index');
                case 
                'teacher' : return route('teacher.overviews.index');
                case
                'student' : return route('students.index');
                default :
                return route('dashboard');

            }
        }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/" className="flex items-center">
                                <img className="h-9 w-auto fill-current text-gray-800" src={Logo} alt="Logo" />
                                <div className="w-[53.02px] h-[31px] text-center text-blue-700 text-2xl font-bold font-['Poppins']">LMS</div>
                            </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <img
                                                     className="h-10 w-10 rounded-full mr-2"
                                                     alt={`${user.name}'s profile`}
                                                    src={user.image_url || 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png'}
                                                />

                                                

                                                <p>{user.name}</p>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                
                                        <Dropdown.Link
    
                                            href={getDashboardRoute()}
                                        >
                                            Dashboard
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={getDashboardRoute()} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>

                                                
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink> */}
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <Footer />
            <FlashAlerts flash={pageProps.flash} />
        </div>
    );
}