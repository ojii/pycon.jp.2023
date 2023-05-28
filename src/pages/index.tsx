import Head from 'next/head'
import useLocale from "@/components/hooks/locale";
import HeroSection from "@/components/sections/Hero";
import NewsSection from "@/components/sections/News";
import OverviewSection from "@/components/sections/Overview";
import ConferenceSection from "@/components/sections/Conference";
import GoodsSection from "@/components/sections/Goods";
import FaqSection from "@/components/sections/Faq";
import SponsorsSection from "@/components/sections/Sponsors";
import {Blog} from "@/types/blog";
import {GetStaticProps} from "next";

type Props = {
  blogs: Blog[]
}

export default function Home({blogs = []}: Props) {
  const {t} = useLocale();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <HeroSection/>
      <NewsSection blogs={blogs}/>
      <OverviewSection/>
      <ConferenceSection/>
      <GoodsSection/>
      <FaqSection/>
      <SponsorsSection/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO ここでBlogger APIから記事情報を取得する

  return {
    props: {
      // TODO このblogsはダミーなのでAPIから取得した値で差し替える
      blogs: [
        {
          url: 'https://example.com/3',
          title: 'title3',
          published: '2023-04-24T22:17:29.261Z',
        },
        {
          url: 'https://example.com/2',
          title: 'title2',
          published: '2023-04-23T22:17:29.261Z',
        },
        {
          url: 'https://example.com/1',
          title: 'title1',
          published: '2023-04-22T22:17:29.261Z',
        },
      ]
    }
  };
}
