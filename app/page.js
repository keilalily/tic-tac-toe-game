import Head from 'next/head';
import Board from '../components/Board';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <main className='flex flex-col gap-4 md:gap-8 items-center justify-center min-h-screen bg-gray-900'>
        <h1 className='text-3xl md:text-5xl text-white text-center font-bold font-rubik-mono'>Tic-Tac-Toe</h1>
        <Board />
      </main>
    </>
  );
}