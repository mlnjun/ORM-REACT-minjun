export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div style={{ backgroundColor: 'lightgray', height: '50px' }}>
        {/*  */}
        블로그 공통 레이아웃 영역
      </div>
      {/*  */}
      {children}
    </>
  )
}
