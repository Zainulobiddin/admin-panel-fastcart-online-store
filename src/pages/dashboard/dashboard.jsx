import K from "@/components/thousand/thousand";
import k1 from '#/k1.svg'
import k2 from '#/k2.svg'
import k3 from '#/k3.svg'
import Chart from "@/components/apexchart/apexchart";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Health from "@/components/health/health";
import Transactions from "@/components/Transactions/transactions";
import TopProducts from "@/components/top-products/top-products";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex gap-4 justify-between">
        <section className="flex flex-col gap-4">
          <div className="flex gap-3">
            <K bgColor={'#FEF3F2'} src={k1} title={'Sales'} pay={'$152k'} />
            <K bgColor={'#FFFAEB'} src={k2} title={'Cost'} pay={'$99.7k'} />
            <K bgColor={'#F0FDF9'} src={k3} title={'Profit'} pay={'$32.1k'} />
          </div>
          <div className="w-full">
          <Chart/>
          </div>
        </section>


        <section className="w-[311px] border border-[#00000014] py-3 px-4 rounded-[4px] flex flex-col gap-4 ">
          <div className="flex justify-between "> 
            <p><b className="text-[#111927]">Top selling products</b></p>
            <div className="flex gap-2">
            <p><b className="text-[#111927]">See All</b></p>
            <ArrowRightAltIcon/>
            </div>
          </div>

          <Health/>
          <Health/>
          <Health/>
          <Health/>
          <Health/>
          <Health/>

        </section>



      </section>

      <section className="flex justify-between gap-4">
            <Transactions/>
            <TopProducts/>
      </section>


    </div>
  )
};

export default Dashboard;
