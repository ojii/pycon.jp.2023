import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { Sponsor } from "@/types/sponsor";
import { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import SectionTitle from "@/components/elements/SectionTitle";
import SectionSubTitle from "@/components/elements/SectionSubTitle";
import ExternalLink from "@/components/elements/ExternalLink";
import Link from "next/link";


const SponsorCard = ({ name, logo, description, url }: Omit<Sponsor, "category">) => (
  <div className={"flex items-center gap-2 flex-col"}>
    <Image
      src={"/sponsor/" + logo}
      alt={name}
      width={600}
      height={600}
      className={"flex-1"}
    />
    <div className={"flex-1"}>
      <div>
        <ExternalLink text={name} url={url} />
      </div>
    </div>
  </div>
);

const SponsorPage = ({ rows = [] }: { rows: Sponsor[] }) => {
  const { t } = useTranslation("PAGES")
  const DiamondSection =
    <>
      <SectionSubTitle title={'DIAMOND'} subTitle={'ダイヤモンド'} className='subTitle' />
      {
        rows.filter((row) => row.category === "diamond").map((row, index) => (
          <SponsorCard
            key={index}
            name={row.name}
            logo={row.logo}
            description={row.description}
            url={row.url}
          />
        ))
      }
    </>

  const PlatitnumSection = <SectionSubTitle title={'PLATINUM'} subTitle={'プラチナ'} className='subTitle' />
  {
    rows.filter((row) => row.category === "platinum").map((row, index) => (
      <SponsorCard
        key={index}
        name={row.name}
        logo={row.logo}
        description={row.description}
        url={row.url}
      />
    ))
  }

  const GoldSection = <SectionSubTitle title={'GOLD'} subTitle={'ゴールド'} className='subTitle' />
  {
    rows.filter((row) => row.category === "gold").map((row, index) => (
      <SponsorCard
        key={index}
        name={row.name}
        logo={row.logo}
        description={row.description}
        url={row.url}
      />
    ))
  }

  return (
    <>
      <SectionTitle title='SPONSOR' subTitle='スポンサー' />
      {DiamondSection}


      <div className="flex-row items-center px-[5%] sm:px-[10%] xl:px-[20%] my-[36px]">
        <div className='newsDate'>
          <div className='heading'>
            <div
              className='before:top-1/2 before:w-4 before:h-4 before:mr-4 before:-ml-8 before:-mt-2  before:content-[url("/ellipse.svg")] before:inline-block ml-0 pl-8'>
              <h6 className='text-2xl font-montserrat italic inline'>
                スポンサー募集中！
              </h6>
            </div>
          </div>
        </div>        <div>
          現在PyCon JP 2022は、スポンサーを募集中です。Pythonをキーワードに集まる多くの参加者に、Pythonを扱う企業であることや、エンジニアコミュニティを理解し支援する風土のある企業であること、または自社のサービスをアピールすることが可能です。詳細は募集要項をご覧ください。
        </div>
        <div className="pr-8 text-lg font-bold text-right underline lg:text-right text-primary-700 pb-14">
          <Link href="https://forms.gle/vHW5TSeZFWY3rgKW9/" target="_blank">
            スポンサー募集概要・応募フォーム
          </Link>
        </div>
      </div>    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const buffer = fs.readFileSync("./src/data/sponsor.csv");
  const rows: Sponsor[] = parse(buffer, { delimiter: ",", columns: true });

  return {
    props: {
      rows,
    },
  };
};

export default SponsorPage;
