import { Hero } from "@/components/modules/Home/Hero";
import Specialties from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>HealthCare - Your Trusted Medical Partner</title>
        <meta
          name="description"
          content="HealthCare is your trusted partner for all your medical needs. Our team of top-rated doctors is here to provide you with the best care possible."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Specialties />
        <TopRatedDoctors />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}
