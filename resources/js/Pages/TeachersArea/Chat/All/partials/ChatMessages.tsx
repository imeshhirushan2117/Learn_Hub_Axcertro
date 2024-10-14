import MyDialog from "@/Components/MyDialog/MyDialog";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import img from "@/../../public/asstts/img/lms.webp";

export default function ChatMessages({
    chats,
    chatId,
}: {
    chats: any[];
    chatId: any;
}) {
    console.log(chats);

    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
    const [editPopup, setEditPopup] = useState(false);
    const [editingMessage, setEditingMessage] = useState<string>("");
    const [editingChatId, setEditingChatId] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "message") {
            setData(name, value);
        }
    };

    const toggleDropdown = (chatId: string) => {
        setDropdownVisible(dropdownVisible === chatId ? null : chatId);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data);
        post(route("teacher.chat.send", { id: chatId }), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (chatId: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            router.delete(route("teacher.chat.delete", { id: chatId })),
                setDropdownVisible(null);
        }
    };

    const handleEdit = (chatId: string, message: string) => {
        setEditPopup(true);
        setEditingMessage(message);
        setEditingChatId(chatId);
    };

    const cancelEdit = () => {
        setEditingMessage("");
        setEditingChatId(null);
        setEditPopup(false);
        setDropdownVisible(null);
    };

    const handleUpdate = () => {
        if (editingChatId && editingMessage) {
            router.post(route("teacher.chat.update", { id: editingChatId }), {
                message: editingMessage,
            });
            setEditPopup(false);
            setEditingMessage("");
            setDropdownVisible(null);
        }
    };
    return (
        <div className="flex flex-col h-full">
            <div className="p-2 font-bold">
                <h2 className="text-gray-500">Messages</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
                {chatId == null ? (
                    <div className="p-5 text-center text-gray-500 bg-white shadow-lg rounded-lg h-full hidden lg:block">
                        <h3 className="font-bold text-2xl mb-4 text-gray-800">
                            Welcome to Student Chat
                        </h3>
                        <div className="flex justify-center mb-4">
                            <img
                                className="w-40 h-50 object-cover rounded-full shadow-md"
                                src={img}
                                alt="Teacher Chat"
                            />
                        </div>
                        <h3 className="font-bold text-sm text-gray-500 capitalize">
                            Welcome to the LMS Chat Panel! Connect with your
                            classmates and teachers in real time. <br /> share
                            ideas, Ask questions, and collaborate on projects.
                        </h3>
                    </div>
                ) : (
                    <ul className="p-5 overflow-y-scroll max-h-80">
                        {chats.map((chat: any) => (
                            <li key={chat?.id} className="py-2 px-4">
                                {chat?.sender === "teacher" ? (
                                    <div className="flex justify-end relative">
                                        <div className="max-w-60">
                                            <p className="font-bold text-sm text-left"></p>
                                            <div className="flex items-center gap-2">
                                                <div className="p-4 bg-gray-200 max-w-64 rounded-xl">
                                                    <p className="max-w-60 break-words">
                                                        {chat?.message}
                                                    </p>
                                                </div>

                                                <div>
                                                    <button
                                                        id={`dropdownMenuIconButton-${chat.id}`}
                                                        data-dropdown-toggle="dropdownDots"
                                                        data-dropdown-placement="bottom-start"
                                                        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
                                                        type="button"
                                                        onClick={() =>
                                                            toggleDropdown(
                                                                chat.id
                                                            )
                                                        }
                                                    >
                                                        <PiDotsThreeOutlineVerticalBold className="size-5" />
                                                    </button>
                                                    {dropdownVisible ===
                                                        chat.id && (
                                                        <div
                                                            id={`dropdownDots-${chat.id}`}
                                                            className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-40"
                                                        >
                                                            <ul className="py-2 text-sm text-gray-700 ">
                                                                <li>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                chat.id,
                                                                                chat.message
                                                                            )
                                                                        }
                                                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                chat.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="block w-full text-red-500 px-4 py-2 text-left hover:bg-gray-100"
                                                                        onClick={() =>
                                                                            cancelEdit()
                                                                        }
                                                                    >
                                                                        Cancel
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(
                                                    chat?.timestamp
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ) : chat?.sender === "student" ? (
                                    <div className="flex items-start">
                                        <div className="max-w-60">
                                            <p className="font-bold text-sm"></p>
                                            <div className="p-4 bg-blue-200 max-w-64 rounded-xl">
                                                <p className="max-w-60 break-words">{chat?.message}</p>
                                            </div>


                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(
                                                    chat?.timestamp
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <MyDialog
                isOpen={editPopup}
                setIsOpen={setEditPopup}
                className={
                    "inline-block w-full max-w-lg p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                }
            >
                <div>
                    <label htmlFor="chat" className="sr-only">
                        Your message
                    </label>
                    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
                        <textarea
                            id="chat"
                            name="message"
                            value={editingMessage}
                            onChange={(e) => setEditingMessage(e.target.value)}
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Your message..."
                        ></textarea>
                        <button
                            onClick={handleUpdate}
                            type="submit"
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
                        >
                            <div>
                                <BsFillSendFill className="size-5" />
                            </div>
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </div>
            </MyDialog>
            {chatId &&  (
                <div className="mt-5">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="chat" className="sr-only">
                            Your message
                        </label>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
                            <textarea
                                id="chat"
                                name="message"
                                value={data.message}
                                onChange={handleChange}
                                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Your message..."
                            ></textarea>
                            <button
                                type="submit"
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
                            >
                                <div>
                                    <BsFillSendFill className="size-5" />
                                </div>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
