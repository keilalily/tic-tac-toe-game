import Head from 'next/head';
import Board from '../components/Board';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <main className='flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-900'>
        <h1 className='text-5xl text-white font-bold font-rubik-mono'>Tic-Tac-Toe</h1>
        <Board />
      </main>
    </>
  );
}