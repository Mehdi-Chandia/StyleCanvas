'use client';

import {ToastProvider} from "@/app/lib/toast";

export default function ToastWrapper({ children }) {
    return (
        <>
            {children}
            <ToastProvider/>
        </>
    );
}