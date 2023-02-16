import '@/styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,//RestAPIへのフェッチに失敗した時に、自動で3回までリトライを繰り返す
      refetchIntervalInBackground: false,//ユーザがブラウザにフォーカスを当てた時にRestAPIへのフェッチが走る
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true//フロント・サーバ間でクッキーのやり取りをする場合true
  
  
  useEffect(() => {//コンポーネントがマウントされる際に実行される。
    const getCsrfToken = async () => {//csrfトークン取得関数
      const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken//リクエストヘッダーにcsrf-tokenが乗るようにする。
    }
    getCsrfToken() //実行
  })
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
              /** Put your mantine theme override here */
              colorScheme: 'dark',
              fontFamily: 'Verdana, sans-serif'
          }}
      >
          <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
    
  )
}
