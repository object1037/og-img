import Image from 'next/future/image'

const Home = () => {
  return (
    <main
      style={{
        padding: '4rem',
        maxWidth: '56rem',
      }}
    >
      <h1 style={{ marginBottom: '3rem' }}>og-image as a service.</h1>
      <a
        href="/テストタイトル"
        style={{
          filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
        }}
      >
        <Image
          src="/テストタイトル"
          alt="「テストタイトル」のOGP画像"
          width={1200}
          height={600}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.75rem' }}
        />
      </a>
    </main>
  )
}

export default Home
