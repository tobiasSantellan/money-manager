import Image from "next/image";

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col mb-3">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center mb-20">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manager Your Expense
            <strong className="font-extrabold text-green-700 sm:block">
              {" "}
              Build your Savings{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed font-semibold">
            Start creating your budget and watch your savings grow
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
              href="/sign-in"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <Image
        src={"/hero.png"}
        alt="hero"
        width={1000}
        height={700}
        className="-mt-40 border-2 rounded-xl pb-8 "
      />
    </section>
  );
}

export default Hero;
