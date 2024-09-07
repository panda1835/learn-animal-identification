import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className=" text-center py-8 px-4 rounded-lg bg-primaryColorHome-light">
        <h1 className="text-4xl font-bold">
          Khám phá và Nhận diện Các Loài Động vật
        </h1>
        <p className="mt-2 text-lg">
          Học cách nhận diện các loài rắn, gấu, linh trưởng, rùa và nhiều hơn
          nữa!
        </p>
      </header>

      <main className="py-12 px-4">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="mt-4 text-lg">
            Mục tiêu của chúng tôi là giúp bạn dễ dàng nhận diện và tìm hiểu
            thêm về các loài động vật thông qua các hướng dẫn trực quan và thông
            tin chi tiết về từng loài.
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
          {[
            { name: "Rắn", icon: "🐍", link: "/snakes" },
            { name: "Gấu", icon: "🐻", link: "/bears" },
            // { name: "Rùa", icon: "🐢", link: "/turtles" },
            // { name: "Linh Trưởng", icon: "🐵", link: "/primates" },
          ].map((species) => (
            <Link
              key={species.name}
              href={species.link}
              className="bg-white rounded-lg shadow-lg p-6 hover:bg-primaryColorHome-light transition border-primaryColorHome-light border-2"
            >
              <span className="text-6xl">{species.icon}</span>
              <h3 className="mt-4 text-2xl font-semibold">{species.name}</h3>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
