/* eslint-disable react/prop-types */
export default function K({bgColor, src, title, pay}) {
  return (
    <div style={{backgroundColor: bgColor}} className="flex items-center gap-4 py-4 px-6 rounded-[4px] ">
        <img src={src} alt="" />
        <div>
            <p className="text-[14px] leading-[20px] text-[#6C737F] ">{title}</p>
            <h3 className="text-2xl leading-[32px] font-bold text-[#111927] ">{pay}</h3>
        </div>
    </div>
  )
}


