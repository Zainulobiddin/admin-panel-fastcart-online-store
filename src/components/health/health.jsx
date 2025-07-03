import health from '#/health.svg'

export default function Health() {
  return (
    <div className='flex gap-3 items-center'>
      <img src={health} alt="" />
      <div className='flex flex-col gap-1'>
        <p className='text-[14px] font-medium inter text-[#111927] '>Healthcare Erbology</p>
        <p className='text-[14px] font-medium inter text-[#6C737F] '>in Accessories</p>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-[14px] font-semibold inter text-[#10B981] '>13,153</p>
        <p className='text-[14px] font-medium inter text-[#6C737F] '>in sales</p>
      </div>
    </div>
  )
}
