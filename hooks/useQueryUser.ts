import { PrismaClient } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "@prisma/client";



export const useQueryUser = () => {
    const router = useRouter();
    const getUser = async () => {
        const {data} = await axios.get<Omit<User, 'password_hash'>>(`${process.env.NEXT_PUBLIC_API_URL}/user`)
        return data
    }

    return useQuery<Omit<User, 'password_hash'>, Error>({
        queryKey: ['user'],//取得したオブジェクトをブラウザにキャッシュしてくれる時のキー
        queryFn: getUser,
        onError: (err: any) => {
            if (err.response.status === 401 || err.response.status === 403) {
                router.push('/')
            }
        },
    })
}