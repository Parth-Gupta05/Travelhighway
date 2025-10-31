import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Experience {
  _id: string;
  name: string;
  location: string;
  detail: string;
  dates: string[];
  timeslots: Array<{
    time: string;
    slotsQty: number;
  }>;
  about: string;
  image: string;
  price: number;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div
      key={experience._id}
      className="bg-[#F0F0F0] text-black w-[280px] h-[322px] rounded-[12px] overflow-hidden"
    >
      <div className="relative h-[172px]">
        <Image
          src={experience.image}
          alt={experience.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 h-[142px] text-[#161616]">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[16px] font-bold">{experience.name}</h2>
            <p className="bg-[#D6D6D6] text-[#161616] text-[11px] rounded-[4px] px-[8px] py-[4px]">
              {experience.location}
            </p>
          </div>

          <p className="text-[#6C6C6C] text-[12px] mt-[10px] line-clamp-2">
            {experience.about}
          </p>
        </div>

        <div className="flex pt-[1rem] justify-between items-center">
          <div className="flex justify-center gap-1.5 items-center">
            <p className="text-[12px]">From </p>
            <span className="flex font-[500] text-[20px] justify-center items-center">
              ₹{experience.price}
            </span>
          </div>

          <Link href={`/experiences/${experience._id}`} className="bg-[#FFD643] cursor-pointer w-[99px] h-[30px] rounded-[4px] px-[8px] py-[5px] text-black">
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
