'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

function ConfirmationPage() {
    const params = useParams();
    const router = useRouter();
    const refId = params.id || params.refId;
    
    console.log(refId);

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={48} className="text-white stroke-[3]" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Booking Confirmed
                </h1>

                <p className="text-gray-600 mb-8">
                    Ref ID: <span className="font-medium text-gray-800">{refId || 'N/A'}</span>
                </p>

                <button
                    onClick={handleBackToHome}
                    className="px-8 cursor-pointer py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default ConfirmationPage