import React from 'react'
import { SignUp } from "@clerk/nextjs";
import undraw_login from "@/public/undraw_secure_login_pdn4.svg";
import Image from 'next/image';

function SignUpPage() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="flex items-center justify-center lg:col-span-5 xl:col-span-6 bg-white">
          <Image
            alt=""
            src={undraw_login}
            className="h-1/2 w-auto object-contain"
          />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-4xl">
            <SignUp />
          </div>
        </main>
      </div>
    </section>
  )
}

export default SignUpPage
