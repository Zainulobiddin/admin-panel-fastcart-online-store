import logoWhite from '#/logoWhite.svg'



export default function Wellcome() {
  return (
    <div className='bg-gradient-to-b from-[#6366F1] to-[#131449] w-[50%] h-[100vh] flex flex-col items-center justify-center '>
        <h3 className='font-medium text-2xl leading-[100%] text-white '>Welcome to admin panel</h3>
      <img src={logoWhite} alt="" />
    </div>
  )
}
