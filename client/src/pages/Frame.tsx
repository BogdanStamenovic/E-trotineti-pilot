import { Button } from "@/components/ui/button";

const stats = ["120+ modela", "3 premium brenda", "Nezavisni vodiči"];

export const Frame = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#07070a]">
      <header className="h-[56px] w-full bg-[#d9cec5]">
        <div className="flex h-full items-start">
          <img
            className="ml-1 mt-1 h-[42px] w-auto object-contain"
            alt="Image"
            src="/figmaAssets/image-2.png"
          />
        </div>
      </header>
      <section className="mx-auto grid min-h-[444px] w-full max-w-[1440px] grid-cols-1 gap-10 px-[52px] pb-16 pt-5 md:grid-cols-[minmax(0,1fr)_420px] md:items-start md:gap-14 lg:px-[50px]">
        <article className="max-w-[640px] pt-1">
          <h1 className="[font-family:'Inter',Helvetica] text-[42px] font-bold leading-[1.08] tracking-[0] text-white md:text-[58px] lg:text-[64px]">
            Najbolji električni trotinet za tvoj stil vožnje
          </h1>
          <p className="mt-4 max-w-[620px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[1.2] tracking-[0] text-[#bfbfbf] md:text-[18px]">
            Uporedi modele, domet, snagu i cenu. Pronađi idealan Dualtron,
            Teverun ili Kaabo za grad, brzinu i avanturu.
          </p>
          <Button
            type="button"
            className="mt-8 h-auto min-w-[156px] rounded-xl bg-[#e53935] px-10 py-4 [font-family:'Inter',Helvetica] text-[18px] font-semibold text-white shadow-none hover:bg-[#d63030]"
          >
            Pokreni vodič
          </Button>
          <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-normal tracking-[0] text-[#a5a5a5]">
            {stats.map((item, index) => (
              <li key={item} className="flex items-center">
                <span>{item}</span>
                {index < stats.length - 1 && (
                  <span className="ml-3 text-[#8f8f8f]">•</span>
                )}
              </li>
            ))}
          </ul>
        </article>
        <div className="flex w-full items-start justify-center pt-[82px] md:justify-end">
          <img
            className="h-auto w-full max-w-[429px] rounded-t-[9999px] object-cover"
            alt="Image"
            src="/figmaAssets/image-3.png"
          />
        </div>
      </section>
    </main>
  );
};
