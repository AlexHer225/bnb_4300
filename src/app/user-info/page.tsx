'use client';

import { useSession } from "next-auth/react";
import UserInfo from "../components/UserInfo";

export default function UserInfoPage() {
  const { data: session, status } = useSession();

    return (
        <div>
            <UserInfo _id={session?.user?.id}/> 
        </div>
    )
}