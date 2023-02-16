//プロジェクトで利用するデータ型

export type AuthForm = {
    email: string
    password: string
}
//現在編集中のタスクの型
export type EditedTask = {
    id: number
    title: string
    discription?: string | null
}