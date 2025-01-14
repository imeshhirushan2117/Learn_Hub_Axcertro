import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useForm } from "@inertiajs/react";
import { User } from "@/types";
import { FaUserCircle } from "react-icons/fa";

const userNavigation = [
    { name: "Your Profile", href: route("admin.profileManage.index") },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface AvatarBoardProps {
    user: User;
}

export default function AvatarBoard({ user }: AvatarBoardProps) {
    const { post } = useForm();

    const handleLogout = (event: React.FormEvent) => {
        event.preventDefault();
        post(route("logout"));
    };

    return (
        <div className="h-10">
            <Disclosure as="nav" className="bg-blue-950 ">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-8">
                            <div className="flex h-10 items-center justify-between">
                                <div className="flex items-center ">
                                    <div className="flex-shrink-0">
                                        {/* <p className="uppercase font-semibold text-sm p-2 text-white max-sm:text-xs">
                                            {user.name}
                                        </p> */}
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-1">
                                        <Menu
                                            as="div"
                                            className="relative ml-3"
                                        >
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 ">
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>

                                                    {/* <FaUserCircle className="h-10 w-10 rounded-full bg-white text-teal-400 hover:text-teal-500" /> */}
                                                    <img
                                                    className="h-10 w-10 rounded-full mr-2"
                                                    src={user.image_url || 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png'}
                                                    alt={`${user.name}'s profile`}
                                                />
                                                    <p className="font-semibold text-sm p-2 text-white max-sm:text-xs">
                                            {user.name}
                                        </p>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map(
                                                        (item) => (
                                                            <Menu.Item
                                                                key={item.name}
                                                            >
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-100"
                                                                                : "",
                                                                            "block px-4 py-2 text-sm text-gray-700"
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        )
                                                    )}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <form
                                                                onSubmit={
                                                                    handleLogout
                                                                }
                                                            >
                                                                <button
                                                                    type="submit"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block w-full px-4 py-2 text-left text-sm text-gray-700"
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </button>
                                                            </form>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md  p-1 text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        {/* <img
                                            className="h-10 w-10 rounded-full"
                                            src={temp.imageUrl}
                                            alt=""
                                        /> */}
                                    

                                        <FaUserCircle className="h-24 w-24 bg-white rounded-full text-teal-400 hover:text-teal-600" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-gray-100">
                                            {user.name}
                                        </div>
                                        <div className="text-sm font-medium leading-none text-gray-400">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                    <Disclosure.Button
                                        as="div"
                                        className="block rounded-md px-3 py-2 text-base font-medium  text-gray-100 hover:bg-gray-700 hover:text-white"
                                    >
                                        <form>
                                            <button onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </form>
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
