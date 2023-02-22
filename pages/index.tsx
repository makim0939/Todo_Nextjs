import { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { IconDatabase } from '@tabler/icons'
import {ShieldCheckIcon} from '@heroicons/react/solid'
import {ExclamationCircleIcon} from '@heroicons/react/solid'
import { Anchor, TextInput, Button, Group, PasswordInput, Alert}from '@mantine/core'
import { useRouter } from 'next/router'
import { useForm, yupResolver } from '@mantine/form'
import { AuthForm } from '@/types'
import { Layout } from '@/components/Layout'


//入力のバリデーションのロジックをyupで実装。
//種類ごとのバリデーションメソッドを付与し、エラーメッセージを設定できる
const schema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email')
    .required('No email provided'),
  password: Yup
    .string()
    .required('No password provided')
    .min(8, 'Password should be min 5 chars'),
});

export default function Home() {
  const router = useRouter();//Next.jsのルーティング用
  //loginモードとregisterモードを切り替えるためのステート。falseにすることでデフォルトはloginモード
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('')

  const form = useForm <AuthForm> ({
    validate: yupResolver(schema),//先に定義したshemaでバリデーションを行う
    initialValues: {//初期値
      email: '',
      password: '',
    }
  });
  //サブミットした際の通信の処理
  const handleSubmit = async () => {
    try {
      if(isRegister) {//ステートがレジスタモードの場合
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,{
            email: form.values.email,
            password: form.values.password,
        });
      }
      //ログイン
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
        email: form.values.email,
        password: form.values.password,
      });
      form.reset()
      router.push('/dashboard')//dashboardに遷移
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  return (
    <Layout title="Auth"> 
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      {error && (
        <Alert
          my='md'
          variant='filled'
          icon={<ExclamationCircleIcon />}
          title='Authorization Error'
          color='red'
          radius='md'
        >
          {error}
        </Alert>
      )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput 
            mt='md'//margin-top
            id='email'
            label='Email*'
            placeholder='example@gmail.com'
            {...form.getInputProps('email')}
          />

          <PasswordInput 
            mt='md'//margin-top
            id='password'
            label='password'
            description = "Must be min 8 char"
            {...form.getInputProps('password')}
          />

          <Group mt="xl" position="apart">
            <Anchor
              component='button'
              type='button'
              size='xs'
              className='text-gray-300'
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
            >

              {isRegister
                ? "Have an account? Login"
                : "Don't have an account? Register"
              }
            </Anchor>
            <Button
              leftIcon={<IconDatabase size={14} />}
              color="cyan"
              type='submit'
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </Group>
        </form>
        
    </Layout>
  )
}
