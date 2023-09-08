"use client";

import { constants } from "@/utils";
import { FormEvent, useRef } from "react";
import {useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!nameInputRef?.current?.value) return;

        const name = nameInputRef.current.value;

        window.localStorage.setItem(constants.userName, name)
        router.push("/rooms")
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center p-4 gap-4"
            >
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Type your nickname
                </label>

                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    minLength={3}
                    maxLength={14}
                    type="text"
                    id="name"
                    name="name"
                    ref={nameInputRef}
                    required
                    aria-required="true"
                    autoComplete="off"
                />

                <button
                    type="submit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    Jogar
                </button>
            </form>
        </main>
    );
}
